import type { HeaderContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import type { TextValue } from "@datagrid/helpers/text.helper";

import { Button } from "@ui/components/core/button";
import { Checkbox } from "@ui/components/core/checkbox";
import { Label } from "@ui/components/core/label";
import { ScrollArea } from "@ui/components/core/scroll-area";
import { SwitchInput } from "@ui/components/input/switch.input";
import { TextInput } from "@ui/components/input/text.input";

import { useFilterState } from "../filter.hooks";
import { textSearch } from "../filter.util";
import { isValidStringValue, type StringFilterValue } from "../functions/string.filterFn";

const getSelectionSize = (sel: Set<string | null>) => {
  if (sel.has(null)) {
    return sel.size - 1;
  } else {
    return sel.size;
  }
};

export function StringFilter<TData>({
  ctx,
}: {
  ctx: HeaderContext<TData, TextValue> & { onClose?: () => void };
}) {
  const [filter, setFilter] = useFilterState<StringFilterValue>(ctx.header.column, new Set());
  const [search, setSearch] = useState("");

  const facetedUniqueValues: Map<string, number> = ctx.header.column.getFacetedUniqueValues();

  const nonEmptyValues = useMemo(() => {
    const nonEmpty = [] as string[];
    for (const key of facetedUniqueValues.keys()) {
      if (key) {
        nonEmpty.push(key);
      }
    }
    return nonEmpty.sort();
  }, [facetedUniqueValues]);

  const searchedItems = useMemo(() => {
    if (!search) {
      return nonEmptyValues;
    }
    const items: typeof nonEmptyValues = [];
    for (const val of nonEmptyValues) {
      if (textSearch(search, val)) {
        items.push(val);
      }
    }
    return items;
  }, [nonEmptyValues, search]);

  const allSelected = getSelectionSize(filter) === nonEmptyValues.length;
  const filterIsValid = isValidStringValue(filter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <TextInput
          autoFocus
          label={ctx.table._t("search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex justify-between">
          <p className="text-xs font-light">{`${ctx.table._t("selected")}: ${getSelectionSize(filter)}`}</p>

          <SwitchInput
            label={ctx.table._t("empty-fields")}
            size="small"
            checked={filter.has(null)}
            onCheckedChange={(checked) => {
              setFilter((prev) => {
                const f = new Set(prev);
                if (checked) {
                  f.add(null);
                } else {
                  f.delete(null);
                }
                return f;
              });
            }}
          />
        </div>

        <div>
          <li className="flex cursor-pointer items-center space-x-2 px-0.5 hover:bg-primary/10">
            <Checkbox
              id="_select_all"
              checked={allSelected}
              onCheckedChange={(check) => {
                setFilter((prev) => {
                  const newFilter: StringFilterValue = check ? new Set(nonEmptyValues) : new Set();
                  if (prev.has(null)) {
                    newFilter.add(null);
                  }
                  return newFilter;
                });
              }}
            />
            <Label
              htmlFor="_select_all"
              className="w-full cursor-pointer py-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {ctx.table._t(allSelected ? "deselect-all" : "select-all")}
            </Label>
          </li>
          <ScrollArea className="h-56 w-full">
            <ul className="flex flex-col">
              {/* TODO virtualize maybe? */}
              {searchedItems.map((item) => {
                return (
                  <li
                    key={item}
                    className="flex cursor-pointer items-center space-x-2 px-0.5 hover:bg-primary/10"
                  >
                    <Checkbox
                      id={item}
                      checked={filter.has(item)}
                      onCheckedChange={(checked) => {
                        setFilter((prev) => {
                          const f = new Set(prev);
                          if (checked) {
                            f.add(item);
                          } else {
                            f.delete(item);
                          }
                          return f;
                        });
                      }}
                    />
                    <Label
                      htmlFor={item}
                      className="w-full cursor-pointer py-2 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
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
