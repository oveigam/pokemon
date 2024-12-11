/**
 * @typedef {import("pokenode-ts").EggGroup} EggGroup
 * @typedef {import("pokenode-ts").Generation} Generation
 * @typedef {import("pokenode-ts").GrowthRate} GrowthRate
 * @typedef {import("pokenode-ts").Item} Item
 * @typedef {import("pokenode-ts").ItemAttribute} ItemAttribute
 * @typedef {import("pokenode-ts").ItemCategory} ItemCategory
 * @typedef {import("pokenode-ts").ItemFlingEffect} ItemFlingEffect
 * @typedef {import("pokenode-ts").ItemPocket} ItemPocket
 * @typedef {import("pokenode-ts").Language} Language
 * @typedef {import("pokenode-ts").Location} Location
 * @typedef {import("pokenode-ts").LocationArea} LocationArea
 * @typedef {import("pokenode-ts").Machine} Machine
 * @typedef {import("pokenode-ts").Move} Move
 * @typedef {import("pokenode-ts").MoveAilment} MoveAilment
 * @typedef {import("pokenode-ts").MoveCategory} MoveCategory
 * @typedef {import("pokenode-ts").MoveDamageClass} MoveDamageClass
 * @typedef {import("pokenode-ts").MoveTarget} MoveTarget
 * @typedef {import("pokenode-ts").PalParkArea} PalParkArea
 * @typedef {import("pokenode-ts").Pokedex} Pokedex
 * @typedef {import("pokenode-ts").Pokemon} Pokemon
 * @typedef {import("pokenode-ts").PokemonForm} PokemonForm
 * @typedef {import("pokenode-ts").PokemonShape} PokemonShape
 * @typedef {import("pokenode-ts").PokemonSpecies} PokemonSpecies
 * @typedef {import("pokenode-ts").Region} Region
 * @typedef {import("pokenode-ts").Type} Type
 * @typedef {import("pokenode-ts").Version} Version
 * @typedef {import("pokenode-ts").VersionGroup} VersionGroup
 * @typedef {import("pokenode-ts").Ability} Ability
 * @typedef {import("pokenode-ts").MoveLearnMethod} MoveLearnMethod
 */

const abilities = require("./ability.json");
const eggGroups = require("./egg-group.json");
const generation = require("./generation.json");
const growthRates = require("./growth-rate.json");
const itemsAttributes = require("./items-attributes.json");
const itemsCategories = require("./items-categories.json");
const itemsEffect = require("./items-effect.json");
const itemsPocket = require("./items-pocket.json");
const items = require("./items.json");
const languages = require("./language.json");
const locationAreas = require("./location-area.json");
const locations = require("./location.json");
const machine = require("./machine.json");
const moveAilment = require("./move-ailment.json");
const moveCategory = require("./move-category.json");
const moveDamageClass = require("./move-damage-class.json");
const moveTarget = require("./move-target.json");
const move = require("./move.json");
const palParks = require("./pal-park.json");
const pokedex = require("./pokedex.json");
const pokemonForm = require("./pokemon-form.json");
const shapes = require("./pokemon-shape.json");
const pokemonSpecies = require("./pokemon-species.json");
const pokemon = require("./pokemon.json");
const regions = require("./region.json");
const types = require("./type.json");
const versionGroup = require("./version-group.json");
const versions = require("./version.json");
const learn = require("./learn.json");

/**
 * @type {{
 *   languages: Language[],
 *   generation: Generation[],
 *   pokedex: Pokedex[],
 *   versionGroup: VersionGroup[],
 *   versions: Version[],
 *   regions: Region[],
 *   locations: Location[],
 *   locationAreas: LocationArea[],
 *   palParks: PalParkArea[],
 *   pokemon: Pokemon[],
 *   pokemonForm: PokemonForm[],
 *   pokemonSpecies: PokemonSpecies[],
 *   growthRates: GrowthRate[],
 *   eggGroups: EggGroup[],
 *   shapes: PokemonShape[],
 *   types: Type[],
 *   move: Move[],
 *   moveDamageClass: MoveDamageClass[],
 *   moveTarget: MoveTarget[],
 *   moveAilment: MoveAilment[],
 *   moveCategory: MoveCategory[],
 *   items: Item[],
 *   itemsAttributes: ItemAttribute[],
 *   itemsCategories: ItemCategory[],
 *   itemsEffect: ItemFlingEffect[],
 *   itemsPocket: ItemPocket[],
 *   machine: Machine[],
 *   abilities: Ability[],
 *   learn: MoveLearnMethod[],
 * }}
 */
const data = {
  languages,
  generation,
  pokedex,
  versionGroup,
  versions,

  regions,
  locations,
  locationAreas,
  palParks,

  pokemon,
  pokemonForm,
  pokemonSpecies,
  growthRates,
  eggGroups,
  shapes,
  types,

  move,
  moveDamageClass,
  moveTarget,
  moveAilment,
  moveCategory,

  items,
  itemsAttributes,
  itemsCategories,
  itemsEffect,
  itemsPocket,

  machine,

  abilities,
  learn,
};

module.exports = { data };
