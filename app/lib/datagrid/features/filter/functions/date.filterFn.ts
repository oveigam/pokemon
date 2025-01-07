import type { FilterFn } from "@tanstack/react-table";
import { isAfter, isBefore, isEqual } from "date-fns";

import { logger } from "@datagrid/devtools/logger";
import { isBetweenDates, isValidDate } from "@datagrid/util/dates";

export type DateFilterValue = {
  query: Date | [Date | null, Date | null] | null;
  empty: boolean;
};

const isDateFilterValue = (val: unknown): val is DateFilterValue => {
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
  if (query instanceof Date) {
    return true;
  }
  if (!Array.isArray(query) || query.length !== 2) {
    return false;
  }
  return (
    (query[0] === null || query[0] instanceof Date) &&
    (query[1] === null || query[1] instanceof Date)
  );
};

export const isValidDateFilterValue = (value: unknown): value is DateFilterValue => {
  if (!isDateFilterValue(value)) {
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
  // date values
  if (isValidDate(val)) {
    return val;
  }
  // invalid values
  return undefined;
};

// TODO gestionar la hora

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: DateFilterValue,
) => {
  const value = parseValueForFilter(row.getValue(columnId));
  if (value === undefined) {
    logger.warn(`[FILTER] Invalid data in date column
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

  if (query === null) {
    // Si no hay filtro aceptamos todo
    return true;
  } else if (Array.isArray(query)) {
    const [min, max] = query;

    // Si se filtra por min/max cojemos los que esten entre las dos fechas
    if (min !== null && max !== null) {
      return isBetweenDates(value, [min, max]);
    }

    // Si solo se filtra por min se filtra por fechas que esten despues (o sean iguales)
    if (min !== null) {
      return isAfter(value, min) || isEqual(value, min);
    }

    // Si solo se filtra por max se filtra por fechas que esten antes (o sean iguales)
    if (max !== null) {
      return isBefore(value, max) || isEqual(value, max);
    }

    // Si hay filtro sin valores queremos los elementos que no tienen valor
    if (min === null && max === null) {
      // (se contempla, pero este caso se elimina en el autoRemove)
      return !value;
    }

    // Todas las opciones están comprobadas, no debería llegar aquí
    return true;
  } else {
    return isEqual(value, query);
  }
};

dateFilterFn.autoRemove = (filter) => {
  return !isValidDateFilterValue(filter);
};
