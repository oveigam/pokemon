import type { RowData } from "@tanstack/react-table";

import { actionCol } from "./action.helper";
import { booleanCol } from "./boolean.helper";
import { dateCol } from "./date.helper";
import { numberCol } from "./number.helper";
import { stringCol } from "./string.helper";
import { textCol } from "./text.helper";

export class DatagridColumnHelper<TData extends RowData> {
  // data column accessors
  string = stringCol<TData>;
  text = textCol<TData>;
  number = numberCol<TData>;
  boolean = booleanCol<TData>;
  date = dateCol<TData>;

  // utils
  action = actionCol<TData>;
}
