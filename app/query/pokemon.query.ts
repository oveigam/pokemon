import { queryOptions } from "@tanstack/react-query";
import { getPokemons } from "@/.server/functions/pokemon.fn";

export const getPokemonsQuery = () => {
  return queryOptions({
    queryKey: ["getPokemonQuery"],
    queryFn: () => getPokemons(),
  });
};
