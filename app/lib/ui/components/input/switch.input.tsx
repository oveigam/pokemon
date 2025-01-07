import * as React from "react";

import { cn } from "@ui/util/class-name";

import { Label } from "../core/label";
import { Switch, type SwitchProps, type SwitchRef } from "../core/switch";

const SwitchInput = React.forwardRef<
  SwitchRef,
  SwitchProps & { label: string; size?: "default" | "small" }
>(({ label, className, size, ...props }, ref) => {
  return (
    <div className="flex items-center gap-1">
      <Switch
        ref={ref}
        id={label ?? props.name}
        className={cn("", className)}
        size={size}
        {...props}
      />
      <Label
        htmlFor={label ?? props.name}
        className="mb-0.5 px-0.5 hover:cursor-pointer"
        size={size}
      >
        {label}
      </Label>
    </div>
  );
});
SwitchInput.displayName = "SwitchInput";

export { SwitchInput };
