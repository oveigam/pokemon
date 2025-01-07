// https://pokenode-ts.vercel.app
import { sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { type Machine, type Name, type TypeRelations, type VersionSprites } from "pokenode-ts";

import {
  db,
  schema,
  type DamageClass,
  type GrowthRate,
  type MoveAilment,
  type MoveCategory,
  type MoveTarget,
  type PokemonColor,
  type PokemonHabitat,
  type PokemonShapes,
} from "../app/server/db/database";
import { data } from "../data/data";

class Progress {
  private progress = 0;
  private max: number;
  private start: number;
  private lastLog = -1;
  private name: string;

  constructor(name: string, max: number) {
    this.max = max;
    this.start = Date.now();
    this.name = name;
    console.log(`\nMigrating ${name}...`);
  }

  track() {
    this.progress++;
    const percentage = Math.floor((this.progress / this.max) * 100);
    if (percentage % 10 === 0 && this.lastLog !== percentage) {
      console.log(`${this.name} ${this.progress}/${this.max} (${percentage}%)`);
      this.lastLog = percentage;
    }
  }

  end() {
    console.log(`${this.name} migration ended in ${(Date.now() - this.start) / 1000} s`);
  }
}

type TranslationTable = typeof schema.generationName;

const byName = <T extends { name: string }>(arr: T[]) => {
  return arr.reduce((m, item) => {
    m.set(item.name, item);
    return m;
  }, new Map<string, T>());
};

const resetSerial = async (table: PgTable) => {
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('${table}', 'id'), (SELECT MAX(id) FROM ${table}))`,
  );
};

const insertTranslation = async (id: number, names: Name[], table: TranslationTable) => {
  for (const name of names) {
    await db.insert(table).values({
      languageId: languages.get(name.language.name)!.id,
      resourceId: id,
      text: name.name,
    });
  }
};

const insertDamageTo = async (
  from: number,
  relations: TypeRelations,
  generationId: number | null,
) => {
  for (const dmg of relations.no_damage_to) {
    await db
      .insert(schema.typeDamageRelation)
      .values({
        fromTypeId: from,
        toTypeId: types.get(dmg.name)!.id,
        damage: 0,
        generationId,
      })
      .onConflictDoNothing();
  }
  for (const dmg of relations.half_damage_to) {
    await db
      .insert(schema.typeDamageRelation)
      .values({
        fromTypeId: from,
        toTypeId: types.get(dmg.name)!.id,
        damage: 0.5,
        generationId,
      })
      .onConflictDoNothing();
  }
  for (const dmg of relations.double_damage_to) {
    await db
      .insert(schema.typeDamageRelation)
      .values({
        fromTypeId: from,
        toTypeId: types.get(dmg.name)!.id,
        damage: 2,
        generationId,
      })
      .onConflictDoNothing();
  }
};

const mainProgrees = new Progress("migration", 20);

const migrate = async <T extends keyof typeof data>(
  name: T,
  migrationFn: (item: (typeof data)[T][number]) => Promise<void>,
  handleError?: (item: (typeof data)[T][number], error: unknown) => Promise<void>,
) => {
  const items = data[name];
  const progress = new Progress(name, items.length);

  for (const item of items) {
    try {
      await migrationFn(item);
      progress.track();
    } catch (error) {
      if (handleError) {
        await handleError(item, error);
      } else {
        console.error(`Error on ${name} (${item.id})`);
        console.error(error);
        throw error;
      }
    }
  }

  progress.end();
  mainProgrees.track();
};

const languages = byName(data.languages);
const generations = byName(data.generation);
const regions = byName(data.regions);
const versions = byName(data.versions);
const versionGroups = byName(data.versionGroup);
const locations = byName(data.locations);

const pokemons = byName(data.pokemon);
const pokemonSpecies = byName(data.pokemonSpecies);
const eggGroups = byName(data.eggGroups);
const types = byName(data.types);

const moves = byName(data.move);

const items = byName(data.items);
const itemsAttributes = byName(data.itemsAttributes);
const itemsCategories = byName(data.itemsCategories);
const itemsEffects = byName(data.itemsEffect);
const itemsPockets = byName(data.itemsPocket);

const abilities = byName(data.abilities);
const learnMethods = byName(data.learn);

const machines = data.machine.reduce((map, machine) => {
  map.set(`https://pokeapi.co/api/v2/machine/${machine.id}/`, machine);
  return map;
}, new Map<string, Machine>());

// language
await migrate("languages", async (lng) => {
  await db.insert(schema.language).values({
    id: lng.id,
    iso3166: lng.iso3166,
    iso639: lng.iso639,
    name: lng.name,
    official: lng.official,
  });

  for (const name of lng.names) {
    await db.insert(schema.languageName).values({
      languageId: lng.id,
      name: name.name,
    });
  }
});

// generation
await migrate("generation", async (gen) => {
  await db.insert(schema.generation).values({
    id: gen.id,
    name: gen.name,
  });

  await insertTranslation(gen.id, gen.names, schema.generationName);
});

// region
await migrate("regions", async (re) => {
  await db.insert(schema.region).values({
    id: re.id,
    name: re.name,
    mainGenerationId: re.main_generation ? generations.get(re.main_generation.name)!.id : null,
  });

  await insertTranslation(re.id, re.names, schema.regionName);
});

// version group
await migrate("versionGroup", async (vg) => {
  await db.insert(schema.versionGroup).values({
    id: vg.id,
    name: vg.name,
    order: vg.order,
    generationId: generations.get(vg.generation.name)!.id,
  });

  for (const reg of vg.regions) {
    await db.insert(schema.versionGroupRegion).values({
      regionId: regions.get(reg.name)!.id,
      versionGroupId: vg.id,
    });
  }
});

// version
await migrate("versions", async (version) => {
  await db.insert(schema.version).values({
    id: version.id,
    name: version.name,
    versionGroupId: versionGroups.get(version.version_group.name)!.id,
  });

  await insertTranslation(version.id, version.names, schema.versionName);
});

// location
await migrate("locations", async (loc) => {
  await db.insert(schema.location).values({
    id: loc.id,
    name: loc.name,
    regionId: loc.region?.name ? regions.get(loc.region?.name)?.id : null,
  });

  await insertTranslation(loc.id, loc.names, schema.locationName);

  for (const game of loc.game_indices) {
    await db
      .insert(schema.locationGeneration)
      .values({
        locationId: loc.id,
        generationId: generations.get(game.generation.name)!.id,
      })
      .onConflictDoNothing();
  }
});

// location area
await migrate("locationAreas", async (loa) => {
  await db.insert(schema.locationArea).values({
    id: loa.id,
    name: loa.name,
    locationId: locations.get(loa.location.name)!.id,
  });

  await insertTranslation(loa.id, loa.names, schema.locationAreaName);
});

// types
await migrate("types", async (ty) => {
  await db.insert(schema.type).values({
    id: ty.id,
    name: ty.name,
    damageClass: ty.move_damage_class?.name as DamageClass | undefined,
    generationId: generations.get(ty.generation.name)!.id,
  });

  await insertTranslation(ty.id, ty.names, schema.typeName);
});

// type dagmage relations
await migrate("types", async (ty) => {
  await insertDamageTo(ty.id, ty.damage_relations, null);

  for (const past of ty.past_damage_relations) {
    await insertDamageTo(ty.id, past.damage_relations, generations.get(past.generation.name)!.id);
  }
});

// item pocket
await migrate("itemsPocket", async (pocket) => {
  await db.insert(schema.itemPocket).values({
    id: pocket.id,
    name: pocket.name,
  });

  await insertTranslation(pocket.id, pocket.names, schema.itemPocketName);
});

// item category
await migrate("itemsCategories", async (cat) => {
  await db.insert(schema.itemCategory).values({
    id: cat.id,
    name: cat.name,
    itemPocketId: itemsPockets.get(cat.pocket.name)!.id,
  });

  await insertTranslation(cat.id, cat.names, schema.itemCategoryName);
});

// item attribute
await migrate("itemsAttributes", async (attr) => {
  await db.insert(schema.itemAttribute).values({
    id: attr.id,
    name: attr.name,
  });

  await insertTranslation(attr.id, attr.names, schema.itemAttributeName);

  for (const desc of attr.descriptions) {
    await db.insert(schema.itemAttributeDescription).values({
      languageId: languages.get(desc.language.name)!.id,
      resourceId: attr.id,
      text: desc.description,
    });
  }
});

// item
await migrate(
  "items",
  async (item) => {
    await db.insert(schema.item).values({
      id: item.id,
      name: item.name,
      categoryId: itemsCategories.get(item.category.name)!.id,
      cost: item.cost,
      flingPower: item.fling_power,
      sprite: item.sprites?.default,
    });

    await insertTranslation(item.id, item.names, schema.itemName);

    for (const effect of item.effect_entries) {
      await db.insert(schema.itemEffect).values({
        languageId: languages.get(effect.language.name)!.id,
        resourceId: item.id,
        text: effect.effect,
        shortText: effect.short_effect,
      });
    }

    if (item.fling_effect) {
      const flingEffect = itemsEffects.get(item.fling_effect.name);
      if (flingEffect) {
        for (const effect of flingEffect.effect_entries) {
          await db.insert(schema.itemFlingEffect).values({
            languageId: languages.get(effect.language.name)!.id,
            resourceId: item.id,
            text: effect.effect,
          });
        }
      }
    }

    for (const flavor of item.flavor_text_entries) {
      await db.insert(schema.itemFlavorText).values({
        languageId: languages.get(flavor.language.name)!.id,
        resourceId: item.id,
        text: flavor.text,
        versionGroupId: versionGroups.get(flavor.version_group.name)!.id,
      });
    }

    for (const gen of item.game_indices) {
      await db.insert(schema.itemGeneration).values({
        generationId: generations.get(gen.generation.name)!.id,
        itemId: item.id,
      });
    }

    for (const attr of item.attributes) {
      await db.insert(schema.itemItemAttribute).values({
        itemId: item.id,
        itemAttributeId: itemsAttributes.get(attr.name)!.id,
      });
    }
  },
  async (item, err) => {
    if (err instanceof Error) {
      if (err.message === `duplicate key value violates unique constraint "item_pkey"`) {
        // No se por qué hay items duplicados
        console.log("ERROR: Duplicate item: ", item.id);
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  },
);

// ability
await migrate("abilities", async (ab) => {
  await db.insert(schema.ability).values({
    id: ab.id,
    name: ab.name,
    generationId: generations.get(ab.generation.name)!.id,
    isMainSeries: ab.is_main_series,
  });

  await insertTranslation(ab.id, ab.names, schema.abilityName);

  for (const effect of ab.effect_entries) {
    await db.insert(schema.abilityEffect).values({
      languageId: languages.get(effect.language.name)!.id,
      resourceId: ab.id,
      text: effect.effect,
      shortText: effect.short_effect,
    });
  }

  for (const past of ab.effect_changes) {
    for (const effect of past.effect_entries) {
      await db.insert(schema.abilityEffect).values({
        languageId: languages.get(effect.language.name)!.id,
        resourceId: ab.id,
        text: effect.effect,
        versionGroupId: versionGroups.get(past.version_group.name)!.id,
      });
    }
  }

  for (const flavor of ab.flavor_text_entries) {
    await db.insert(schema.abilityFlavorText).values({
      languageId: languages.get(flavor.language.name)!.id,
      resourceId: ab.id,
      text: flavor.flavor_text,
      versionGroupId: versionGroups.get(flavor.version_group.name)!.id,
    });
  }
});

// moves
await migrate("move", async (move) => {
  await db.insert(schema.move).values({
    id: move.id,
    name: move.name,
    damageClass: move.damage_class!.name as DamageClass,
    generationId: generations.get(move.generation.name)!.id,
    priority: move.priority,
    target: move.target.name as MoveTarget,
    typeId: types.get(move.type.name)!.id,
    accuracy: move.accuracy,
    ailment: move.meta?.ailment.name as MoveAilment,
    ailmentChance: move.meta?.ailment_chance,
    category: move.meta?.category.name as MoveCategory,
    changeAccuracy: move.stat_changes.find((c) => c.stat.name === "accuracy")?.change,
    changeAttack: move.stat_changes.find((c) => c.stat.name === "attack")?.change,
    changeDefense: move.stat_changes.find((c) => c.stat.name === "defence")?.change,
    changeEvasion: move.stat_changes.find((c) => c.stat.name === "evasion")?.change,
    changeSpecialAttack: move.stat_changes.find((c) => c.stat.name === "special-attack")?.change,
    changeSpecialDefense: move.stat_changes.find((c) => c.stat.name === "special-defense")?.change,
    changeSpeed: move.stat_changes.find((c) => c.stat.name === "speed")?.change,
    drain: move.meta?.drain,
    effectChance: move.effect_chance,
    critRate: move.meta?.crit_rate,
    flinchChance: move.meta?.flinch_chance,
    healing: move.meta?.healing,
    maxHits: move.meta?.max_hits,
    maxTurns: move.meta?.max_turns,
    minHits: move.meta?.min_hits,
    minTurns: move.meta?.min_turns,
    power: move.power,
    pp: move.pp,
    statChance: move.meta?.stat_chance,
  });

  await insertTranslation(move.id, move.names, schema.moveName);

  for (const machine of move.machines) {
    await db.insert(schema.moveMachine).values({
      moveId: move.id,
      itemId: items.get(machines.get(machine.machine.url)!.item.name)!.id,
      versionGroupId: versionGroups.get(machine.version_group.name)!.id,
    });
  }

  for (const effect of move.effect_entries) {
    await db.insert(schema.moveEffect).values({
      languageId: languages.get(effect.language.name)!.id,
      resourceId: move.id,
      text: effect.effect,
      shortText: effect.short_effect,
    });
  }

  for (const past of move.effect_changes) {
    for (const effect of past.effect_entries) {
      await db.insert(schema.moveEffect).values({
        languageId: languages.get(effect.language.name)!.id,
        resourceId: move.id,
        text: effect.effect,
        versionGroupId: versionGroups.get(past.version_group!.name)!.id,
      });
    }
  }

  for (const past of move.past_values) {
    await db.insert(schema.movePastValues).values({
      moveId: move.id,
      typeId: past.type ? types.get(past.type.name)!.id : null,
      versionGroupId: versionGroups.get(past.version_group!.name)!.id,
      accuracy: past.accuracy,
      effectChance: past.effect_chance,
      power: past.power,
      pp: past.pp,
    });
  }

  for (const flavor of move.flavor_text_entries) {
    await db.insert(schema.moveFlavorText).values({
      languageId: languages.get(flavor.language.name)!.id,
      resourceId: move.id,
      text: flavor.flavor_text,
      versionGroupId: versionGroups.get(flavor.version_group.name)!.id,
    });
  }
});

// move learn
await migrate("learn", async (learn) => {
  await db.insert(schema.moveLearnMethod).values({
    id: learn.id,
    name: learn.name,
  });

  await insertTranslation(learn.id, learn.names, schema.moveLearnMethodName);

  for (const desc of learn.descriptions) {
    await db.insert(schema.moveLearnMethodDescription).values({
      languageId: languages.get(desc.language.name)!.id,
      resourceId: learn.id,
      text: desc.description,
    });
  }
});

// eggs
await migrate("eggGroups", async (egg) => {
  await db.insert(schema.eggGroup).values({
    id: egg.id,
    name: egg.name,
  });

  await insertTranslation(egg.id, egg.names, schema.eggGroupName);
});

// pokemon species
await migrate("pokemonSpecies", async (sp) => {
  await db.insert(schema.pokemonSpecies).values({
    id: sp.id,
    name: sp.name,
    baseHappiness: sp.base_happiness,
    captureRate: sp.capture_rate,
    color: sp.color.name as PokemonColor,
    formsSwitchable: sp.forms_switchable,
    genderRate: sp.gender_rate,
    generationId: generations.get(sp.generation.name)!.id,
    growthRate: sp.growth_rate.name as GrowthRate,
    habitat: sp.habitat?.name as PokemonHabitat | undefined,
    hasGenderDifferences: sp.has_gender_differences,
    hatchCounter: sp.hatch_counter,
    isBaby: sp.is_baby,
    isLegendary: sp.is_legendary,
    isMythical: sp.is_mythical,
    order: sp.order,
    shape: sp.shape.name as PokemonShapes,
    evolvesFromPokemonSpeciesId: sp.evolves_from_species
      ? pokemonSpecies.get(sp.evolves_from_species.name)?.id
      : null,
  });

  await insertTranslation(sp.id, sp.names, schema.pokemonSpeciesName);

  for (const genus of sp.genera) {
    await db.insert(schema.pokemonSpeciesGenus).values({
      languageId: languages.get(genus.language.name)!.id,
      resourceId: sp.id,
      text: genus.genus,
    });
  }

  for (const flavor of sp.flavor_text_entries) {
    await db.insert(schema.pokemonSpeciesFlavorText).values({
      languageId: languages.get(flavor.language.name)!.id,
      resourceId: sp.id,
      text: flavor.flavor_text,
      versionId: versions.get((flavor as any).version.name)!.id,
    });
  }

  for (const egg of sp.egg_groups) {
    await db.insert(schema.pokemonSpeciesEggGroup).values({
      eggGroupId: eggGroups.get(egg.name)!.id,
      pokemonSpeciesId: sp.id,
    });
  }
});

await migrate("pokemon", async (poke) => {
  const stats = {
    hp: poke.stats.find((s) => s.stat.name === "hp")!,
    attack: poke.stats.find((s) => s.stat.name === "attack")!,
    defense: poke.stats.find((s) => s.stat.name === "defense")!,
    special: poke.stats.find((s) => s.stat.name === "special-attack")!,
    specialDef: poke.stats.find((s) => s.stat.name === "special-defense")!,
    speed: poke.stats.find((s) => s.stat.name === "speed")!,
  };

  await db.insert(schema.pokemon).values({
    id: poke.id,
    name: poke.name,

    baseAttack: stats.attack.base_stat,
    baseDefense: stats.defense.base_stat,
    baseHp: stats.hp.base_stat,
    baseSpecialAttack: stats.special.base_stat,
    baseSpecialDefense: stats.specialDef.base_stat,
    baseSpeed: stats.special.base_stat,

    evAttack: stats.attack.effort,
    evDefense: stats.defense.effort,
    evHp: stats.hp.effort,
    evSpecialAttack: stats.special.effort,
    evSpecialDefense: stats.specialDef.effort,
    evSpeed: stats.special.effort,

    baseExperience: poke.base_experience,
    height: poke.height * 10,
    order: poke.order,
    primaryTypeId: types.get(poke.types.find((t) => t.slot === 1)!.type.name)!.id,
    secondaryTypeId: poke.types.find((t) => t.slot === 2)
      ? types.get(poke.types.find((t) => t.slot === 2)!.type.name)!.id
      : null,
    speciesId: pokemonSpecies.get(poke.species.name)!.id,
    weight: poke.weight * 0.1,

    backDefault: poke.sprites.back_default,
    backFemale: poke.sprites.back_female,
    backShiny: poke.sprites.back_shiny,
    backShinyFemale: poke.sprites.back_shiny_female,
    frontDefault: poke.sprites.front_default,
    frontFemale: poke.sprites.front_female,
    frontShiny: poke.sprites.front_shiny,
    frontShinyFemale: poke.sprites.front_shiny_female,
  });

  for (const past of poke.past_types) {
    await db.insert(schema.pokemonPastType).values({
      generationId: generations.get(past.generation.name)!.id,
      pokemonId: poke.id,
      primaryTypeId: types.get(past.types.find((t) => t.slot === 1)!.type.name)!.id,
      secondaryTypeId: past.types.find((t) => t.slot === 2)
        ? types.get(past.types.find((t) => t.slot === 2)!.type.name)!.id
        : null,
    });
  }

  for (const v of poke.game_indices) {
    const version = versions.get(v.version.name)!;
    const versionGroup = versionGroups.get(version.version_group.name)!;

    let versionSprites: {
      back_default?: string | null;
      back_female?: string | null;
      back_shiny?: string | null;
      back_shiny_female?: string | null;
      front_default?: string | null;
      front_female?: string | null;
      front_shiny?: string | null;
      front_shiny_female?: string | null;
    } | null = null;

    const generationSprites =
      poke.sprites.versions[versionGroup.generation.name as keyof VersionSprites];
    if (generationSprites) {
      // @ts-ignore
      versionSprites = generationSprites[version.name] ?? null;
    }

    await db.insert(schema.pokemonVersionAppearance).values({
      versionId: version.id,
      pokemonId: poke.id,
      backDefault: versionSprites?.back_default,
      backFemale: versionSprites?.back_female,
      backShiny: versionSprites?.back_shiny,
      backShinyFemale: versionSprites?.back_shiny_female,
      frontDefault: versionSprites?.front_default,
      frontFemale: versionSprites?.front_female,
      frontShiny: versionSprites?.front_shiny,
      frontShinyFemale: versionSprites?.front_shiny_female,
    });
  }

  for (const item of poke.held_items) {
    for (const version of item.version_details) {
      await db.insert(schema.pokemonHeldItem).values({
        pokemonId: poke.id,
        itemId: items.get(item.item.name)!.id,
        rarity: version.rarity,
        versionId: versions.get(version.version.name)!.id,
      });
    }
  }

  for (const move of poke.moves) {
    for (const vg of move.version_group_details) {
      await db.insert(schema.pokemonMove).values({
        moveId: moves.get(move.move.name)!.id,
        pokemonId: poke.id,
        versionGroupId: versionGroups.get(vg.version_group.name)!.id,
        learnLevel: vg.level_learned_at,
        learnMethodId: learnMethods.get(vg.move_learn_method.name)!.id,
      });
    }
  }

  for (const ab of poke.abilities) {
    await db.insert(schema.pokemonAbility).values({
      pokemonId: poke.id,
      abilityId: abilities.get(ab.ability.name)!.id,
      isHidden: ab.is_hidden,
      slot: ab.slot,
    });
  }
});

await migrate("pokemonForm", async (form) => {
  await db.insert(schema.pokemonForm).values({
    id: form.id,
    name: form.name,
    pokemonId: pokemons.get(form.pokemon.name)!.id,
    isBattleOnly: form.is_battle_only,
    isDefault: form.is_default,
    isMega: form.is_mega,
    order: form.order,
    primaryTypeId: types.get(form.types.find((t) => t.slot === 1)!.type.name)!.id,
    secondaryTypeId: form.types.find((t) => t.slot === 2)
      ? types.get(form.types.find((t) => t.slot === 2)!.type.name)!.id
      : null,
    versionGroupId: versionGroups.get(form.version_group.name)!.id,
    backDefault: form.sprites.back_default,
    backFemale: form.sprites.back_female,
    backShiny: form.sprites.back_shiny,
    backShinyFemale: form.sprites.back_shiny_female,
    frontDefault: form.sprites.front_default,
    frontFemale: form.sprites.front_female,
    frontShiny: form.sprites.front_shiny,
    frontShinyFemale: form.sprites.front_shiny_female,
  });

  await insertTranslation(form.id, form.names, schema.pokemonFormName);
});

// pokedex
await migrate("pokedex", async (dex) => {
  await db.insert(schema.pokedex).values({
    id: dex.id,
    name: dex.name,
    isMainSeries: dex.is_main_series,
    regionId: dex.region?.name ? regions.get(dex.region?.name)!.id : null,
  });

  await insertTranslation(dex.id, dex.names, schema.pokedexName);

  for (const desc of dex.descriptions) {
    await db.insert(schema.pokedexDescription).values({
      languageId: languages.get(desc.language.name)!.id,
      resourceId: dex.id,
      text: desc.description,
    });
  }

  for (const vg of dex.version_groups) {
    await db.insert(schema.pokedexVersionGroup).values({
      pokedexId: dex.id,
      versionGroupId: versionGroups.get(vg.name)!.id,
    });
  }

  for (const entry of dex.pokemon_entries) {
    await db.insert(schema.pokedexEntry).values({
      pokedexId: dex.id,
      pokemonSpeciesId: pokemonSpecies.get(entry.pokemon_species.name)!.id,
      entryNumber: entry.entry_number,
    });
  }
});

// Reset all sequences
await resetSerial(schema.language);
await resetSerial(schema.generation);
await resetSerial(schema.region);
await resetSerial(schema.versionGroup);
await resetSerial(schema.version);
await resetSerial(schema.location);
await resetSerial(schema.locationArea);
await resetSerial(schema.type);
await resetSerial(schema.itemPocket);
await resetSerial(schema.itemCategory);
await resetSerial(schema.itemAttribute);
await resetSerial(schema.item);
await resetSerial(schema.ability);
await resetSerial(schema.move);
await resetSerial(schema.moveLearnMethod);
await resetSerial(schema.eggGroup);
await resetSerial(schema.pokemonSpecies);
await resetSerial(schema.pokemon);
await resetSerial(schema.pokemonForm);
await resetSerial(schema.pokedex);

mainProgrees.end();

process.exit(0);
