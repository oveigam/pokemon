import type { FilterFn } from "@tanstack/react-table";

export type BooleanFilterValue = Set<boolean | null>;

export const isValidBooleanFilterValue = (value: unknown): value is BooleanFilterValue => {
  return value instanceof Set;
};

const parseValueForFilter = (val: unknown) => {
  // empty values
  if (val === undefined || val === null) {
    return null;
  }
  // boolean values
  if (typeof val === "boolean") {
    return val;
  }
  // invalid values
  return Boolean(val);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const booleanFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: BooleanFilterValue,
) => {
  const value = parseValueForFilter(row.getValue(columnId));
  return filterValue.has(value);
};

booleanFilterFn.autoRemove = (value) => {
  return !isValidBooleanFilterValue(value);
};
