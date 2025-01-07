// TODO in ChatGPT we trust... ir revisando que esté todo según haga falta
import { relations, sql } from "drizzle-orm";

import {
  // Auth schema
  user,
  session,
  // Pokemon schema
  language,
  languageName,
  generation,
  generationName,
  region,
  regionName,
  versionGroupRegion,
  location,
  locationName,
  locationGeneration,
  locationArea,
  locationAreaName,
  pokedex,
  pokedexName,
  pokedexDescription,
  pokedexEntry,
  pokedexVersionGroup,
  pokemonSpecies,
  pokemonSpeciesName,
  pokemonSpeciesGenus,
  pokemonSpeciesFlavorText,
  pokemonSpeciesEggGroup,
  eggGroup,
  eggGroupName,
  pokemon,
  pokemonPastType,
  pokemonForm,
  pokemonFormName,
  pokemonVersionAppearance,
  pokemonHeldItem,
  item,
  itemName,
  itemEffect,
  itemFlingEffect,
  itemFlavorText,
  itemGeneration,
  itemItemAttribute,
  itemAttribute,
  itemAttributeName,
  itemAttributeDescription,
  itemCategory,
  itemCategoryName,
  itemPocket,
  itemPocketName,
  version,
  versionName,
  versionGroup,
  type,
  typeName,
  typeDamageRelation,
  move,
  moveName,
  moveEffect,
  movePastValues,
  moveFlavorText,
  moveMachine,
  moveLearnMethod,
  moveLearnMethodName,
  moveLearnMethodDescription,
  pokemonMove,
  ability,
  abilityName,
  abilityEffect,
  abilityFlavorText,
  pokemonAbility,
} from "./schema.db";

/* ------------------------------------------------------------------
   AUTH SCHEMA RELATIONS
   ------------------------------------------------------------------ */
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session), // user has many sessions
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

/* ------------------------------------------------------------------
   POKEMON SCHEMA RELATIONS
   ------------------------------------------------------------------ */
/* ----------------- LANGUAGE & TRANSLATIONS ----------------------- */
export const languageRelations = relations(language, ({ many }) => ({
  names: many(languageName),
}));

export const languageNameRelations = relations(languageName, ({ one }) => ({
  language: one(language, {
    fields: [languageName.languageId],
    references: [language.id],
  }),
}));

/* ----------------- GENERATION & TRANSLATIONS -------------------- */
export const generationRelations = relations(generation, ({ many }) => ({
  generationNames: many(generationName),
  // A generation has many versionGroups
  versionGroups: many(versionGroup),
  // A generation has many pokemonSpecies
  pokemonSpecies: many(pokemonSpecies),
  // A generation has many types
  types: many(type),
  // A generation has many moves
  moves: many(move),
  // A generation has many abilities
  abilities: many(ability),
  // A generation has many locationGenerations (through locationGeneration table)
  locationGenerations: many(locationGeneration),
  // A generation can be the mainGeneration of many regions
  //   regionsAsMain: many(region, {
  //     fields: [],
  //     references: [],
  //     relationName: "generations_to_regions",
  //   }),
}));

export const generationNameRelations = relations(generationName, ({ one }) => ({
  generation: one(generation, {
    fields: [generationName.resourceId],
    references: [generation.id],
  }),
}));

/* ----------------- REGION & TRANSLATIONS ------------------------- */
export const regionRelations = relations(region, ({ one, many }) => ({
  // region.mainGenerationId -> generation.id
  mainGeneration: one(generation, {
    fields: [region.mainGenerationId],
    references: [generation.id],
  }),
  // region -> regionName
  regionNames: many(regionName),
  // region -> location
  locations: many(location),
  // region -> versionGroupRegion
  versionGroupRegions: many(versionGroupRegion),
}));

export const regionNameRelations = relations(regionName, ({ one }) => ({
  region: one(region, {
    fields: [regionName.resourceId],
    references: [region.id],
  }),
}));

export const versionGroupRegionRelations = relations(versionGroupRegion, ({ one }) => ({
  versionGroup: one(versionGroup, {
    fields: [versionGroupRegion.versionGroupId],
    references: [versionGroup.id],
  }),
  region: one(region, {
    fields: [versionGroupRegion.regionId],
    references: [region.id],
  }),
}));

/* ----------------- LOCATION & TRANSLATIONS ----------------------- */
export const locationRelations = relations(location, ({ one, many }) => ({
  // location.regionId -> region.id
  region: one(region, {
    fields: [location.regionId],
    references: [region.id],
  }),
  // location -> locationName
  locationNames: many(locationName),
  // location -> locationGeneration
  locationGenerations: many(locationGeneration),
  // location -> locationArea
  locationAreas: many(locationArea),
}));

export const locationNameRelations = relations(locationName, ({ one }) => ({
  location: one(location, {
    fields: [locationName.resourceId],
    references: [location.id],
  }),
}));

export const locationGenerationRelations = relations(locationGeneration, ({ one }) => ({
  location: one(location, {
    fields: [locationGeneration.locationId],
    references: [location.id],
  }),
  generation: one(generation, {
    fields: [locationGeneration.generationId],
    references: [generation.id],
  }),
}));

export const locationAreaRelations = relations(locationArea, ({ one, many }) => ({
  location: one(location, {
    fields: [locationArea.locationId],
    references: [location.id],
  }),
  locationAreaNames: many(locationAreaName),
}));

export const locationAreaNameRelations = relations(locationAreaName, ({ one }) => ({
  locationArea: one(locationArea, {
    fields: [locationAreaName.resourceId],
    references: [locationArea.id],
  }),
}));

/* ----------------- POKEDEX & TRANSLATIONS ------------------------ */
export const pokedexRelations = relations(pokedex, ({ one, many }) => ({
  region: one(region, {
    fields: [pokedex.regionId],
    references: [region.id],
  }),
  names: many(pokedexName),
  descriptions: many(pokedexDescription),
  entries: many(pokedexEntry),
  versionGroups: many(pokedexVersionGroup),
}));

export const pokedexNameRelations = relations(pokedexName, ({ one }) => ({
  pokedex: one(pokedex, {
    fields: [pokedexName.resourceId],
    references: [pokedex.id],
  }),
}));

export const pokedexDescriptionRelations = relations(pokedexDescription, ({ one }) => ({
  pokedex: one(pokedex, {
    fields: [pokedexDescription.resourceId],
    references: [pokedex.id],
  }),
}));

export const pokedexEntryRelations = relations(pokedexEntry, ({ one }) => ({
  pokedex: one(pokedex, {
    fields: [pokedexEntry.pokedexId],
    references: [pokedex.id],
  }),
  pokemonSpecies: one(pokemonSpecies, {
    fields: [pokedexEntry.pokemonSpeciesId],
    references: [pokemonSpecies.id],
  }),
}));

export const pokedexVersionGroupRelations = relations(pokedexVersionGroup, ({ one }) => ({
  pokedex: one(pokedex, {
    fields: [pokedexVersionGroup.pokedexId],
    references: [pokedex.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [pokedexVersionGroup.versionGroupId],
    references: [versionGroup.id],
  }),
}));

/* ----------------- POKEMON SPECIES & TRANSLATIONS ---------------- */
export const pokemonSpeciesRelations = relations(pokemonSpecies, ({ one, many }) => ({
  // generationId -> generation.id
  generation: one(generation, {
    fields: [pokemonSpecies.generationId],
    references: [generation.id],
  }),
  // evolvesFromPokemonSpeciesId -> references another PokemonSpecies
  evolvesFrom: one(pokemonSpecies, {
    fields: [pokemonSpecies.evolvesFromPokemonSpeciesId],
    references: [pokemonSpecies.id],
    relationName: "evolvesFrom_self", // self reference
  }),
  // Translations
  names: many(pokemonSpeciesName),
  genera: many(pokemonSpeciesGenus),
  flavorTexts: many(pokemonSpeciesFlavorText),
  // Egg groups
  eggGroups: many(pokemonSpeciesEggGroup),
}));

export const pokemonSpeciesNameRelations = relations(pokemonSpeciesName, ({ one }) => ({
  pokemonSpecies: one(pokemonSpecies, {
    fields: [pokemonSpeciesName.resourceId],
    references: [pokemonSpecies.id],
  }),
}));

export const pokemonSpeciesGenusRelations = relations(pokemonSpeciesGenus, ({ one }) => ({
  pokemonSpecies: one(pokemonSpecies, {
    fields: [pokemonSpeciesGenus.resourceId],
    references: [pokemonSpecies.id],
  }),
}));

export const pokemonSpeciesFlavorTextRelations = relations(pokemonSpeciesFlavorText, ({ one }) => ({
  pokemonSpecies: one(pokemonSpecies, {
    fields: [pokemonSpeciesFlavorText.resourceId],
    references: [pokemonSpecies.id],
  }),
  version: one(version, {
    fields: [pokemonSpeciesFlavorText.versionId],
    references: [version.id],
  }),
  language: one(language, {
    fields: [pokemonSpeciesFlavorText.languageId],
    references: [language.id],
  }),
}));

export const pokemonSpeciesEggGroupRelations = relations(pokemonSpeciesEggGroup, ({ one }) => ({
  pokemonSpecies: one(pokemonSpecies, {
    fields: [pokemonSpeciesEggGroup.pokemonSpeciesId],
    references: [pokemonSpecies.id],
  }),
  eggGroup: one(eggGroup, {
    fields: [pokemonSpeciesEggGroup.eggGroupId],
    references: [eggGroup.id],
  }),
}));

/* ----------------- EGG GROUP & TRANSLATIONS ---------------------- */
export const eggGroupRelations = relations(eggGroup, ({ many }) => ({
  eggGroupNames: many(eggGroupName),
  // Reverse side: many PokemonSpeciesEggGroups
  speciesEggGroups: many(pokemonSpeciesEggGroup),
}));

export const eggGroupNameRelations = relations(eggGroupName, ({ one }) => ({
  eggGroup: one(eggGroup, {
    fields: [eggGroupName.resourceId],
    references: [eggGroup.id],
  }),
}));

/* ----------------- POKEMON --------------------------------------- */
export const pokemonRelations = relations(pokemon, ({ one, many }) => ({
  // speciesId -> pokemonSpecies.id
  species: one(pokemonSpecies, {
    fields: [pokemon.speciesId],
    references: [pokemonSpecies.id],
  }),
  // primaryTypeId, secondaryTypeId -> type.id
  primaryType: one(type, {
    fields: [pokemon.primaryTypeId],
    references: [type.id],
    relationName: "pokemon_primary_type",
  }),
  secondaryType: one(type, {
    fields: [pokemon.secondaryTypeId],
    references: [type.id],
    relationName: "pokemon_secondary_type",
  }),
  // Past types
  pastTypes: many(pokemonPastType),
  // Forms
  forms: many(pokemonForm),
  // Appearances per version
  versionAppearances: many(pokemonVersionAppearance),
  // Held items
  heldItems: many(pokemonHeldItem),
  // Moves
  pokemonMoves: many(pokemonMove),
  // Abilities (through pivot)
  pokemonAbilities: many(pokemonAbility),
}));

export const pokemonPastTypeRelations = relations(pokemonPastType, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonPastType.pokemonId],
    references: [pokemon.id],
  }),
  generation: one(generation, {
    fields: [pokemonPastType.generationId],
    references: [generation.id],
  }),
  primaryType: one(type, {
    fields: [pokemonPastType.primaryTypeId],
    references: [type.id],
    relationName: "pokemon_pasttype_primary_type",
  }),
  secondaryType: one(type, {
    fields: [pokemonPastType.secondaryTypeId],
    references: [type.id],
    relationName: "pokemon_pasttype_secondary_type",
  }),
}));

export const pokemonFormRelations = relations(pokemonForm, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonForm.pokemonId],
    references: [pokemon.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [pokemonForm.versionGroupId],
    references: [versionGroup.id],
  }),
  primaryType: one(type, {
    fields: [pokemonForm.primaryTypeId],
    references: [type.id],
    relationName: "pokemon_form_primary_type",
  }),
  secondaryType: one(type, {
    fields: [pokemonForm.secondaryTypeId],
    references: [type.id],
    relationName: "pokemon_form_secondary_type",
  }),
}));

export const pokemonFormNameRelations = relations(pokemonFormName, ({ one }) => ({
  pokemonForm: one(pokemonForm, {
    fields: [pokemonFormName.resourceId],
    references: [pokemonForm.id],
  }),
}));

export const pokemonVersionAppearanceRelations = relations(pokemonVersionAppearance, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonVersionAppearance.pokemonId],
    references: [pokemon.id],
  }),
  version: one(version, {
    fields: [pokemonVersionAppearance.versionId],
    references: [version.id],
  }),
}));

export const pokemonHeldItemRelations = relations(pokemonHeldItem, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonHeldItem.pokemonId],
    references: [pokemon.id],
  }),
  item: one(item, {
    fields: [pokemonHeldItem.itemId],
    references: [item.id],
  }),
  version: one(version, {
    fields: [pokemonHeldItem.versionId],
    references: [version.id],
  }),
}));

/* ----------------- TYPE & TRANSLATIONS --------------------------- */
export const typeRelations = relations(type, ({ one, many }) => ({
  generation: one(generation, {
    fields: [type.generationId],
    references: [generation.id],
  }),
  names: many(typeName),
  // fromTypeId -> typeDamageRelation or toTypeId -> typeDamageRelation
  damageRelationsFrom: many(typeDamageRelation, {
    relationName: "damage_relation_from",
  }),
  damageRelationsTo: many(typeDamageRelation, {
    relationName: "damage_relation_to",
  }),
  // Reverse usage: many(pokemon), many(pokemonPastType), many(pokemonForm)
}));

export const typeNameRelations = relations(typeName, ({ one }) => ({
  type: one(type, {
    fields: [typeName.resourceId],
    references: [type.id],
  }),
}));

export const typeDamageRelationRelations = relations(typeDamageRelation, ({ one }) => ({
  fromType: one(type, {
    fields: [typeDamageRelation.fromTypeId],
    references: [type.id],
    relationName: "damage_relation_from",
  }),
  toType: one(type, {
    fields: [typeDamageRelation.toTypeId],
    references: [type.id],
    relationName: "damage_relation_to",
  }),
  generation: one(generation, {
    fields: [typeDamageRelation.generationId],
    references: [generation.id],
  }),
}));

/* ----------------- MOVE & TRANSLATIONS --------------------------- */
export const moveRelations = relations(move, ({ one, many }) => ({
  // move.typeId -> type.id
  type: one(type, {
    fields: [move.typeId],
    references: [type.id],
  }),
  // move.generationId -> generation.id
  generation: one(generation, {
    fields: [move.generationId],
    references: [generation.id],
  }),
  // Move has many translations
  moveNames: many(moveName),
  moveEffects: many(moveEffect),
  moveFlavorTexts: many(moveFlavorText),
  movePastValues: many(movePastValues),
  // Machines
  moveMachines: many(moveMachine),
  // Learned by many pokemonMove
  learnedByPokemon: many(pokemonMove),
}));

export const moveNameRelations = relations(moveName, ({ one }) => ({
  move: one(move, {
    fields: [moveName.resourceId],
    references: [move.id],
  }),
}));

export const moveEffectRelations = relations(moveEffect, ({ one }) => ({
  move: one(move, {
    fields: [moveEffect.resourceId],
    references: [move.id],
  }),
  language: one(language, {
    fields: [moveEffect.languageId],
    references: [language.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [moveEffect.versionGroupId],
    references: [versionGroup.id],
  }),
}));

export const moveFlavorTextRelations = relations(moveFlavorText, ({ one }) => ({
  move: one(move, {
    fields: [moveFlavorText.resourceId],
    references: [move.id],
  }),
  language: one(language, {
    fields: [moveFlavorText.languageId],
    references: [language.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [moveFlavorText.versionGroupId],
    references: [versionGroup.id],
  }),
}));

export const movePastValuesRelations = relations(movePastValues, ({ one }) => ({
  move: one(move, {
    fields: [movePastValues.moveId],
    references: [move.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [movePastValues.versionGroupId],
    references: [versionGroup.id],
  }),
  type: one(type, {
    fields: [movePastValues.typeId],
    references: [type.id],
  }),
}));

export const moveMachineRelations = relations(moveMachine, ({ one }) => ({
  move: one(move, {
    fields: [moveMachine.moveId],
    references: [move.id],
  }),
  item: one(item, {
    fields: [moveMachine.itemId],
    references: [item.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [moveMachine.versionGroupId],
    references: [versionGroup.id],
  }),
}));

/* ----------------- MOVE LEARN METHOD & PIVOT --------------------- */
export const moveLearnMethodRelations = relations(moveLearnMethod, ({ many }) => ({
  names: many(moveLearnMethodName),
  descriptions: many(moveLearnMethodDescription),
  // Also might be used by many pokemonMove
  learnedMoves: many(pokemonMove),
}));

export const moveLearnMethodNameRelations = relations(moveLearnMethodName, ({ one }) => ({
  moveLearnMethod: one(moveLearnMethod, {
    fields: [moveLearnMethodName.resourceId],
    references: [moveLearnMethod.id],
  }),
}));

export const moveLearnMethodDescriptionRelations = relations(
  moveLearnMethodDescription,
  ({ one }) => ({
    moveLearnMethod: one(moveLearnMethod, {
      fields: [moveLearnMethodDescription.resourceId],
      references: [moveLearnMethod.id],
    }),
  }),
);

export const pokemonMoveRelations = relations(pokemonMove, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonMove.pokemonId],
    references: [pokemon.id],
  }),
  move: one(move, {
    fields: [pokemonMove.moveId],
    references: [move.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [pokemonMove.versionGroupId],
    references: [versionGroup.id],
  }),
  learnMethod: one(moveLearnMethod, {
    fields: [pokemonMove.learnMethodId],
    references: [moveLearnMethod.id],
  }),
}));

/* ----------------- ABILITY & TRANSLATIONS ------------------------ */
export const abilityRelations = relations(ability, ({ one, many }) => ({
  generation: one(generation, {
    fields: [ability.generationId],
    references: [generation.id],
  }),
  names: many(abilityName),
  effects: many(abilityEffect),
  flavorTexts: many(abilityFlavorText),
  // Reverse usage: many(pokemonAbility)
}));

export const abilityNameRelations = relations(abilityName, ({ one }) => ({
  ability: one(ability, {
    fields: [abilityName.resourceId],
    references: [ability.id],
  }),
}));

export const abilityEffectRelations = relations(abilityEffect, ({ one }) => ({
  ability: one(ability, {
    fields: [abilityEffect.resourceId],
    references: [ability.id],
  }),
  language: one(language, {
    fields: [abilityEffect.languageId],
    references: [language.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [abilityEffect.versionGroupId],
    references: [versionGroup.id],
  }),
}));

export const abilityFlavorTextRelations = relations(abilityFlavorText, ({ one }) => ({
  ability: one(ability, {
    fields: [abilityFlavorText.resourceId],
    references: [ability.id],
  }),
  language: one(language, {
    fields: [abilityFlavorText.languageId],
    references: [language.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [abilityFlavorText.versionGroupId],
    references: [versionGroup.id],
  }),
}));

export const pokemonAbilityRelations = relations(pokemonAbility, ({ one }) => ({
  pokemon: one(pokemon, {
    fields: [pokemonAbility.pokemonId],
    references: [pokemon.id],
  }),
  ability: one(ability, {
    fields: [pokemonAbility.abilityId],
    references: [ability.id],
  }),
}));

/* ----------------- ITEM & TRANSLATIONS --------------------------- */
export const itemRelations = relations(item, ({ one, many }) => ({
  category: one(itemCategory, {
    fields: [item.categoryId],
    references: [itemCategory.id],
  }),
  names: many(itemName),
  effects: many(itemEffect),
  flingEffects: many(itemFlingEffect),
  flavorTexts: many(itemFlavorText),
  generations: many(itemGeneration),
  itemAttributes: many(itemItemAttribute),
  // Reverse usage: many(pokemonHeldItem), many(moveMachine)
}));

export const itemNameRelations = relations(itemName, ({ one }) => ({
  item: one(item, {
    fields: [itemName.resourceId],
    references: [item.id],
  }),
}));

export const itemEffectRelations = relations(itemEffect, ({ one }) => ({
  item: one(item, {
    fields: [itemEffect.resourceId],
    references: [item.id],
  }),
  language: one(language, {
    fields: [itemEffect.languageId],
    references: [language.id],
  }),
}));

export const itemFlingEffectRelations = relations(itemFlingEffect, ({ one }) => ({
  item: one(item, {
    fields: [itemFlingEffect.resourceId],
    references: [item.id],
  }),
  language: one(language, {
    fields: [itemFlingEffect.languageId],
    references: [language.id],
  }),
}));

export const itemFlavorTextRelations = relations(itemFlavorText, ({ one }) => ({
  item: one(item, {
    fields: [itemFlavorText.resourceId],
    references: [item.id],
  }),
  language: one(language, {
    fields: [itemFlavorText.languageId],
    references: [language.id],
  }),
  versionGroup: one(versionGroup, {
    fields: [itemFlavorText.versionGroupId],
    references: [versionGroup.id],
  }),
}));

export const itemGenerationRelations = relations(itemGeneration, ({ one }) => ({
  item: one(item, {
    fields: [itemGeneration.itemId],
    references: [item.id],
  }),
  generation: one(generation, {
    fields: [itemGeneration.generationId],
    references: [generation.id],
  }),
}));

export const itemItemAttributeRelations = relations(itemItemAttribute, ({ one }) => ({
  item: one(item, {
    fields: [itemItemAttribute.itemId],
    references: [item.id],
  }),
  attribute: one(itemAttribute, {
    fields: [itemItemAttribute.itemAttributeId],
    references: [itemAttribute.id],
  }),
}));

export const itemAttributeRelations = relations(itemAttribute, ({ many }) => ({
  names: many(itemAttributeName),
  descriptions: many(itemAttributeDescription),
  itemItemAttributes: many(itemItemAttribute),
}));

export const itemAttributeNameRelations = relations(itemAttributeName, ({ one }) => ({
  itemAttribute: one(itemAttribute, {
    fields: [itemAttributeName.resourceId],
    references: [itemAttribute.id],
  }),
}));

export const itemAttributeDescriptionRelations = relations(itemAttributeDescription, ({ one }) => ({
  itemAttribute: one(itemAttribute, {
    fields: [itemAttributeDescription.resourceId],
    references: [itemAttribute.id],
  }),
}));

/* ----------------- ITEM CATEGORY & POCKET ------------------------ */
export const itemCategoryRelations = relations(itemCategory, ({ one, many }) => ({
  itemPocket: one(itemPocket, {
    fields: [itemCategory.itemPocketId],
    references: [itemPocket.id],
  }),
  names: many(itemCategoryName),
  items: many(item),
}));

export const itemCategoryNameRelations = relations(itemCategoryName, ({ one }) => ({
  itemCategory: one(itemCategory, {
    fields: [itemCategoryName.resourceId],
    references: [itemCategory.id],
  }),
}));

export const itemPocketRelations = relations(itemPocket, ({ many }) => ({
  itemCategories: many(itemCategory),
  names: many(itemPocketName),
}));

export const itemPocketNameRelations = relations(itemPocketName, ({ one }) => ({
  itemPocket: one(itemPocket, {
    fields: [itemPocketName.resourceId],
    references: [itemPocket.id],
  }),
}));

/* ----------------- VERSION & VERSION GROUP ----------------------- */
export const versionRelations = relations(version, ({ one, many }) => ({
  versionGroup: one(versionGroup, {
    fields: [version.versionGroupId],
    references: [versionGroup.id],
  }),
  // Reverse usage: versionName, moveFlavorText, abilityFlavorText, pokemonVersionAppearance, ...
  names: many(versionName),
  // For example: many(pokemonHeldItem), many(pokemonSpeciesFlavorText)
}));

export const versionNameRelations = relations(versionName, ({ one }) => ({
  version: one(version, {
    fields: [versionName.resourceId],
    references: [version.id],
  }),
}));

export const versionGroupRelations = relations(versionGroup, ({ one, many }) => ({
  generation: one(generation, {
    fields: [versionGroup.generationId],
    references: [generation.id],
  }),
  // versionGroup has many versions
  versions: many(version),
  // versionGroup has many region associations
  versionGroupRegions: many(versionGroupRegion),
  // versionGroup has many pokedexVersionGroup
  pokedexVersionGroups: many(pokedexVersionGroup),
  // Move relationships
  moveMachines: many(moveMachine),
  moveEffects: many(moveEffect),
  moveFlavorTexts: many(moveFlavorText),
  movePastValues: many(movePastValues),
  // Item flavor texts
  itemFlavorTexts: many(itemFlavorText),
  // Ability flavor texts
  abilityFlavorTexts: many(abilityFlavorText),
  // Pokemon moves
  pokemonMoves: many(pokemonMove),
}));
