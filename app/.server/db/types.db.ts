import { damageClass, growthRates, moveAilment, moveCategory, moveTarget, pokemonColors, pokemonHabitat, pokemonShapes } from "./enums.db";

export type DamageClass = (typeof damageClass)[number];
export type GrowthRate = (typeof growthRates)[number];
export type MoveAilment = (typeof moveAilment)[number];
export type MoveCategory = (typeof moveCategory)[number];
export type MoveTarget = (typeof moveTarget)[number];
export type PokemonColor = (typeof pokemonColors)[number];
export type PokemonHabitat = (typeof pokemonHabitat)[number];
export type PokemonShapes = (typeof pokemonShapes)[number];
