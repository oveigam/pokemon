import type {
  AccessorFn,
  CellContext,
  ColumnDefTemplate,
  DeepKeys,
  FilterFn,
  HeaderContext,
  RowData,
} from "@tanstack/react-table";

export type Nullish<T> = T | null | undefined;

/**
 * Opciones para acceder a los datos a traves de sus property keys
 *
 * Para identificar la columna usa la key como id
 */
export type AccessorKeyIdentifier<TData extends RowData> = {
  key: DeepKeys<TData>;
};

/**
 * Opciones para acceder a los datos a traves de una función similar a (col: Col<TData>) => TValue
 *
 * Para identificar la columna es necesario indicarle un id manualmente
 */
export type AccessorFnIdentifier<TData extends RowData, TValue = unknown> = {
  accessor: AccessorFn<TData, TValue>;
  id: string;
};

export type AccessorIdentifier<TData extends RowData, TValue = unknown> =
  | AccessorKeyIdentifier<TData>
  | AccessorFnIdentifier<TData, TValue>;

export function isAccessorFnIdentifier<TData extends RowData, TValue = unknown>(
  opts: AccessorIdentifier<TData, TValue>,
): opts is AccessorFnIdentifier<TData, TValue> {
  return (
    Object.prototype.hasOwnProperty.call(opts, "id") &&
    typeof (opts as { id: unknown }).id === "string"
  );
}

/**
 * Opciones para definir como se renderizan el contenido de las
 * diferentes partes de la columna
 */
export type ColumnOverrides<TData extends RowData, TValue = unknown> = {
  /**
   * Define como se renderiza el contenido dentro del elemento th del header
   */
  header?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  /**
   * Define como se renderiza el contenido dentro del elemento td del body
   */
  cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  /**
   * Define como se renderiza el contenido dentro del elemento td del footer
   */
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;

  /**
   * Define como se filtran los datos y como se renderiza el menú del filtro.
   * Para su correcto funcionamiento es necesario que tanto la función como
   * el elemento de filtro trabajen con el mismo tipo de dato de filtrado.
   */
  filter?: {
    /**
     * Define como se renderiza el contenido dentro el popover del filtro
     */
    filter: ColumnDefTemplate<HeaderContext<TData, TValue> & { onClose?: () => void }>;
    /**
     * Define como se filtran los datos.
     *
     * https://tanstack.com/table/latest/docs/guide/column-filtering#customize-filter-function-behavior
     */
    filterFn: FilterFn<TData>;
  };
};

export type ColumnHelperOptions<TData extends RowData, TValue, TOptions> = AccessorIdentifier<
  TData,
  TValue
> & {
  /**
   * Opciones básicas para modificar el comportamiento de la columna.
   */
  options?: TOptions | ((value: TValue, item: TData) => TOptions);

  //   /**
  //    * Función para calcular los datos de agregación (totales, medias, etc.) que se quieran mostrar en el footer
  //    *
  //    * @param values Array con todos los valores de la columna
  //    * @param data Filas de la tabla, se puede acceder al item de la fila usando row.original
  //    * @param columnId Id de la columna, se puede usar para acceder al valor de la columna en una fila con row.getValue(columnId)
  //    * @returns
  //    */
  //   aggregates?: (
  //     values: TValue[],
  //     data: Row<TData>[],
  //     columnId: string,
  //   ) => { label: string; value: number }[];

  /**
   * Define como se renderiza el contenido dentro del elemento th del header
   */
  header?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  /**
   * Define como se renderiza el contenido dentro del elemento td del body
   */
  cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  /**
   * Define como se renderiza el contenido dentro del elemento td del footer
   */
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;

  /**
   * Define como se filtran los datos y como se renderiza el menú del filtro.
   * Para su correcto funcionamiento es necesario que tanto la función como
   * el elemento de filtro trabajen con el mismo tipo de dato de filtrado.
   */
  filter?: {
    /**
     * Define como se renderiza el contenido dentro el popover del filtro
     */
    filter: ColumnDefTemplate<HeaderContext<TData, TValue> & { onClose?: () => void }>;
    /**
     * Define como se filtran los datos.
     *
     * https://tanstack.com/table/latest/docs/guide/column-filtering#customize-filter-function-behavior
     */
    filterFn: FilterFn<TData>;
  };
};

export function getHelperIdentifier<TData extends RowData, TValue, TOptions>(
  opts: ColumnHelperOptions<TData, TValue, TOptions>,
) {
  return isAccessorFnIdentifier(opts)
    ? { accessorFn: opts.accessor, id: opts.id }
    : { accessorKey: opts.key };
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    options?: (value: TValue, item: TData) => unknown;
  }
}
