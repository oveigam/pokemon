import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { getPokemonsQuery } from "@/services/pokemon/pokemon.query";

export const Route = createFileRoute("/pokemon")({
  component: RouteComponent,
  async loader(ctx) {
    ctx.context.queryClient.ensureQueryData(getPokemonsQuery());
  },
});

function RouteComponent() {
  const { data = [] } = useSuspenseQuery(getPokemonsQuery());

  return (
    <div>
      <ul>
        {data.map((pokemon) => {
          return (
            <div key={pokemon.id} className="list-decimal">
              <h2>{pokemon.name}</h2>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
