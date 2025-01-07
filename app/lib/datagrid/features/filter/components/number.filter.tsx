import type { HeaderContext } from "@tanstack/react-table";

import type { StringValue } from "@datagrid/helpers/string.helper";

import { Button } from "@ui/components/core/button";
import { Ranger, Slider } from "@ui/components/core/slider";
import { NumberInput } from "@ui/components/input/number.input";
import { SwitchInput } from "@ui/components/input/switch.input";

import { useFilterState } from "../filter.hooks";
import { isValidNumberFilterValue, type NumberFilterValue } from "../functions/number.filterFn";

export function NumberFilter<TData>({
  ctx,
}: {
  ctx: HeaderContext<TData, StringValue> & { onClose?: () => void };
}) {
  const [min, max] = ctx.header.column.getFacetedMinMaxValues() ?? [];

  const [filter, setFilter] = useFilterState<NumberFilterValue>(ctx.header.column, {
    query: [min ?? null, max ?? null],
    empty: false,
  });

  const { query, empty } = filter;
  const isRange = Array.isArray(query);
  const filterIsValid = isValidNumberFilterValue(filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <NumberInput
            className="w-24"
            label={ctx.table._t(isRange ? "from" : "search")}
            value={isRange ? query[0] : query}
            onChange={(value) => {
              setFilter({
                empty,
                query: isRange ? [value, query[1]] : value,
              });
            }}
          />
          {isRange && (
            <NumberInput
              className="w-24"
              label={ctx.table._t("to")}
              value={query[1]}
              onChange={(value) => {
                setFilter({ empty, query: [query[0], value] });
              }}
            />
          )}
        </div>

        <div className="mb-2 flex justify-between">
          <SwitchInput
            label={ctx.table._t("range")}
            size="small"
            checked={isRange}
            onCheckedChange={() => {
              if (isRange) {
                setFilter({ empty, query: query[0] });
              } else {
                setFilter({ empty, query: [query, max ?? query] });
              }
            }}
          />

          <SwitchInput
            label={ctx.table._t("empty-fields")}
            size="small"
            checked={empty}
            onCheckedChange={(checked) => {
              setFilter({ query, empty: checked });
            }}
          />
        </div>

        {isRange ? (
          <Ranger
            min={min}
            max={max}
            value={[query[0] ?? 0, query[1] ?? 0]}
            onValueChange={(value) => {
              setFilter((prev) => ({ ...prev, query: value }));
            }}
          />
        ) : (
          <Slider
            min={min}
            max={max}
            value={[query ?? 0]}
            onValueChange={(value) => {
              setFilter((prev) => ({ ...prev, query: value[0] }));
            }}
          />
        )}
      </div>

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
