import {ErrorMessage} from "@hookform/error-message";
import {Ref, forwardRef, useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import {SvgIcon} from "../../SvgIcon/Index";

import "./main.css";
interface Props {
  name: string;
  control?: any;
  errors?: any;
  rules?: any;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClass?: string;
  showEye?: boolean;
  readOnly?: boolean;
  onChange?: (e) => void;
  sanitize?: boolean;
}

export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(
  (
    {
      type = "text",
      placeholder = "",
      name,
      label,
      errors,
      rules,
      control,
      showEye = false,
      readOnly = false,
      className = "",
      inputClass = "",
      sanitize = false,
      onChange,
    },
    ref
  ) => {
    const [currentType, setCurrentType] = useState(type);
    const [isActive, setIsActive] = useState(false);

    // On change password
    const onChangePasswordTypeAction = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setCurrentType((state) => {
        return state == "text" ? "password" : "text";
      });
    };

    /**
     * Adds commas as thousands separators to a given number.
     * @param {number} number - The number to format.
     * @returns {string} The formatted number with commas.
     */
    const numberWithCommas = (number) => {
      return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    /**
     * Sanitizes a number by adding commas as thousands separators based on a condition.
     * @param {number} value - The number to sanitize.
     * @returns {string|number} The sanitized number with commas if the sanitize condition is true, otherwise returns the original number.
     */
    const onSanitizeNumber = (value) => {
      if (sanitize) {
        return numberWithCommas(value);
      }
      return value;
    };

    /**
     * Removes commas from a string based on a condition.
     * @param {string} value - The string to process.
     * @returns {string} The string with commas removed if the sanitize condition is true, otherwise returns the original string.
     */
    const onReplaceComma = (value) => {
      if (sanitize) {
        return value?.replace(/,/gi, "");
      }
      return value;
    };

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field}) => {
          // Watch value
          useEffect(() => {
            if (!field?.value) {
              setIsActive(false);
              return;
            }
            setIsActive(true);
          }, [field?.value]);

          // On focus action
          const onFocusAction = () => {
            setIsActive(true);
          };

          // On blur action
          const onBlurAction = () => {
            if (field?.value) return;
            setIsActive(false);
          };

          // On change CTA
          const onChangeAction = (e) => {
            field?.onChange(onReplaceComma(e?.target?.value));
            onChange?.(onReplaceComma(e?.target?.value));
          };

          return (
            <div
              className={`textInput relative pt-4 ${className}  ${
                errors && errors[name] ? "invalid" : ""
              } ${isActive ? "is-active" : ""}`}
            >
              {label ? (
                <label htmlFor={name} className="textInput-label">
                  {label}
                </label>
              ) : null}

              <div
                className={`textInput-content relative w-full ${
                  currentType == "password" ? "password" : ""
                }`}
              >
                {type != "textarea" ? (
                  <input
                    type={currentType}
                    ref={ref as Ref<HTMLInputElement>}
                    className={`w-full ${inputClass}`}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    value={onSanitizeNumber(field?.value ?? "")}
                    onInput={onChangeAction}
                    readOnly={readOnly}
                    disabled={readOnly}
                    onFocus={onFocusAction}
                    onBlur={onBlurAction}
                  />
                ) : (
                  <textarea
                    ref={ref as Ref<HTMLTextAreaElement>}
                    className={`w-full ${inputClass}`}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    value={onSanitizeNumber(field?.value ?? "")}
                    onInput={onChangeAction}
                    readOnly={readOnly}
                    disabled={readOnly}
                    onFocus={onFocusAction}
                    onBlur={onBlurAction}
                  ></textarea>
                )}

                {type === "password" || showEye ? (
                  <button
                    type="button"
                    className="text-gray-300 absolute top-1/2 -translate-y-1/2 end-3 p-2"
                    onClick={onChangePasswordTypeAction}
                  >
                    <SvgIcon
                      name={currentType === "password" ? "eye" : "eye"}
                      className="fill-current w-5 h-5"
                    />
                  </button>
                ) : null}
              </div>

              {errors && (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({message}) => (
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
        }}
      />
    );
  }
);
