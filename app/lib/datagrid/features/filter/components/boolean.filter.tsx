import type { HeaderContext } from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";

import type { BooleanValue } from "@datagrid/helpers/boolean.helper";

import { Button } from "@ui/components/core/button";
import { ToggleGroupItem, ToggleGroup } from "@ui/components/core/toggle-group";

import { useFilterState } from "../filter.hooks";
import { type BooleanFilterValue, isValidBooleanFilterValue } from "../functions/boolean.filterFn";

const getValuesFromFilter = (filter: BooleanFilterValue) => {
  const values = [] as string[];

  if (filter.has(true)) {
    values.push("true");
  }
  if (filter.has(false)) {
    values.push("false");
  }
  if (filter.has(null)) {
    values.push("null");
  }

  return values;
};

const getFilterFromValues = (values: string[]) => {
  const filter: BooleanFilterValue = new Set();

  for (const v of values) {
    if (v === "true") {
      filter.add(true);
    }
    if (v === "false") {
      filter.add(false);
    }
    if (v === "null") {
      filter.add(null);
    }
  }

  return filter;
};

export function BooleanFilter<TData>({
  ctx,
}: {
  ctx: HeaderContext<TData, BooleanValue> & { onClose?: () => void };
}) {
  const [filter, setFilter] = useFilterState<BooleanFilterValue>(ctx.header.column, new Set());

  const filterIsValid = isValidBooleanFilterValue(filter);

  return (
    <div className="mt-3 flex flex-col gap-4">
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={getValuesFromFilter(filter)}
        onValueChange={(values) => {
          setFilter(getFilterFromValues(values));
        }}
      >
        <ToggleGroupItem color="success" value="true">
          <CheckIcon />
        </ToggleGroupItem>
        <ToggleGroupItem color="error" value="false">
          <XIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="null">{ctx.table._t("empty-fields")}</ToggleGroupItem>
      </ToggleGroup>

      <div className="flex justify-end gap-1">
        {ctx.column.getIsFiltered() && (
          <Button
            variant="ghost"
            onClick={() => {
              ctx.header.column.setFilterValue(undefined);
              ctx.onClose?.();
            }}
          >
            {ctx.table._t("clear")}
          </Button>
        )}
        <Button
          disabled={!filterIsValid}
          onClick={() => {
            ctx.header.column.setFilterValue(filter);
            ctx.onClose?.();
          }}
        >
          {ctx.table._t("apply")}
        </Button>
      </div>
    </div>
  );
}
