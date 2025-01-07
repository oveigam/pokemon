import type { FilterFn } from "@tanstack/react-table";

import { logger } from "@datagrid/devtools/logger";

export type StringFilterValue = Set<string | null>;

export const isValidStringValue = (value: unknown): value is StringFilterValue => {
  return value instanceof Set && value.size > 0;
};

/**
 * Parsea el valor de una celda para filtrarla como short-text
 *
 * @param val valor de la celda
 * @returns string si es texto, null si está vacío y undefined si no es válido
 */
export const stringParseValueForFilter = (val: unknown) => {
  if (val === null || val === undefined || val === "") {
    // Valores que se consideran vacíos, lo parseamos como null
    return null;
  } else if (typeof val === "string") {
    // Cualquier valor string se considera válido
    return val;
  } else {
    // Si no es string o campo vacío retornamos undefined para indicar que no es válido
    return undefined;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringFilterFn: FilterFn<any> = (
  row,
  columnId: string,
  filterValue: Set<string | null>,
) => {
  const value = stringParseValueForFilter(row.getValue(columnId));
  if (value === undefined) {
    logger.warn(`[FILTER] Invalid data in short-text column
        Column: ${columnId}
        Value:  ${row.getValue(columnId)}
        Type:   ${typeof row.getValue(columnId)}
    `);

    return false; // Si el valor no es válido se filtra siempre
  }
  return filterValue.has(value);
};

// Resetea el filtro automaticamente cuando se le pasa un estado no válido
// Normalmente se pasa undefined para resetearlo (pero cualquier valor no válido valdria)
stringFilterFn.autoRemove = (value) => {
  return !isValidStringValue(value);
};
