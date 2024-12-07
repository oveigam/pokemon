// https://pokenode-ts.vercel.app

import { type Type } from "pokenode-ts";
import { db, schema } from "../app/.server/db/database";
import { pokemon as pokemonSchema } from "../app/.server/db/schema.db";
import { data } from "../data/data";

const typesByName = new Map<string, Type>();

for (const t of data.types) {
  // await db
  //   .insert(schema.type)
  //   .values({
  //     id: t.id,
  //     name: t.name,
  //   })
  //   .onConflictDoNothing();
  typesByName.set(t.name, t);
}

for (const pokemon of data.pokemon) {
  const primaryType = pokemon.types.find((t) => t.slot === 1)!;
  const secondaryType = pokemon.types.find((t) => t.slot === 2);

  for (const asd of pokemon.moves) {
  }

  // await db
  //   .insert(pokemonSchema)
  //   .values({
  //     id: pokemon.id,
  //     name: pokemon.name,
  //     baseExperience: pokemon.base_experience,
  //     height: pokemon.height * 10,
  //     weight: pokemon.weight * 0.1,
  //     order: pokemon.order,
  //     primaryTypeId: typesByName.get(primaryType.type.name)!.id,
  //     secondaryTypeId: secondaryType ? typesByName.get(secondaryType.type.name)!.id : null,
  //   })
  //   .onConflictDoNothing();

  console.log(pokemon.name);
}

process.exit(0);
