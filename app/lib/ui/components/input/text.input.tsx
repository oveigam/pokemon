import * as React from "react";

import { cn } from "@ui/util/class-name";

import { Input, type InputProps } from "../core/input";
import { Label } from "../core/label";

const TextInput = React.forwardRef<HTMLInputElement, InputProps & { label: string }>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col-reverse gap-1">
        <Input
          ref={ref}
          type="text"
          id={props.name ?? label}
          className={cn("peer", className)}
          {...props}
        />
        <Label
          htmlFor={props.name ?? label}
          className="px-0.5 leading-none peer-focus:text-primary"
        >
          {label}
        </Label>
      </div>
    );
  },
);
TextInput.displayName = "TextInput";

export { TextInput };
