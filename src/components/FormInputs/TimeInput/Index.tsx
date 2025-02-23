import { ErrorMessage } from "@hookform/error-message";
import ar from "date-fns/locale/ar";
import { forwardRef, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { SvgIcon } from "../../SvgIcon/Index";

registerLocale("ar", ar);

import "./main.css";

type CustomInputType = {
  value?: string | undefined;
  onClick?: () => void;
  label?: string;
  subPlaceholder?: string;
  error?: boolean;
};

// custom input view
const ExampleCustomInput = forwardRef<HTMLDivElement, CustomInputType>(
  ({ value, onClick, label = "", subPlaceholder = "", error = false }, ref) => {
    return (
      <div
        className={`appDate-control  ${error ? "is-error" : ""} ${
          !!value ? "is-active" : ""
        }`}
        onClick={onClick}
        ref={ref}
      >
        {label ? (
          <label className="appDate-control-label">{label}</label>
        ) : null}

        <div className="appDate-control-input flex items-center justify-between">
          <p className="appDate-control-input-value text-sm mb-0">
            {value ? (
              value
            ) : (
              <span className="text-gray-200">{subPlaceholder}</span>
            )}
          </p>

          <SvgIcon
            name="calendar"
            className="appDate-control-input-icon fill-current w-5 h-5"
          />
        </div>
      </div>
    );
  }
);

type AppDateInterface = {
  onChange?: (e) => void;
  value?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  showTimeInput?: boolean;
  timeIntervals?: number;
};

// App Date component customization
export const AppDateComponent = forwardRef<HTMLDivElement, AppDateInterface>(
  ({
    label = "",
    onChange,
    value,
    error = false,
    disabled = false,
    className = "",
    placeholder = "",
    timeIntervals = 1,
  }) => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
      setStartDate(!!value ? new Date(value) : undefined);
    }, [value]);

    return (
      <div
        className={`appDate app-time-component ${error && "invalid"} ${
          value && "valid"
        } ${className ? className : ""}`}
      >
        <DatePicker
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeCaption="Time"
          dateFormat="h:mm aa"
          disabled={disabled}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            onChange?.(date);
          }}
          closeOnScroll={true}
          renderCustomHeader={() => <div></div>}
          customInput={
            <ExampleCustomInput
              label={label}
              subPlaceholder={placeholder}
              error={error}
            />
          }
          withPortal
        />
      </div>
    );
  }
);

type DateInputType = {
  name: string;
  errors?: any;
  rules?: any;
  control?: any;
  label?: string;
  timeIntervals?: number;
};

export const TimeInput = ({
  name,
  rules,
  errors,
  control,
  label = "",
  timeIntervals,
}: DateInputType) => {
  return (
    <div className=" w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const { onChange, ...restX } = field;

          return (
            <AppDateComponent
              {...restX}
              error={!!errors[name]}
              onChange={onChange}
              label={label}
              timeIntervals={timeIntervals}
            />
          );
        }}
      />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <>
              {message && (
                <p className="text-red-400 text-xs mt-2">{message}</p>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};
