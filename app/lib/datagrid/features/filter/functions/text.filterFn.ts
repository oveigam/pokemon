import type { FilterFn } from "@tanstack/react-table";

import { logger } from "@datagrid/devtools/logger";

import { textSearch } from "../filter.util";

export type TextFilterValue = {
  query: string;
  empty: boolean;
};

const isTextFilterValue = (val: unknown): val is TextFilterValue => {
  return (
    typeof val === "object" &&
    val !== null &&
    "query" in val &&
    typeof val.query === "string" &&
    "empty" in val &&
    typeof val.empty === "boolean"
  );
};

export const isValidTextFilterValue = (value: unknown): value is TextFilterValue => {
  return isTextFilterValue(value) && (value.empty || !!value.query);
};

const parseValueForFilter = (val: unknown) => {
  // empty values
  if (val === undefined || val === null || val === "") {
    return null;
  }
  // string values
  if (typeof val === "string") {
    return val;
  }
  // invalid values
  return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const textFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: TextFilterValue,
) => {
  const value = parseValueForFilter(row.getValue(columnId));
  if (value === undefined) {
    logger.warn(`[FILTER] Invalid data in text column
          Column: ${columnId}
          Value:  ${row.getValue(columnId)}
          Type:   ${typeof row.getValue(columnId)}
      `);

    return false; // Si el valor no es válido se filtra siempre
  }

  const { query, empty } = filterValue;
  if (value === null) {
    // Si el valor es nulo nos lo quedamos si se marco que se quieren vacios
    return empty;
  }
  if (empty && !query) {
    // Si se marca campos vacios y no se busca nada solo nos queramos con los campos vacios
    return !value;
  }

  return textSearch(query, value);
};

textFilterFn.autoRemove = (value) => {
  return !isValidTextFilterValue(value);
};
