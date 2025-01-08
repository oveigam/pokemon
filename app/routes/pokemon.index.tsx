import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import { useTranslations } from "use-intl";

import { FlexTableContainer } from "@datagrid/components/util/containers";
import { translatedColumnIdHeader } from "@datagrid/features/i18n/util";
import { DatagridColumnHelper } from "@datagrid/helpers";
import { booleanCol } from "@datagrid/helpers/boolean.helper";
import { dateCol } from "@datagrid/helpers/date.helper";
import { numberCol } from "@datagrid/helpers/number.helper";
import { stringCol } from "@datagrid/helpers/string.helper";
import { textCol } from "@datagrid/helpers/text.helper";
import { Datagrid } from "@datagrid/index";

import { Button } from "@ui/components/core/button";
import { Card } from "@ui/components/core/card";

import type { getPokemons } from "@/services/pokemon/pokemon.api";
import { getPokemonsQuery } from "@/services/pokemon/pokemon.query";

export const Route = createFileRoute("/pokemon/")({
  component: RouteComponent,
  async loader(ctx) {
    ctx.context.queryClient.ensureQueryData(getPokemonsQuery());
  },
});

type Pokemon = Awaited<ReturnType<typeof getPokemons>>[number];

const ch = new DatagridColumnHelper<Pokemon>();

const columns = [
  ch.number({ key: "id" }),
  ch.string({ key: "name" }),
  ch.text({ key: "habitat" }),
  ch.boolean({ key: "isBaby" }),
  ch.boolean({ key: "isLegendary" }),
  ch.boolean({ key: "isMythical" }),
  ch.date({ key: "createdAt" }),
  ch.action({
    renderActions: (item) => (
      <div>
        <Button variant="ghost" asChild>
          <Link to="/pokemon/$id" params={{ id: String(item.id) }}>
            <EditIcon />
          </Link>
        </Button>
      </div>
    ),
  }),
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

  const t = useTranslations("pokemon");
  const tGrid = useTranslations("datagrid");

  return (
    <div className="flex flex-1 px-2 pb-2">
      <Card className="flex flex-1 overflow-hidden">
        <Datagrid
          translator={t}
          translatorGrid={tGrid}
          data={data}
          autoWidth={false}
          columns={columns}
          rowClassName={(pokemon) => {
            if (pokemon.habitat === "grassland") {
              return "bg-lime-200 hover:bg-lime-300";
            }
          }}
        />
      </Card>
    </div>
  );
}
