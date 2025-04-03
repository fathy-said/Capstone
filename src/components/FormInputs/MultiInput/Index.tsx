import { ErrorMessage } from "@hookform/error-message";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useUpdateEffect } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { SvgIcon } from "../../SvgIcon/Index";

import "./main.css";

interface ChipProps {
  type?: string;
  id?: string;
  name: string;
  status?: string;
  update?: boolean;
}
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
}

export const MultiInput = forwardRef<HTMLDivElement, Props>(
  (
    {
      placeholder = "",
      name,
      errors,
      rules,
      control,
      className = "",
      inputClass = "",
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [chips, setChips] = useState<ChipProps[]>([]);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          useUpdateEffect(() => {
            field?.onChange(chips);
          }, [chips]);
          const handleInputChange = (e) => {
            setInputValue(e.target.value);
          };
          const handleInputKeyPress = (e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission
              addChip();
            }
          };
          const addChip = () => {
            if (inputValue.trim() !== "") {
              const newChip: ChipProps = {
                name: inputValue.trim(),
                id: uuidv4(),
              };
              setChips([...chips, newChip]);
              setInputValue("");
            }
          };
          const removeChip = (chipToRemove: ChipProps) => {
            console.log(chips);
            setChips(chips.filter((chip) => chip.id !== chipToRemove.id));
          };
          const UpdateDataRef = useRef(true);
          useEffect(() => {
            if (field?.value?.length) {
              if (UpdateDataRef?.current && field?.value[0]?.update) {
                setChips(field?.value);
                UpdateDataRef.current = false;
              }
            }
          }, [field?.value]);
          return (
            <div
              ref={ref}
              className={`textInput relative ${className}  ${
                errors && errors[name] ? "invalid" : ""
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  {chips.map((chip, index) => (
                    <div
                      key={index}
                      id={chip.id}
                      className="flex gap-4 border border-gray-50 bg-gray-100 px-5 py-2 rounded-full items-center"
                    >
                      <span className="text-base text-gray-500">
                        {chip.name}
                      </span>
                      <SvgIcon
                        name="x-close"
                        className="fill-current w-3 h-3 cursor-pointer"
                        onClick={() => removeChip(chip)}
                      />
                    </div>
                  ))}
                </div>
                <div className="textInput flex items-center">
                  <input
                    onKeyDown={handleInputKeyPress}
                    type="text"
                    // ref={ref as Ref<HTMLInputElement>}
                    className={`w-full ${inputClass}`}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    value={inputValue}
                    onInput={handleInputChange}
                  />
                  <div
                    className="flex items-center justify-center w-13 h-13 border bg-blue-450/5 border-blue-400 rounded-e-lg cursor-pointer"
                    onClick={addChip}
                  >
                    <SvgIcon
                      name="add"
                      className="fill-current w-5 h-5 text-blue-450 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
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
        }}
      />
    );
  }
);
