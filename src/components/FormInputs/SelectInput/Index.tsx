import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";

import { ErrorMessage } from "@hookform/error-message";
import {
  LoadingMessage,
  ReactSelectCustomNoOptionsMessage,
} from "./Options/Index";
import {
  defaultAsyncErrorControl,
  reactSelectAsyncCustomStyles,
  reactSelectCustomStyles,
} from "./Options/Options";

import "./main.css";

export type SelectType = "SYNC" | "ASYNC";

export interface OptionInterface {
  label: string;
  value: any;
}

interface SelectInputInterface {
  control?: any;
  errors?: any;
  rules?: any;
  name: string;
  placeholder?: string;
  label?: string;
  type?: SelectType;
  options?: OptionInterface[];
  className?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;

  loadOptions?: (val) => Promise<OptionInterface[]>;
  onChangeSelect?: (e) => void;
}

export const SelectInput = ({
  type = "SYNC",
  name,
  className = "",
  placeholder = "",
  label = "",
  control,
  errors,
  rules = {},
  options = [],
  isDisabled = false,
  isMulti = false,
  isSearchable = false,
  loadOptions,
  onChangeSelect = () => {},
  ...rest
}: SelectInputInterface) => {
  const [activeLabel, setActiveLabel] = useState(false);

  // Custom Option component for displaying icons
  const CustomOption = ({ children, ...props }: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center gap-2">
          {props?.data?.icon && <>{props?.data?.icon}</>}
          <h4 className="text-sm font-normal text-blue-600">{children}</h4>
        </div>
      </components.Option>
    );
  };

  // Custom SingleValue component for displaying selected value with icon
  const CustomSingleValue = ({ children, ...props }: any) => {
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          {props?.data?.icon && <>{props?.data?.icon}</>}
          <h4 className="text-sm font-normal text-blue-600">{children}</h4>
        </div>
      </components.SingleValue>
    );
  };
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          // Is active boolean
          const isActive = isMulti ? field?.value?.length : !!field?.value;

          // On open active label
          const onOpenActiveLabel = () => {
            setActiveLabel(true);
          };

          // On close active label
          const onCloseActiveLabel = () => {
            if (field?.value || field?.value?.length) return;
            setActiveLabel(false);
          };

          // Watch value
          useEffect(() => {
            if (!field?.value || !field?.value?.length) {
              setActiveLabel(false);
              return;
            }
            setActiveLabel(true);
          }, [field?.value]);

          return (
            <div
              {...rest}
              className={`select-input ${className} ${
                isActive ? "is-active" : ""
              } ${errors[name] ? "error" : ""} ${
                activeLabel ? "active-label" : ""
              }`}
            >
              {label && (
                <label className="select-input-label font-medium">
                  {label}
                </label>
              )}
              {type == "SYNC" ? (
                <>
                  <Select
                    value={field?.value ?? null}
                    onChange={(e) => {
                      field?.onChange(e);
                      onChangeSelect(e);
                    }}
                    onMenuOpen={onOpenActiveLabel}
                    onMenuClose={onCloseActiveLabel}
                    placeholder={placeholder}
                    options={options}
                    isDisabled={isDisabled}
                    className={`${isDisabled && "disabled"}`}
                    components={{
                      NoOptionsMessage: ReactSelectCustomNoOptionsMessage,
                      Option: CustomOption,
                      SingleValue: CustomSingleValue,
                    }}
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                    styles={{
                      ...reactSelectCustomStyles,
                      ...(errors[name] && {
                        control: defaultAsyncErrorControl,
                      }),
                    }}
                  />
                </>
              ) : (
                <>
                  <AsyncSelect
                    onChange={(e) => {
                      field?.onChange(e);
                      onChangeSelect(e);
                    }}
                    value={field?.value ?? null}
                    // onInputChange={}
                    onMenuOpen={onOpenActiveLabel}
                    isDisabled={isDisabled}
                    className={`${isDisabled && "disabled"}`}
                    onMenuClose={onCloseActiveLabel}
                    loadOptions={loadOptions}
                    placeholder={placeholder}
                    components={{
                      NoOptionsMessage: ReactSelectCustomNoOptionsMessage,
                      LoadingMessage,
                      Option: CustomOption,
                      SingleValue: CustomSingleValue,
                    }}
                    cacheOptions
                    defaultOptions
                    isMulti={isMulti}
                    styles={{
                      ...reactSelectAsyncCustomStyles,
                      ...(errors[name] && {
                        control: defaultAsyncErrorControl,
                      }),
                    }}
                  />
                </>
              )}
            </div>
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
                <p className="text-red-500 text-xs mt-2">{message}</p>
              )}
            </>
          )}
        />
      )}
    </div>
  );
};
