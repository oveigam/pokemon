import { SidebarTrigger } from "@ui/components/sidebar";
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
    <main className="flex flex-1 flex-col gap-2 p-2">
      {/* TODO breadcrumbs */}
      <div className="flex">
        <SidebarTrigger />
      </div>
      <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
    </main>
  );
}
