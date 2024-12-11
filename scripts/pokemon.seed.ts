// https://pokenode-ts.vercel.app

import { sql } from "drizzle-orm";
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
} from "../app/.server/db/database";
import { data } from "../data/data";
import type { PgTable } from "drizzle-orm/pg-core";
import { type Machine, type Name, type TypeRelations } from "pokenode-ts";

type TranslationTable = typeof schema.generationName;

const byName = <T extends { name: string }>(arr: T[]) => {
  return arr.reduce((m, item) => {
    m.set(item.name, item);
    return m;
  }, new Map<string, T>());
};

const resetSerial = async (table: PgTable) => {
  await db.execute(sql`SELECT setval(pg_get_serial_sequence('${table}', 'id'), (SELECT MAX(id) FROM ${table}))`);
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

const insertDamageTo = async (from: number, relations: TypeRelations, generationId: number | null) => {
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

const languages = byName(data.languages);
const generations = byName(data.generation);
const regions = byName(data.regions);
const pokedexes = byName(data.pokedex);
const versions = byName(data.versions);
const versionGroups = byName(data.versionGroup);
const locations = byName(data.locations);
const locationAreas = byName(data.locationAreas);
const palParks = byName(data.palParks);

const pokemons = byName(data.pokemon);
const pokemonForms = byName(data.pokemonForm);
const pokemonSpecies = byName(data.pokemonSpecies);
const growthRates = byName(data.growthRates);
const eggGroups = byName(data.eggGroups);
const shapes = byName(data.shapes);
const types = byName(data.types);

const moves = byName(data.move);
const moveDamageClasses = byName(data.moveDamageClass);
const moveTargets = byName(data.moveTarget);
const moveAilments = byName(data.moveAilment);
const moveCategories = byName(data.moveCategory);

const items = byName(data.items);
const itemsAttributes = byName(data.itemsAttributes);
const itemsCategories = byName(data.itemsCategories);
const itemsEffects = byName(data.itemsEffect);
const itemsPockets = byName(data.itemsPocket);

const abilities = byName(data.abilities);

const machines = data.machine.reduce((map, machine) => {
  map.set(`https://pokeapi.co/api/v2/move-damage-class/${machine.id}/`, machine);
  return map;
}, new Map<string, Machine>());

// language
for (const lng of data.languages) {
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

  await resetSerial(schema.language);
}

// generation
for (const gen of data.generation) {
  await db.insert(schema.generation).values({
    id: gen.id,
    name: gen.name,
  });

  await insertTranslation(gen.id, gen.names, schema.generationName);

  await resetSerial(schema.generation);
}

// region
for (const re of data.regions) {
  await db.insert(schema.region).values({
    id: re.id,
    name: re.name,
    mainGenerationId: generations.get(re.main_generation.name)!.id,
  });

  await insertTranslation(re.id, re.names, schema.regionName);

  await resetSerial(schema.region);
}

// version group
for (const vg of data.versionGroup) {
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

  await resetSerial(schema.versionGroup);
}

// version
for (const version of data.versions) {
  await db.insert(schema.version).values({
    id: version.id,
    name: version.name,
    versionGroupId: versionGroups.get(version.version_group.name)!.id,
  });

  await insertTranslation(version.id, version.names, schema.versionName);

  await resetSerial(schema.version);
}

// location
for (const loc of data.locations) {
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

  await resetSerial(schema.location);
}

// location area
for (const loa of data.locationAreas) {
  await db.insert(schema.locationArea).values({
    id: loa.id,
    name: loa.name,
    locationId: locations.get(loa.location.name)!.id,
  });

  await insertTranslation(loa.id, loa.names, schema.locationAreaName);

  await resetSerial(schema.locationArea);
}

// pokedex
for (const dex of data.pokedex) {
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

  await resetSerial(schema.pokedexName);
}

// types
for (const ty of data.types) {
  await db.insert(schema.type).values({
    id: ty.id,
    name: ty.name,
    damageClass: ty.move_damage_class.name as "status" | "physical" | "special",
    generationId: generations.get(ty.generation.name)!.id,
  });

  await insertTranslation(ty.id, ty.names, schema.typeName);

  await insertDamageTo(ty.id, ty.damage_relations, null);

  for (const past of ty.past_damage_relations) {
    await insertDamageTo(ty.id, past.damage_relations, generations.get(past.generation.name)!.id);
  }

  await resetSerial(schema.type);
}

// item pocket
for (const pocket of data.itemsPocket) {
  await db.insert(schema.itemPocket).values({
    id: pocket.id,
    name: pocket.name,
  });

  await insertTranslation(pocket.id, pocket.names, schema.itemPocketName);

  await resetSerial(schema.itemPocket);
}

// item category
for (const cat of data.itemsCategories) {
  await db.insert(schema.itemCategory).values({
    id: cat.id,
    name: cat.name,
    itemPocketId: itemsPockets.get(cat.pocket.name)!.id,
  });

  await insertTranslation(cat.id, cat.names, schema.itemCategoryName);

  await resetSerial(schema.itemCategory);
}

// item attribute
for (const attr of data.itemsAttributes) {
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

  await resetSerial(schema.itemAttribute);
}

// item
for (const item of data.items) {
  await db.insert(schema.item).values({
    id: item.id,
    name: item.name,
    categoryId: itemsCategories.get(item.category.name)!.id,
    cost: item.cost,
    flingPower: item.fling_power,
    sprite: item.sprites.default,
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

  await resetSerial(schema.item);
}

// ability
for (const ab of data.abilities) {
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

  await resetSerial(schema.ability);
}

// moves
for (const move of data.move) {
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

  await resetSerial(schema.move);
}

for (const egg of data.eggGroups) {
  await db.insert(schema.eggGroup).values({
    id: egg.id,
    name: egg.name,
  });

  await insertTranslation(egg.id, egg.names, schema.eggGroupName);

  await resetSerial(schema.eggGroup);
}

for (const sp of data.pokemonSpecies) {
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
    habitat: sp.habitat.name as PokemonHabitat,
    hasGenderDifferences: sp.has_gender_differences,
    hatchCounter: sp.hatch_counter,
    isBaby: sp.is_baby,
    isLegendary: sp.is_legendary,
    isMythical: sp.is_mythical,
    order: sp.order,
    shape: sp.shape.name as PokemonShapes,
    evolvesFromPokemonSpeciesId: sp.evolves_from_species ? pokemonSpecies.get(sp.evolves_from_species.name)?.id : null,
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

  await resetSerial(schema.pokemonSpecies);
}

process.exit(0);
