import { createServerFn } from "@tanstack/start";

import { db } from "../../server/db/database";

export const getPokemons = createServerFn({ method: "GET" }).handler(async () => {
  // TODO remove throttle
  console.log("GET POKEMON!");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const pokemon = await db.query.pokemonSpecies.findMany({});
  return pokemon;
});
