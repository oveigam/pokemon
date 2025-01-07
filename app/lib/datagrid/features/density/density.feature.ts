/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RowData, TableFeature, OnChangeFn, Updater } from "@tanstack/react-table";
import { type Table, functionalUpdate, makeStateUpdater } from "@tanstack/table-core";

export type DensityState = "sm" | "md" | "lg";
export interface DensityTableState {
  density: DensityState;
}

export interface DensityOptions {
  enableDensity?: boolean;
  onDensityChange?: OnChangeFn<DensityState>;
}

export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void;
  getDensity: () => DensityState;
}

declare module "@tanstack/react-table" {
  interface TableState extends DensityTableState {}

  interface TableOptionsResolved<TData extends RowData> extends DensityOptions {}

  interface Table<TData extends RowData> extends DensityInstance {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DensityFeature: TableFeature<any> = {
  getInitialState: (state): DensityTableState => {
    return {
      density: "md",
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(table: Table<TData>): DensityOptions => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater("density", table),
    } as DensityOptions;
  },

  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setDensity = (updater) => {
      const safeUpdater: Updater<DensityState> = (old) => {
        return functionalUpdate(updater, old);
      };
      return table.options.onDensityChange?.(safeUpdater);
    };

    table.getDensity = () => {
      return table.getState().density;
    };
  },
};
