import { cn } from "@ui/util/class-name";
import type { ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";

export function PageLayout({
  className,
  children,
}: {
  className?: ClassNameValue;
  children: ReactNode;
}) {
  return (
    <main className={cn("container mx-auto flex flex-1 flex-col items-center p-2", className)}>
      {children}
    </main>
  );
}
