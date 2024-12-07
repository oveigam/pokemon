import type {
  EggGroup,
  Generation,
  GrowthRate,
  Item,
  ItemAttribute,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
  Language,
  Location,
  LocationArea,
  Machine,
  Move,
  MoveAilment,
  MoveCategory,
  MoveDamageClass,
  MoveTarget,
  PalParkArea,
  Pokedex,
  Pokemon,
  PokemonForm,
  PokemonShape,
  PokemonSpecies,
  Region,
  Type,
  Version,
  VersionGroup,
} from "pokenode-ts";
import eggGroups from "./egg-group.json";
import generation from "./generation.json";
import growthRates from "./growth-rate.json";
import itemsAttributes from "./items-attributes.json";
import itemsCategories from "./items-categories.json";
import itemsEffect from "./items-effect.json";
import itemsPocket from "./items-pocket.json";
import items from "./items.json";
import languages from "./language.json";
import locationAreas from "./location-area.json";
import locations from "./location.json";
import machine from "./machine.json";
import moveAilment from "./move-ailment.json";
import moveCategory from "./move-category.json";
import moveDamageClass from "./move-damage-class.json";
import moveTarget from "./move-target.json";
import move from "./move.json";
import palParks from "./pal-park.json";
import pokedex from "./pokedex.json";
import pokemonForm from "./pokemon-form.json";
import shapes from "./pokemon-shape.json";
import pokemonSpecies from "./pokemon-species.json";
import pokemon from "./pokemon.json";
import regions from "./region.json";
import types from "./type.json";
import versionGroup from "./version-group.json";
import versions from "./version.json";

export const data = {
  // Meta
  languages: languages as Language[],

  // Game
  generation: generation as Generation[],
  pokedex: pokedex as Pokedex[],
  versionGroup: versionGroup as VersionGroup[],
  versions: versions as Version[],

  // Location
  regions: regions as Region[],
  locations: locations as Location[],
  locationAreas: locationAreas as LocationArea[],
  palParks: palParks as PalParkArea[],

  // pokemon
  pokemon: pokemon as Pokemon[],
  pokemonForm: pokemonForm as PokemonForm[],
  pokemonSpecies: pokemonSpecies as PokemonSpecies[],
  growthRates: growthRates as GrowthRate[],
  eggGroups: eggGroups as EggGroup[],
  shapes: shapes as PokemonShape[],
  types: types as Type[],

  move: move as Move[],
  moveDamageClass: moveDamageClass as MoveDamageClass[],
  moveTarget: moveTarget as MoveTarget[],
  moveAilment: moveAilment as MoveAilment[],
  moveCategory: moveCategory as MoveCategory[],

  // items
  items: items as Item[],
  itemsAttributes: itemsAttributes as ItemAttribute[],
  itemsCategories: itemsCategories as ItemCategory[],
  itemsEffect: itemsEffect as ItemFlingEffect[],
  itemsPocket: itemsPocket as ItemPocket[],

  // machines
  machine: machine as Machine[],
};
