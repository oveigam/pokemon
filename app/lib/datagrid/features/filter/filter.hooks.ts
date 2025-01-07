import type { Column, RowData } from "@tanstack/react-table";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFilterState = <TFilterValue, TValue = any, TData extends RowData = any>(
  column: Column<TData, TValue>,
  initialValue: TFilterValue,
) => {
  return useState((column.getFilterValue() as TFilterValue | undefined) ?? initialValue);
};
