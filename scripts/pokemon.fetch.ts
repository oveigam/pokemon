import { MainClient, type Machine, type NamedAPIResourceList } from "pokenode-ts";

import { data } from "../data/data";

const api = new MainClient();

const apiToJson = async <T>(
  name: string,
  list: (offset?: number, limit?: number) => Promise<NamedAPIResourceList>,
  getByName: (name: string) => Promise<T>,
) => {
  const { results } = await list(0, 20000);

  console.log(results);

  let i = 0;
  const data = [] as T[];
  for (const r of results) {
    data.push(await getByName(r.name));
    console.log(name, ++i, "/", results.length);
    if (i % 50 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  await Bun.write(`./data/${name}.json`, JSON.stringify(data, null, 2));
};

const machines = async () => {
  const { results } = await api.machine.listMachines(0, 20000);

  let i = 0;
  const machines = [] as Machine[];
  for (const r of results) {
    const chunks = r.url.split("/");
    const id = Number(chunks[chunks.length - 2]);
    console.log(id);
    machines.push(await api.machine.getMachineById(id));
    console.log("machine", ++i, "/", results.length);
    if (i % 50 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  await Bun.write(`./data/machine.json`, JSON.stringify(machines, null, 2));
};

// Meta
// await apiToJson("language", api.utility.listLanguages.bind(api), api.utility.getLanguageByName.bind(api));

// Games
// await apiToJson("generation", api.game.listGenerations.bind(api), api.game.getGenerationByName.bind(api));
// await apiToJson("pokedex", api.game.listPokedexes.bind(api), api.game.getPokedexByName.bind(api));
// await apiToJson("version-group", api.game.listVersionGroups.bind(api), api.game.getVersionGroupByName.bind(api));
// await apiToJson("version", api.game.listVersions.bind(api), api.game.getVersionByName.bind(api));

// Location
// await apiToJson("region", api.location.listRegions.bind(api), api.location.getRegionByName.bind(api));
// await apiToJson("location", api.location.listLocations.bind(api), api.location.getLocationByName.bind(api));
// await apiToJson("location-area", api.location.listLocationAreas.bind(api), api.location.getLocationAreaByName.bind(api));
// await apiToJson("pal-park", api.location.listPalParkAreas.bind(api), api.location.getPalParkAreaByName.bind(api));

// Pokemon
// await apiToJson("pokemon", api.pokemon.listPokemons.bind(api), api.pokemon.getPokemonByName.bind(api));
// await apiToJson("pokemon-species", api.pokemon.listPokemonSpecies.bind(api), api.pokemon.getPokemonSpeciesByName.bind(api));
// await apiToJson("pokemon-form", api.pokemon.listPokemonForms.bind(api), api.pokemon.getPokemonFormByName.bind(api));
// await apiToJson("growth-rate", api.pokemon.listGrowthRates.bind(api), api.pokemon.getGrowthRateByName.bind(api));
// await apiToJson("egg-group", api.pokemon.listEggGroups.bind(api), api.pokemon.getEggGroupByName.bind(api));
// await apiToJson("pokemon-shape", api.pokemon.listPokemonShapes.bind(api), api.pokemon.getPokemonShapeByName.bind(api));
// await apiToJson("type", api.pokemon.listTypes.bind(api), api.pokemon.getTypeByName.bind(api));
// await apiToJson("ability", api.pokemon.listAbilities.bind(api), api.pokemon.getAbilityByName.bind(api));

// moves
// await apiToJson("move", api.move.listMoves.bind(api), api.move.getMoveByName.bind(api));
// await apiToJson("move-damage-class", api.move.listMoveDamageClasses.bind(api), api.move.getMoveDamageClassByName.bind(api));
// await apiToJson("move-target", api.move.listMoveTargets.bind(api), api.move.getMoveTargetByName.bind(api));
// await apiToJson("move-category", api.move.listMoveCategories.bind(api), api.move.getMoveCategoryByName.bind(api));
// await apiToJson("move-ailment", api.move.listMoveAilments.bind(api), api.move.getMoveAilmentByName.bind(api));

// Items
// await apiToJson("items", api.item.listItems.bind(api), api.item.getItemByName.bind(api));
// await apiToJson("items-attributes", api.item.listItemAttributes.bind(api), api.item.getItemAttributeByName.bind(api));
// await apiToJson("items-categories", api.item.listItemCategories.bind(api), api.item.getItemCategoryByName.bind(api));
// await apiToJson("items-effect", api.item.listItemFilingEffects.bind(api), api.item.getItemFlingEffectByName.bind(api));
// await apiToJson("items-pocket", api.item.listItemPockets.bind(api), api.item.getItemPocketByName.bind(api));
// await machines();

// await apiToJson("learn", api.move.listMoveLearnMethods.bind(api), api.move.getMoveLearnMethodByName.bind(api));

console.log(data.learn.map((l) => l.name));

process.exit(0);
