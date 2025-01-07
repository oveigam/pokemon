import type { HeaderContext } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import type { DateValue } from "@datagrid/helpers/date.helper";

import { Button } from "@ui/components/core/button";
import { Calendar } from "@ui/components/core/calendar";
import { SwitchInput } from "@ui/components/input/switch.input";

import { useFilterState } from "../filter.hooks";
import { type DateFilterValue, isValidDateFilterValue } from "../functions/date.filterFn";

const getCalendarValueFromFilter = (
  query: Date | null | [Date | null, Date | null],
): Date | DateRange | null => {
  if (query === null) {
    return null;
  }
  if (query instanceof Date) {
    return query;
  }

  return {
    from: query[0] ?? new Date(),
    to: query[1] ?? undefined,
  };
};

function isRangeValue(value: Date | DateRange | null): value is DateRange {
  return !(value instanceof Date) && value !== null;
}

export function DateFilter<TData>({
  ctx,
}: {
  ctx: HeaderContext<TData, DateValue> & { onClose?: () => void };
}) {
  const [filter, setFilter] = useFilterState<DateFilterValue>(ctx.header.column, {
    query: [null, null],
    empty: false,
  });

  const filterIsValid = isValidDateFilterValue(filter);

  const calendarValue = getCalendarValueFromFilter(filter.query);
  const isRange = isRangeValue(calendarValue);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {isRange ? (
          <Calendar
            mode="range"
            selected={calendarValue}
            onSelect={(val) => {
              setFilter((prev) => {
                const newFilter = { ...prev };
                if (!val) {
                  newFilter.query = [null, null];
                } else {
                  newFilter.query = [val.from ?? null, val.to ?? null];
                }
                return newFilter;
              });
            }}
          />
        ) : (
          <Calendar
            mode="single"
            selected={calendarValue ?? undefined}
            onSelect={(val) => setFilter((prev) => ({ ...prev, query: val ?? null }))}
          />
        )}

        <div className="flex justify-between">
          <SwitchInput
            label={ctx.table._t("range")}
            size="small"
            checked={isRange}
            onCheckedChange={() => {
              setFilter((prev) => {
                const newFilter = { ...prev };
                if (Array.isArray(prev.query)) {
                  newFilter.query = prev.query[0];
                } else {
                  newFilter.query = [prev.query, null];
                }
                return newFilter;
              });
            }}
          />
          <SwitchInput
            label={ctx.table._t("empty-fields")}
            size="small"
            checked={filter.empty}
            onCheckedChange={(checked) => {
              setFilter((prev) => ({ ...prev, empty: checked }));
            }}
          />
        </div>
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
