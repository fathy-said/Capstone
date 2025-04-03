import { forwardRef, useId } from "react";
import "./main.css";
import { Controller } from "react-hook-form";

type Props = {
  className?: string;
  defaultValue?: boolean;
  name: string;
  control?: any;
  errors?: any;
  rules?: any;
  label?: string;
};

export const SwitchButton = forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue = false,
      name,
      label,
      errors,
      control,
      rules,
      className = "",
    },
    ref
  ) => {
    const id = useId();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          // Current value
          const currentValue = field?.value ?? defaultValue;

          return (
            <div className={`switch flex gap-2 ${className}`}>
              <input
                ref={ref}
                type="checkbox"
                id={id}
                name={name}
                checked={currentValue}
                onChange={(e) => {
                  const isChecked = e?.target?.checked;
                  field?.onChange?.(isChecked);
                  console.log(isChecked);
                }}
              />
              <label
                htmlFor={id}
                className={`switch-label flex gap-x-2 items-center select-none w-max relative ${className} ${
                  !!errors[name] ? "hasError" : ""
                }`}
              ></label>
              {label && (
                <span className="text-blue-500 text-sm font-medium">
                  {label}
                </span>
              )}
            </div>
          );
        }}
      />
    );
  }
);
