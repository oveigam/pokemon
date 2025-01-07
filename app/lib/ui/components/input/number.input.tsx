import * as React from "react";

import { cn } from "@ui/util/class-name";

import { Input, type InputProps } from "../core/input";
import { Label } from "../core/label";

type NumberInputProps = Omit<InputProps, "value" | "onChange"> & {
  label: string;
  value?: number | null;
  onChange?: (value: number | null) => void;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, className, value, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col-reverse gap-1">
        <Input
          ref={ref}
          type="number"
          id={label ?? props.name}
          className={cn("peer", className)}
          value={value ?? ""}
          onChange={
            onChange
              ? (e) => {
                  const value = e.target.value;
                  if (!value) {
                    onChange(null);
                  } else {
                    onChange(Number(value));
                  }
                }
              : undefined
          }
          {...props}
        />
        <Label
          htmlFor={label ?? props.name}
          className="px-0.5 leading-none peer-focus:text-primary"
        >
          {label}
        </Label>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
