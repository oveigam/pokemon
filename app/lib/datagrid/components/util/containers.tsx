import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

import { cn } from "@ui/util/class-name";

export const FlexTableContainer = ({
  className,
  children,
}: {
  className: ClassValue;
  children: ReactNode;
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-auto">{children}</div>
    </div>
  );
};
