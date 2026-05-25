import * as React from "react";

import { FormFieldError } from "@/components/ui/form-field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormInputFieldProps = {
  id: string;
  label: string;
  error?: string;
} & Omit<React.ComponentProps<typeof Input>, "id">;

function FormInputField({
  id,
  label,
  error,
  className,
  "aria-invalid": ariaInvalid,
  ...inputProps
}: FormInputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-wider text-text/50"
      >
        {label}
      </Label>
      <Input
        id={id}
        className={cn(
          "h-auto min-h-0 rounded-xl border border-brown/50 bg-light px-4 py-3.5 text-base text-text shadow-none placeholder:text-text/35 focus-visible:border-brown/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-0 md:text-base dark:bg-light",
          className,
        )}
        aria-invalid={ariaInvalid ?? Boolean(error)}
        {...inputProps}
      />
      <FormFieldError error={error} />
    </div>
  );
}

export { FormInputField };
