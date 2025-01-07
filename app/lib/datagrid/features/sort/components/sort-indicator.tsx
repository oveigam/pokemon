import type { Header, SortDirection } from "@tanstack/react-table";
import { ChevronUp } from "lucide-react";

import { cn } from "@ui/util/class-name";

export function HeaderSortIndicator<TData>({ header }: { header: Header<TData, unknown> }) {
  const sorted = header.column.getIsSorted();
  const sortPosition = header.column.getSortIndex() + 1;

  const isMultiSorted = header.getContext().table.getState().sorting.length > 1;

  return (
    <SortIndicator sorted={sorted} sortPosition={sortPosition} isMultiSorted={isMultiSorted} />
  );
}

export function SortIndicator({
  sorted,
  sortPosition,
  isMultiSorted,
}: {
  sorted: false | SortDirection;
  sortPosition: number;
  isMultiSorted: boolean;
}) {
  return (
    <div className="flex items-center">
      <ChevronUp
        className={cn("ml-1 size-4 scale-0 text-primary/75 transition-all", {
          "scale-100": !!sorted,
          "rotate-0 scale-100": sorted === "asc",
          "rotate-180": sorted === "desc",
        })}
      />
      <span
        className={cn("-ml-0.5 mb-2 scale-0 text-[0.5rem] text-primary/75 transition-all", {
          "scale-100": isMultiSorted && sortPosition > 0,
        })}
      >
        {sortPosition}
      </span>
    </div>
  );
}
