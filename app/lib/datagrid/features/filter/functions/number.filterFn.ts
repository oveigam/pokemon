import type { FilterFn } from "@tanstack/react-table";

import { logger } from "@datagrid/devtools/logger";

export type NumberFilterValue = {
  query: number | null | [number | null, number | null];
  empty: boolean;
};

const isNumberFilterValue = (val: unknown): val is NumberFilterValue => {
  if (typeof val !== "object" || val === null) {
    return false;
  }
  if (!("empty" in val) || typeof val.empty !== "boolean") {
    return false;
  }
  if (!("query" in val)) {
    return false;
  }

  const query = val.query;
  if (typeof query === "number") {
    return true;
  }
  if (!Array.isArray(query) || query.length !== 2) {
    return false;
  }
  return (
    (query[0] === null || typeof query[0] === "number") &&
    (query[1] === null || typeof query[1] === "number")
  );
};

export const isValidNumberFilterValue = (value: unknown): value is NumberFilterValue => {
  if (!isNumberFilterValue(value)) {
    return false;
  }
  return (
    value.empty ||
    (Array.isArray(value.query)
      ? value.query[0] !== null || value.query[1] !== null
      : value.query !== null)
  );
};

const parseValueForFilter = (val: unknown) => {
  // empty values
  if (val === undefined || val === null) {
    return null;
  }
  // number values
  if (typeof val === "number") {
    return val;
  }
  // invalid values
  return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numberFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: NumberFilterValue,
) => {
  const value = parseValueForFilter(row.getValue(columnId));
  if (value === undefined) {
    logger.warn(`[FILTER] Invalid data in number column
          Column: ${columnId}
          Value:  ${row.getValue(columnId)}
          Type:   ${typeof row.getValue(columnId)}
      `);

    return false; // Si el valor no es válido se filtra siempre
  }
  const { query, empty } = filterValue;

  // Si el valor es null solo lo quereoms si se marco empty
  if (value === null) {
    return empty;
  }

  if (Array.isArray(query)) {
    const [min, max] = query;

    // Si se filtra por min/max cojemos los que esten entre las dos numero
    if (min !== null && max !== null) {
      return value >= min && value <= max;
    }

    // Si solo se filtra por min se filtra por numeros mayores o iguales
    if (min !== null) {
      return value >= min;
    }

    // Si solo se filtra por max se filtra por numeros menores o iguales
    if (max !== null) {
      return value <= max;
    }

    // Si hay filtro sin valores queremos los elementos que no tienen valor
    if (min === null && max === null) {
      // (se contempla, pero este caso se elimina en el autoRemove)
      return !value;
    }

    // Todas las opciones están comprobadas, no debería llegar aquí
    return true;
  } else {
    return value === query;
  }
};

numberFilterFn.autoRemove = (value) => {
  return !isValidNumberFilterValue(value);
};
