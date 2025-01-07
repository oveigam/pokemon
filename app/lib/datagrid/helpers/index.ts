import type { RowData } from "@tanstack/react-table";

import { booleanCol } from "./boolean.helper";
import { numberCol } from "./number.helper";
import { stringCol } from "./string.helper";
import { textCol } from "./text.helper";

export class DatagridColumnHelper<TData extends RowData> {
  // data column accessors
  string = stringCol<TData>;
  text = textCol<TData>;
  number = numberCol<TData>;
  boolean = booleanCol<TData>;
  //   date = dateColumn<TData>;
}
