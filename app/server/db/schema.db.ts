import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  PgColumn,
  pgSchema,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import {
  damageClass,
  growthRates,
  moveAilment,
  moveCategory,
  moveTarget,
  pokemonColors,
  pokemonHabitat,
  pokemonShapes,
} from "./enums.db";

// TODO location area encounters? guardar en que areas se pueden encontrar los pokemon

/*
 * SCHEMAS
 */

export const authSchema = pgSchema("auth");
export const pokemonSchema = pgSchema("pokemon");

/*
 * COMMON COLUMNS
 */

const idCols = {
  /** The identifier for this resource */
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  /** The name for this resource */
  name: text().notNull(),
};

const auditCols = {
  /** The creation date for this resource */
  createdAt: timestamp("created_at").notNull().defaultNow(),
  /** The update date for this resource */
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
};

/**
 * Helper para crear una table normalizada de traducciones
 *
 * @param name nombre de la tabla
 * @param resourceIdCol referencia a la columna id del recurso traducido
 * @returns tabla con pk(languageId, resourceId) y text (traducción)
 */
const translationTable = (name: string, resourceIdCol: PgColumn) =>
  pokemonSchema.table(
    name,
    {
      languageId: integer()
        .notNull()
        .references(() => language.id),
      resourceId: integer()
        .notNull()
        .references(() => resourceIdCol),
      text: text().notNull(),

      ...auditCols,
    },
    (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId] }) }],
  );

export const user = authSchema.table("user", {
  ...idCols,

  passwordHash: text().notNull(),
  email: text("email").unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  isAdmin: boolean().notNull().default(false),

  ...auditCols,
});

export const session = authSchema.table("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  ...auditCols,
});

/*
 * TABLES
 */

export const language = pokemonSchema.table("language", {
  ...idCols,

  /** Whether or not the games are published in this language */
  official: boolean().notNull(),
  /** The two-letter code of the country where this language is spoken. Note that it is not unique */
  iso639: text().notNull(),
  /** The two-letter code of the language. Note that it is not unique */
  iso3166: text().notNull(),

  ...auditCols,
});

export const languageName = pokemonSchema.table("language_name", {
  id: serial().primaryKey(),
  languageId: integer()
    .notNull()
    .references(() => language.id),
  name: text().notNull(),

  ...auditCols,
});

/**
 * ## Generation
 * A generation is a grouping of the Pokémon games that separates them based on the Pokémon they include.
 * In each generation, a new set of Pokémon, Moves, Abilities and Types that did not exist in the previous generation are released.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Generation) for greater details.
 */
export const generation = pokemonSchema.table("generation", {
  ...idCols,
  ...auditCols,
});

/**
 * Translations for generation name
 */
export const generationName = translationTable("generation_name", generation.id);

/**
 * ## Pokedex
 *
 * A Pokédex is a handheld electronic encyclopedia device;
 * one which is capable of recording and retaining information of the various Pokémon in a given region
 * with the exception of the national dex and some smaller dexes related to portions of a region.
 *
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex) for greater detail
 */
export const pokedex = pokemonSchema.table("pokedex", {
  ...idCols,

  /** Whether or not this Pokédex originated in the main series of the video games */
  isMainSeries: boolean().notNull(),
  /** The region this Pokédex catalogues Pokémon for */
  regionId: integer().references(() => region.id),

  ...auditCols,
});

/**
 * Translation for pokedex names
 */
export const pokedexName = translationTable("pokedex_name", pokedex.id);

/**
 * Translations for pokedex descriptions
 */
export const pokedexDescription = translationTable("pokedex_description", pokedex.id);

/**
 * Catalogued pokémon for pokedex
 */
export const pokedexEntry = pokemonSchema.table(
  "pokedex_entry",
  {
    pokedexId: integer()
      .notNull()
      .references(() => pokedex.id),
    pokemonSpeciesId: integer()
      .notNull()
      .references(() => pokemonSpecies.id),
    entryNumber: integer().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokedexId, t.pokemonSpeciesId] }) }],
);

/**
 * ## Pokemon Species
 *
 * A Pokémon Species forms the basis for at least one Pokémon.
 * Attributes of a Pokémon species are shared across all varieties of Pokémon within the species.
 * A good example is Wormadam; Wormadam is the species which can be found in three different varieties,
 * Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant
 */
export const pokemonSpecies = pokemonSchema.table("pokemon_species", {
  ...idCols,

  /** The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage */
  order: integer().notNull(),
  /** The chance of this Pokémon being female, in eighths; or -1 for genderless */
  genderRate: integer().notNull(),
  /** The base capture rate; up to 255. The higher the number, the easier the catch */
  captureRate: integer().notNull(),
  /** The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon */
  baseHappiness: integer(),
  /** Whether or not this is a baby Pokémon */
  isBaby: boolean().notNull(),
  /** Whether or not this is a legendary Pokémon */
  isLegendary: boolean().notNull(),
  /** Whether or not this is a mythical Pokémon */
  isMythical: boolean().notNull(),
  /** Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's */
  hatchCounter: integer(),
  /** Whether or not this Pokémon has visual gender differences */
  hasGenderDifferences: boolean().notNull(),
  /** Whether or not this Pokémon has multiple forms and can switch between them */
  formsSwitchable: boolean().notNull(),
  /** The rate at which this Pokémon species gains levels */
  growthRate: text({ enum: growthRates }).notNull(),
  /** The color of this Pokémon for Pokédex search */
  color: text({ enum: pokemonColors }).notNull(),
  /** The shape of this Pokémon for Pokédex search */
  shape: text({ enum: pokemonShapes }).notNull(),
  /** The Pokémon species that evolves into this Pokemon_species */
  evolvesFromPokemonSpeciesId: integer(),
  /** The generation this Pokémon species was introduced in */
  generationId: integer()
    .notNull()
    .references(() => generation.id),
  /** The habitat this Pokémon species can be encountered in */
  habitat: text({ enum: pokemonHabitat }),

  ...auditCols,
});

export const pokemonSpeciesName = translationTable("pokemon_species_name", pokemonSpecies.id);

/** En taxonomía, el género es una categoría taxonómica que se ubica entre la familia y la especie */
export const pokemonSpeciesGenus = translationTable("pokemon_species_genus", pokemonSpecies.id);

/**
 * ## Pokemon
 * Pokémon are the creatures that inhabit the world of the Pokémon games.
 * They can be caught using Pokéballs and trained by battling with other Pokémon.
 * Each Pokémon belongs to a specific species but may take on a variant
 * which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 */
export const pokemon = pokemonSchema.table("pokemon", {
  ...idCols,

  /** The base experience gained for defeating this Pokémon */
  baseExperience: integer().notNull(),
  /** The height of this Pokémon in cm */
  height: real().notNull(),
  /** The weight of this Pokémon in kg */
  weight: real().notNull(),
  /** Order for sorting. Almost national order, except families are grouped together */
  order: integer().notNull(),
  /** Id of the primary type of the pokemon */
  primaryTypeId: integer()
    .notNull()
    .references(() => type.id),
  /** Id of the secondary type of the pokemon */
  secondaryTypeId: integer().references(() => type.id),
  /** The species this Pokémon belongs to */
  speciesId: integer()
    .notNull()
    .references(() => pokemonSpecies.id),

  baseHp: integer().notNull(),
  baseAttack: integer().notNull(),
  baseDefense: integer().notNull(),
  baseSpecialAttack: integer().notNull(),
  baseSpecialDefense: integer().notNull(),
  baseSpeed: integer().notNull(),

  evHp: integer().notNull(),
  evAttack: integer().notNull(),
  evDefense: integer().notNull(),
  evSpecialAttack: integer().notNull(),
  evSpecialDefense: integer().notNull(),
  evSpeed: integer().notNull(),

  /** The default depiction of this Pokémon form from the front in battle */
  frontDefault: text(),
  /** The female depiction of this Pokémon form from the front in battle */
  frontFemale: text(),
  /** The shiny depiction of this Pokémon form from the front in battle */
  frontShiny: text(),
  /** The shiny female depiction of this Pokémon form from the front in battle */
  frontShinyFemale: text(),
  /** The default depiction of this Pokémon form from the back in battle */
  backDefault: text(),
  /** The female depiction of this Pokémon form from the back in battle */
  backFemale: text(),
  /** The shiny depiction of this Pokémon form from the back in battle */
  backShiny: text(),
  /** The shiny female depiction of this Pokémon form from the back in battle */
  backShinyFemale: text(),

  ...auditCols,
});

//   /** Data describing a Pokemon's types in a previous generation. */
export const pokemonPastType = pokemonSchema.table(
  "pokemon_past_type",
  {
    pokemonId: integer()
      .notNull()
      .references(() => pokemon.id),
    generationId: integer()
      .notNull()
      .references(() => generation.id),
    /** Id of the primary type of the pokemon */
    primaryTypeId: integer()
      .notNull()
      .references(() => type.id),
    /** Id of the secondary type of the pokemon */
    secondaryTypeId: integer().references(() => type.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonId, t.generationId] }) }],
);

/** Forms a Pokémon can take */
export const pokemonForm = pokemonSchema.table("pokemon_form", {
  ...idCols,

  pokemonId: integer()
    .notNull()
    .references(() => pokemon.id),
  /** The order in which forms should be sorted within a species' forms */
  order: integer().notNull(),
  /** True for exactly one form used as the default for each Pokémon */
  isDefault: boolean().notNull(),
  /** Whether or not this form can only happen during battle */
  isBattleOnly: boolean().notNull(),
  /** Whether or not this form requires mega evolution */
  isMega: boolean().notNull(),
  /** The version group this Pokémon form was introduced in */
  versionGroupId: integer()
    .notNull()
    .references(() => versionGroup.id),
  /** Id of the primary type of the pokemon */
  primaryTypeId: integer()
    .notNull()
    .references(() => type.id),
  /** Id of the secondary type of the pokemon */
  secondaryTypeId: integer().references(() => type.id),
  /** The default depiction of this Pokémon form from the front in battle */
  frontDefault: text(),
  /** The female depiction of this Pokémon form from the front in battle */
  frontFemale: text(),
  /** The shiny depiction of this Pokémon form from the front in battle */
  frontShiny: text(),
  /** The shiny female depiction of this Pokémon form from the front in battle */
  frontShinyFemale: text(),
  /** The default depiction of this Pokémon form from the back in battle */
  backDefault: text(),
  /** The female depiction of this Pokémon form from the back in battle */
  backFemale: text(),
  /** The shiny depiction of this Pokémon form from the back in battle */
  backShiny: text(),
  /** The shiny female depiction of this Pokémon form from the back in battle */
  backShinyFemale: text(),

  ...auditCols,
});

export const pokemonFormName = translationTable("pokemon_form_name", pokemonForm.id);

export const pokemonVersionAppearance = pokemonSchema.table(
  "pokemon_version_appearance",
  {
    pokemonId: integer()
      .notNull()
      .references(() => pokemon.id),
    versionId: integer()
      .notNull()
      .references(() => version.id),

    /** The default depiction of this Pokémon form from the front in battle */
    frontDefault: text(),
    /** The female depiction of this Pokémon form from the front in battle */
    frontFemale: text(),
    /** The default depiction of this Pokémon form from the back in battle */
    backDefault: text(),
    /** The female depiction of this Pokémon form from the back in battle */
    backFemale: text(),

    /** The shiny depiction of this Pokémon form from the front in battle */
    frontShiny: text(),
    /** The shiny female depiction of this Pokémon form from the front in battle */
    frontShinyFemale: text(),
    /** The shiny depiction of this Pokémon form from the back in battle */
    backShiny: text(),
    /** The shiny female depiction of this Pokémon form from the back in battle */
    backShinyFemale: text(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonId, t.versionId] }) }],
);

export const pokemonHeldItem = pokemonSchema.table(
  "pokemon_held_item",
  {
    pokemonId: integer()
      .notNull()
      .references(() => pokemon.id),
    itemId: integer()
      .notNull()
      .references(() => item.id),
    versionId: integer()
      .notNull()
      .references(() => version.id),
    /** How often this Pokémon holds this item in this version */
    rarity: integer().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonId, t.itemId, t.versionId] }) }],
);

export const pokemonSpeciesFlavorText = pokemonSchema.table(
  "pokemon_species_flavor_text",
  {
    resourceId: integer()
      .notNull()
      .references(() => pokemonSpecies.id),
    versionId: integer()
      .notNull()
      .references(() => version.id),
    languageId: integer()
      .notNull()
      .references(() => language.id),
    text: text().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.resourceId, t.versionId, t.languageId] }) }],
);

export const pokemonSpeciesEggGroup = pokemonSchema.table(
  "pokemon_species_egg_group",
  {
    pokemonSpeciesId: integer()
      .notNull()
      .references(() => pokemonSpecies.id),
    eggGroupId: integer()
      .notNull()
      .references(() => eggGroup.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonSpeciesId, t.eggGroupId] }) }],
);

export const eggGroup = pokemonSchema.table("egg_group", {
  ...idCols,
  ...auditCols,
});

export const eggGroupName = translationTable("egg_group_name", eggGroup.id);

export const pokedexVersionGroup = pokemonSchema.table(
  "pokedex_version_group",
  {
    pokedexId: integer()
      .notNull()
      .references(() => pokedex.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokedexId, t.versionGroupId] }) }],
);

export const item = pokemonSchema.table("item", {
  ...idCols,

  /** The price of this item in stores */
  cost: integer().notNull(),
  /** The power of the move Fling when used with this item. */
  flingPower: integer(),
  /** The category of items this item falls into */
  categoryId: integer()
    .notNull()
    .references(() => itemCategory.id),
  /** Sprite used to depict this item in the game */
  sprite: text(),

  ...auditCols,
});

export const itemName = translationTable("item_name", item.id);

/** The effect an item listed in different languages */
export const itemEffect = pokemonSchema.table(
  "item_effect",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => item.id),
    text: text().notNull(),
    shortText: text().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId] }) }],
);

/** The effect an item when using the fling ability listed in different languages */
export const itemFlingEffect = translationTable("item_fling_effect", item.id);

/** The flavor text of an ite listed in different languages and version */
export const itemFlavorText = pokemonSchema.table(
  "item_flavor_text",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => item.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),
    text: text().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId, t.versionGroupId] }) }],
);

export const itemGeneration = pokemonSchema.table(
  "item_generation",
  {
    itemId: integer()
      .notNull()
      .references(() => item.id),
    generationId: integer()
      .notNull()
      .references(() => generation.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.itemId, t.generationId] }) }],
);

export const itemItemAttribute = pokemonSchema.table(
  "item_item_attribute",
  {
    itemId: integer()
      .notNull()
      .references(() => item.id),
    itemAttributeId: integer()
      .notNull()
      .references(() => itemAttribute.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.itemId, t.itemAttributeId] }) }],
);

export const itemAttribute = pokemonSchema.table("item_attribute", {
  ...idCols,
  ...auditCols,
});

export const itemAttributeName = translationTable("item_attribute_name", itemAttribute.id);
export const itemAttributeDescription = translationTable(
  "item_attribute_description",
  itemAttribute.id,
);

export const itemCategory = pokemonSchema.table("item_category", {
  ...idCols,
  itemPocketId: integer()
    .notNull()
    .references(() => itemPocket.id),

  ...auditCols,
});

export const itemCategoryName = translationTable("item_category_name", itemCategory.id);

export const itemPocket = pokemonSchema.table("item_pocket", {
  ...idCols,
  ...auditCols,
});

export const itemPocketName = translationTable("item_pocket_name", itemPocket.id);

/**
 * ## Version
 * Versions of the games, e.g., Red, Blue or Yellow,
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Core_series) for greater details.
 */
export const version = pokemonSchema.table("version", {
  ...idCols,

  versionGroupId: integer().references(() => versionGroup.id),

  ...auditCols,
});

export const versionName = translationTable("version_name", version.id);

/**
 * ## Version Group
 * Version groups categorize highly similar versions of the games
 */
export const versionGroup = pokemonSchema.table("version_group", {
  ...idCols,
  order: integer().notNull(),
  generationId: integer()
    .notNull()
    .references(() => generation.id),

  ...auditCols,
});

export const versionGroupRegion = pokemonSchema.table(
  "version_group_region",
  {
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),
    regionId: integer()
      .notNull()
      .references(() => region.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.versionGroupId, t.regionId] }) }],
);

/**
 * ## Region
 * A region is an organized area of the Pokémon world.
 * Most often, the main difference between regions is
 * the species of Pokémon that can be encountered within them.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Region) for greater details.
 */
export const region = pokemonSchema.table("region", {
  ...idCols,
  mainGenerationId: integer().references(() => generation.id),

  ...auditCols,
});

export const regionName = translationTable("region_name", region.id);

/**
 * ## Location
 * Locations that can be visited within the games.
 * Locations make up sizable portions of regions, like cities or routes.
 * - Check the [List of Locations](https://bulbapedia.bulbagarden.net/wiki/List_of_locations_by_name)
 */
export const location = pokemonSchema.table("location", {
  ...idCols,

  regionId: integer().references(() => region.id),

  ...auditCols,
});

export const locationName = translationTable("location_name", location.id);

export const locationGeneration = pokemonSchema.table(
  "location_generation",
  {
    locationId: integer()
      .notNull()
      .references(() => location.id),
    generationId: integer()
      .notNull()
      .references(() => generation.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.locationId, t.generationId] }) }],
);

/**
 * ## Location Area
 * Location areas are sections of areas, such as floors in a building or cave.
 * Each area has its own set of possible Pokémon encounters.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Area) for more details.
 */
export const locationArea = pokemonSchema.table("location_area", {
  ...idCols,
  locationId: integer()
    .notNull()
    .references(() => location.id),

  ...auditCols,
});

export const locationAreaName = translationTable("location_area_name", locationArea.id);

/**
 * ## Type
 * Types are properties for Pokémon and their moves.
 * Each type has three properties: which types of Pokémon it is super effective against,
 * which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against
 */
export const type = pokemonSchema.table("type", {
  ...idCols,

  /** The generation in which this move was introduced */
  generationId: integer()
    .notNull()
    .references(() => generation.id),
  /** The class of damage inflicted by this type in generation 1 and 2 */
  damageClass: text({ enum: damageClass }),

  ...auditCols,
});

export const typeName = translationTable("type_name", type.id);

export const typeDamageRelation = pokemonSchema.table(
  "type_damage_relation",
  {
    fromTypeId: integer()
      .notNull()
      .references(() => type.id),
    toTypeId: integer()
      .notNull()
      .references(() => type.id),
    damage: real().notNull(),
    /** Past generation of the relation, if null it is the current relation */
    generationId: integer().references(() => generation.id),
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.fromTypeId, t.toTypeId, t.generationId] }),
      checkDmgRelationValue: check(
        "checkDmgRelationValue",
        sql`${t.damage} >= 0 AND ${t.damage} <= 2`,
      ),
    },
  ],
);

export const move = pokemonSchema.table(
  "move",
  {
    ...idCols,

    /** The elemental type of this move */
    typeId: integer()
      .notNull()
      .references(() => type.id),
    /** The percent value of how likely this move is to be successful */
    accuracy: integer(),
    /** The percent value of how likely it is this moves effect will happen */
    effectChance: integer(),
    /** Power points. The number of times this move can be used */
    pp: integer(),
    /**
     * A value between -8 and 8. Sets the order in which moves are executed during battle.
     * See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Priority) for greater detail
     */
    priority: integer().notNull(),
    /** The base power of this move with a value of 0 if it does not have a base power */
    power: integer(),
    /** The generation in which this move was introduced */
    generationId: integer()
      .notNull()
      .references(() => generation.id),
    /** The type of damage the move inflicts on the target @example physical */
    damageClass: text({ enum: damageClass }).notNull(),
    /** The type of target that will receive the effects of the attack */
    target: text({ enum: moveTarget }).notNull(),

    // Stat changes
    changeAttack: integer(),
    changeDefense: integer(),
    changeSpecialAttack: integer(),
    changeSpecialDefense: integer(),
    changeSpeed: integer(),
    changeAccuracy: integer(),
    changeEvasion: integer(),

    // Metadata about this move
    /** The status ailment this move inflicts on its target. */
    ailment: text({ enum: moveAilment }),
    /** The category of move this move falls under, e.g. damage or ailment. */
    category: text({ enum: moveCategory }),
    /** The minimum number of times this move hits. Null if it always only hits once. */
    minHits: integer(),
    /** The maximum number of times this move hits. Null if it always only hits once. */
    maxHits: integer(),
    /** The minimum number of turns this move continues to take effect. Null if it always only lasts one turn. */
    minTurns: integer(),
    /** The maximum number of turns this move continues to take effect. Null if it always only lasts one turn. */
    maxTurns: integer(),
    /** HP drain (if positive) or Recoil damage (if negative), in percent of damage done. */
    drain: integer(),
    /** The amount of hp gained by the attacking Pokemon, in percent of it's maximum HP. */
    healing: integer(),
    /**  Critical hit rate bonus. */
    critRate: integer(),
    /** The likelihood this attack will cause an ailment. */
    ailmentChance: integer(),
    /** The likelihood this attack will cause the target Pokémon to flinch. */
    flinchChance: integer(),
    /** The likelihood this attack will cause a stat change in the target Pokémon. */
    statChance: integer(),

    ...auditCols,
  },
  (t) => [
    {
      checkPriorityValues: check(
        "checkPriorityValues",
        sql`${t.priority} >= -8 AND ${t.priority} <= 8`,
      ),
    },
  ],
);

export const moveMachine = pokemonSchema.table(
  "move_machine",
  {
    moveId: integer()
      .notNull()
      .references(() => move.id),
    itemId: integer()
      .notNull()
      .references(() => item.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.moveId, t.itemId, t.versionGroupId] }) }],
);

export const moveName = translationTable("move_name", move.id);

/** The effect of a move listed in different languages */
export const moveEffect = pokemonSchema.table(
  "move_effect",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => move.id),
    text: text().notNull(),
    shortText: text(),
    /** Past generation of the effect, if null it is the current effect */
    versionGroupId: integer().references(() => versionGroup.id),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId, t.versionGroupId] }) }],
);

export const movePastValues = pokemonSchema.table(
  "move_past_values",
  {
    moveId: integer()
      .notNull()
      .references(() => move.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),

    /** The elemental type of this move */
    typeId: integer().references(() => type.id),
    /** The percent value of how likely this move is to be successful */
    accuracy: integer(),
    /** The percent value of how likely it is this moves effect will happen */
    effectChance: integer(),
    /** Power points. The number of times this move can be used */
    pp: integer(),
    /** The base power of this move with a value of 0 if it does not have a base power */
    power: integer(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.moveId, t.versionGroupId] }) }],
);

/** The flavor text of a move listed in different languages */
export const moveFlavorText = pokemonSchema.table(
  "move_flavor_text",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => move.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),
    text: text().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId, t.versionGroupId] }) }],
);

export const moveLearnMethod = pokemonSchema.table("move_learn_method", {
  ...idCols,
  ...auditCols,
});

export const moveLearnMethodName = translationTable("move_learn_method_name", moveLearnMethod.id);
export const moveLearnMethodDescription = translationTable(
  "move_learn_method_description",
  moveLearnMethod.id,
);

export const pokemonMove = pokemonSchema.table(
  "pokemon_move",
  {
    pokemonId: integer()
      .notNull()
      .references(() => pokemon.id),
    moveId: integer()
      .notNull()
      .references(() => move.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),
    learnMethodId: integer().references(() => moveLearnMethod.id),
    learnLevel: integer().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonId, t.moveId, t.versionGroupId] }) }],
);

/**
 * ## Ability
 * Abilities provide passive effects for Pokémon in battle or in the overworld.
 * Pokémon have multiple possible abilities but can have only one ability at a time.
 * - Check out [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Ability) for greater detail.
 */
export const ability = pokemonSchema.table("ability", {
  ...idCols,

  /** Whether or not this ability originated in the main series of the video games */
  isMainSeries: boolean().notNull(),
  /** The generation this ability originated in */
  generationId: integer()
    .notNull()
    .references(() => generation.id),

  ...auditCols,
});

/** The name of an ability listed in different languages */
export const abilityName = translationTable("ability_name", ability.id);

/** The effect of an ability listed in different languages */
export const abilityEffect = pokemonSchema.table(
  "ability_effect",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => ability.id),
    text: text().notNull(),
    shortText: text(),

    /** Past generation of the effect, if null it is the current effect */
    versionGroupId: integer().references(() => versionGroup.id),
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId, t.versionGroupId] }) }],
);

/** The flavor text of an ability listed in different languages */
export const abilityFlavorText = pokemonSchema.table(
  "ability_flavor_text",
  {
    languageId: integer()
      .notNull()
      .references(() => language.id),
    resourceId: integer()
      .notNull()
      .references(() => ability.id),
    versionGroupId: integer()
      .notNull()
      .references(() => versionGroup.id),
    text: text().notNull(),

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.languageId, t.resourceId, t.versionGroupId] }) }],
);

export const pokemonAbility = pokemonSchema.table(
  "pokemon_ability",
  {
    pokemonId: integer()
      .notNull()
      .references(() => pokemon.id),
    abilityId: integer()
      .notNull()
      .references(() => ability.id),
    isHidden: boolean().notNull(),
    slot: integer().notNull(), // TODO maybe add a check from 1 to 3

    ...auditCols,
  },
  (t) => [{ pk: primaryKey({ columns: [t.pokemonId, t.abilityId] }) }],
);
