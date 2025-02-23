import { ErrorMessage } from "@hookform/error-message";
import ar from "date-fns/locale/ar";
import { forwardRef, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { SvgIcon } from "../../SvgIcon/Index";

import {
  addYears,
  eachYearOfInterval,
  format,
  getMonth,
  getYear,
} from "date-fns";

registerLocale("ar", ar);

import "./main.css";

type CustomInputType = {
  value?: string | undefined;
  onClick?: () => void;
  label?: string;
  subPlaceholder?: string;
  error?: boolean;
  hasRange?: boolean;
};

// custom input view
const ExampleCustomInput = forwardRef<HTMLDivElement, CustomInputType>(
  (
    {
      value,
      onClick,
      label = "",
      subPlaceholder = "",
      error = false,
      // hasRange = false,
    },
    ref
  ) => {
    return (
      <div
        className={`appDate-control ${error ? "is-error" : ""} ${
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
  value?: string | Date | Date[] | undefined;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  showTimeInput?: boolean;
  hasRange?: boolean;
};

// App Date component customization
export const AppDateComponent = forwardRef<HTMLDivElement, AppDateInterface>(
  (
    {
      label = "",
      onChange,
      value,
      error = false,
      disabled = false,
      showTimeInput = false,
      className = "",
      placeholder = "",
      hasRange = false,
    },
    ref
  ) => {
    const [startDate, setStartDate] = useState<Date | string | undefined>(
      undefined
    );
    // For range date
    const [dateRange, setDateRange] = useState<(Date | null | undefined)[]>([
      null,
      null,
    ]);
    const [startRangeDate, endRangeDate] = dateRange;

    useEffect(() => {
      if (hasRange) {
        if ((value as Date[])?.length) {
          setDateRange(value as Date[]);
        }
      }
      if (!hasRange) {
        setStartDate(!!value ? new Date(value as string) : undefined);
      }
    }, [value]);

    // Change header
    const CustomHeader = ({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }) => {
      // Get the current date
      const currentDate = new Date();

      // Add one year to the current date
      const endDateWithOneYearAdded = addYears(currentDate, 20);

      // Use eachYearOfInterval with the updated end date
      const formattedYears = eachYearOfInterval({
        start: new Date(1990, 0, 1),
        end: endDateWithOneYearAdded,
      });

      const years = formattedYears.map((year) => format(year, "yyyy"));

      const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];

      return (
        <div
          ref={ref}
          className="text-gray-400 font-medium flex items-center justify-center gap-x-2"
        >
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white"
          >
            <SvgIcon name="chevron-right" className="fill-current w-5 h-5" />
          </button>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
            className="py-2 px-3 rounded-xl"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="py-2 px-3 rounded-xl"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white"
          >
            <SvgIcon name="chevron-left" className="fill-current w-5 h-5" />
          </button>
        </div>
      );
    };

    return (
      <div
        className={`appDate ${error && "invalid"} ${value && "valid"} ${
          className ? className : ""
        }`}
      >
        <DatePicker
          // locale="ar"
          disabled={disabled}
          {...(hasRange
            ? { startDate: startRangeDate, endDate: endRangeDate }
            : {})}
          selected={hasRange ? startRangeDate : startDate}
          onChange={(date) => {
            if (hasRange) {
              onChange?.(date);
              setDateRange(date);
            }

            if (!hasRange) {
              setStartDate(date);
              onChange?.(date);
            }
          }}
          selectsRange={hasRange}
          dateFormat={showTimeInput ? "h:mm aa yyyy/MM/dd" : "yyyy/MM/dd"}
          timeInputLabel="اختر الوقت"
          showTimeInput={showTimeInput}
          renderCustomHeader={CustomHeader}
          closeOnScroll={true}
          customInput={
            <ExampleCustomInput
              label={label}
              subPlaceholder={placeholder}
              error={error}
              hasRange={hasRange}
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
  showTimeInput?: boolean;
  hasRange?: boolean;
};

export const DateInput = ({
  name,
  rules,
  errors,
  control,
  label = "",
  showTimeInput = false,
  hasRange = false,
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
              showTimeInput={showTimeInput}
              label={label}
              hasRange={hasRange}
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
