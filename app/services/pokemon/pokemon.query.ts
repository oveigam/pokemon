import { queryOptions } from "@tanstack/react-query";
import { getPokemons } from "./pokemon.api";

export const getPokemonsQuery = () => {
  return queryOptions({
    queryKey: ["getPokemonQuery"],
    queryFn: () => getPokemons(),
  });
};
