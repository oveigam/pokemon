import type { HeaderContext } from "@tanstack/react-table";

import type { TextValue } from "@datagrid/helpers/text.helper";

import { Button } from "@ui/components/core/button";
import { SwitchInput } from "@ui/components/input/switch.input";
import { TextInput } from "@ui/components/input/text.input";

import { useFilterState } from "../filter.hooks";
import { isValidTextFilterValue, type TextFilterValue } from "../functions/text.filterFn";

export function TextFilter<TData>({
  ctx,
}: {
  ctx: HeaderContext<TData, TextValue> & { onClose?: () => void };
}) {
  const [filter, setFilter] = useFilterState<TextFilterValue>(ctx.header.column, {
    query: "",
    empty: false,
  });

  const filterIsValid = isValidTextFilterValue(filter);

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ctx.header.column.setFilterValue(filter);
          ctx.onClose?.();
        }}
      >
        <TextInput
          autoFocus
          label={ctx.table._t("search")}
          value={filter.query}
          onChange={(e) =>
            setFilter({
              ...filter,
              query: e.target.value,
            })
          }
        />

        <SwitchInput
          className="ml-auto"
          size="small"
          label={ctx.table._t("empty-fields")}
          checked={filter.empty}
          onCheckedChange={(checked) =>
            setFilter({
              ...filter,
              empty: checked,
            })
          }
        />
      </form>

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
