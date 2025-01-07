import { Separator } from "@ui/components/separator";
import { SidebarTrigger } from "@ui/components/sidebar";
import { cn } from "@ui/util/class-name";
import { type ReactNode } from "react";
import type { ClassNameValue } from "tailwind-merge";
import { Breadcrumb } from "../navigation/breadcrumb";

export function PageLayout({
  className,
  children,
}: {
  className?: ClassNameValue;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col gap-2 p-2">
      <div className="flex items-center gap-2 leading-none">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb />
      </div>
      <div className={cn("flex flex-1 flex-col", className)}>{children}</div>
    </main>
  );
}
