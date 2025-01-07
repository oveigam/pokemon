import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "use-intl";

import { FlexTableContainer } from "@datagrid/components/util/containers";
import { translatedColumnIdHeader } from "@datagrid/features/i18n/util";
import { booleanCol } from "@datagrid/helpers/boolean.helper";
import { dateCol } from "@datagrid/helpers/date.helper";
import { numberCol } from "@datagrid/helpers/number.helper";
import { stringCol } from "@datagrid/helpers/string.helper";
import { textCol } from "@datagrid/helpers/text.helper";
import { Datagrid } from "@datagrid/index";

import { Card } from "@ui/components/core/card";

import type { getPokemons } from "@/services/pokemon/pokemon.api";
import { getPokemonsQuery } from "@/services/pokemon/pokemon.query";

export const Route = createFileRoute("/pokemon")({
  component: RouteComponent,
  async loader(ctx) {
    ctx.context.queryClient.ensureQueryData(getPokemonsQuery());
  },
});

type Pokemon = Awaited<ReturnType<typeof getPokemons>>[number];

export const columns: ColumnDef<Pokemon>[] = [
  numberCol<Pokemon>({ key: "id" }),
  stringCol<Pokemon>({ key: "name" }),
  textCol<Pokemon>({ key: "habitat" }),
  booleanCol<Pokemon>({ key: "isBaby" }),
  booleanCol<Pokemon>({ key: "isLegendary" }),
  booleanCol<Pokemon>({ key: "isMythical" }),
  dateCol<Pokemon>({ key: "createdAt" }),
  // {
  //   accessorKey: "type",
  //   header: translatedColumnIdHeader,
  //   size: 100,
  // },
  // {
  //   accessorKey: "city",
  //   header: translatedColumnIdHeader,
  //   meta: {
  //     rowClassName(value) {
  //       if (value === "Vigo") {
  //         return "before:content-['PUTA_'] before:font-bold";
  //       }
  //       return "";
  //     },
  //   },
  // },
];

function RouteComponent() {
  const { data = [] } = useSuspenseQuery(getPokemonsQuery());

  const t = useTranslations();
  const tGrid = useTranslations("datagrid");

  return (
    <div className="flex flex-1 px-2 pb-2">
      <Card className="flex flex-1 overflow-hidden">
        <FlexTableContainer className="flex-1">
          <Datagrid
            translator={t}
            translatorGrid={tGrid}
            data={data}
            autoWidth={false}
            columns={columns}
            // rowClassName={(pokemon) => {
            //   if (pokemon.name === "Celta de Vigo") {
            //     return "bg-red-500 text-red-100 hover:bg-red-600";
            //   }
            // }}
          />
        </FlexTableContainer>
      </Card>
    </div>
  );
}
