import {ReactNode, forwardRef, useId} from "react";
import {Controller} from "react-hook-form";

import "./main.css";

type Props = {
  name: string;
  control?: any;
  errors?: any;
  rules?: any;
  defaultValue: string | number;
  label?: string;
  children?: ReactNode;
  className?: string;
  inputClass?: string;
};

export const RadioInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue = undefined,
      errors,
      rules,
      control,
      name,
      label,
      children,
      className = "",
      inputClass = "",
    },
    ref
  ) => {
    const id = useId();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field}) => {
          return (
            <label
              htmlFor={id}
              className={`radioInput flex gap-x-2 items-center select-none w-max relative ${className} ${
                !!errors[name] ? "hasError" : ""
              }`}
            >
              <input
                ref={ref}
                type="radio"
                id={id}
                className="hidden"
                defaultValue={defaultValue}
                checked={defaultValue === field?.value}
                onChange={() => {
                  field?.onChange(defaultValue);
                }}
              />

              <div className={`radioInput-input shrink-0 ${inputClass}`}></div>

              {children ? (
                children
              ) : label ? (
                <p className="radioInput-label text-gray-500">{label}</p>
              ) : null}
            </label>
          );
        }}
      />
    );
  }
);
