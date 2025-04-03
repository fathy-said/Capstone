import {ReactNode, forwardRef, useId} from "react";
import {SvgIcon} from "../../SvgIcon/Index";
import {Controller} from "react-hook-form";

import "./main.css";

type Props = {
  defaultValue?: boolean;
  name: string;
  control?: any;
  errors?: any;
  rules?: any;
  label?: string;
  children?: ReactNode;
  className?: string;
  inputClass?: string;
  onChange?: (e) => void;
};

export const CheckBoxInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue = false,
      name,
      label,
      errors,
      control,
      rules,
      children,
      className = "",
      inputClass = "",
      onChange,
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
          // Current value
          const currentValue = field?.value ?? defaultValue;

          return (
            <div>
              <label
                htmlFor={id}
                className={`checkbox flex gap-x-2 items-center select-none w-max relative ${className} ${
                  !!errors[name] ? "hasError" : ""
                }`}
              >
                <input
                  ref={ref}
                  type="checkbox"
                  id={id}
                  name={name}
                  className="hidden"
                  checked={currentValue}
                  onChange={(e) => {
                    const isChecked = e?.target?.checked;
                    field?.onChange?.(isChecked);
                    onChange?.(isChecked);
                  }}
                />

                <div
                  className={`checkbox-input shrink-0 flex items-center justify-center ${inputClass}`}
                >
                  <SvgIcon
                    name="check"
                    className="checkbox-input-icon fill-current w-4 h-4"
                  />
                </div>

                {children ? (
                  children
                ) : (
                  <>{label ? <p className="text-gray-500">{label}</p> : null}</>
                )}
              </label>
            </div>
          );
        }}
      />
    );
  }
);
