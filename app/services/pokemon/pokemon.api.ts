import { createServerFn } from "@tanstack/start";

import { db } from "../../server/db/database";

export const getPokemons = createServerFn({ method: "GET" }).handler(async () => {
  const pokemon = await db.query.pokemonSpecies.findMany({});
  return pokemon;
});
