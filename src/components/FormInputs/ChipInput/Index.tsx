import { ErrorMessage } from "@hookform/error-message";
import { forwardRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useEffectOnce, useUpdateEffect } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { useDeleteController } from "../../../hooks/settings/delete";
import { SvgIcon } from "../../SvgIcon/Index";

import toast from "react-hot-toast";
import "./main.css";

interface ChipProps {
  type?: string;
  id?: string;
  name: string;
  status?: string;
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
  defaultValue?: ChipProps[];
}

export const ChipInput = forwardRef<HTMLDivElement, Props>(
  (
    {
      placeholder = "",
      name,
      errors,
      rules,
      control,
      className = "",
      inputClass = "",
      defaultValue = [],
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [values, setValues] = useState<ChipProps[]>(defaultValue);
    const [chips, setChips] = useState<ChipProps[]>([]);
    const [allValues, setAllValues] = useState<ChipProps[]>([]);
    const [showMoreData, setShowMoreData] = useState<{
      show: boolean;
      length: number;
      firstShow?: boolean;
    }>({
      show: false,
      length: 0,
      firstShow: true,
    });

    const {
      deleteStatus,
      deletePlatforms,
      deleteTypes,
      deleteDepartments,
      deleteMeasurement,
      deleteItems,
    } = useDeleteController();

    useEffect(() => {
      const data: ChipProps[] = [...chips, ...values];
      setAllValues(data);
      if (data?.length <= 10) {
        setShowMoreData((prev) => {
          return { ...prev, length: data.length, firstShow: true };
        });
      } else {
        setShowMoreData((prev) => {
          return { ...prev, length: data.length };
        });
      }
    }, [chips, values]);

    useEffect(() => {
      if (allValues?.length > 10 && showMoreData?.firstShow) {
        setShowMoreData((prev) => {
          return { ...prev, show: true, firstShow: false };
        });
        // console.log("show more data");
      } else if (allValues?.length > 10 && !showMoreData?.firstShow) {
        setShowMoreData((prev) => {
          return { ...prev };
        });
        // console.log("show more data");
      } else if (allValues?.length <= 10) {
        setShowMoreData((prev) => {
          return { ...prev, show: false };
        });
        // console.log(" don't show more data");
      } else;
    }, [allValues]);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          useEffectOnce(() => {
            setValues(defaultValue);
          });

          useUpdateEffect(() => {
            field?.onChange(chips);
          }, [chips]);

          const handleInputChange = (e) => {
            setInputValue(e.target.value);
          };

          const handleInputKeyPress = (e) => {
            if (e?.key === "Enter") {
              e.preventDefault(); // Prevent form submission

              addChip();
            }
          };

          const addChip = () => {
            if (inputValue.trim() !== "") {
              if (!allValues.some((e) => e?.name == inputValue.trim())) {
                const newChip: ChipProps = {
                  name: inputValue.trim(),
                  id: uuidv4(),
                };
                setChips([...chips, newChip]);
                setInputValue("");
              } else {
                toast.error("تم إدخال بيانات مكررة");
              }
            }
          };

          const removeChip = (chipToRemove: ChipProps) => {
            setChips(chips.filter((chip) => chip.id !== chipToRemove.id));
          };

          const removeValue = (valueToRemove: ChipProps) => {
            if (valueToRemove?.type == "status") {
              deleteStatus(valueToRemove.id);
            }
            if (valueToRemove?.type == "project_platform") {
              deletePlatforms(valueToRemove.id);
            }
            if (valueToRemove?.type == "type") {
              deleteTypes(valueToRemove.id);
            }
            if (valueToRemove?.type == "project_category") {
              deleteDepartments(valueToRemove.id);
            }
            if (valueToRemove?.type == "measurement_unit") {
              deleteMeasurement(valueToRemove.id);
            }
            if (valueToRemove?.type == "category_item") {
              deleteItems(valueToRemove.id);
            }
            setValues(values.filter((value) => value?.id !== valueToRemove.id));
          };

          return (
            <div
              ref={ref}
              className={`textInput relative ${className}  ${
                errors && errors[name] ? "invalid" : ""
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  {chips.map((chip, index) => {
                    if (showMoreData?.show) {
                      if (
                        values?.length < 10 &&
                        index + 1 + values?.length <= 10
                      ) {
                        return (
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
                        );
                      }
                    } else {
                      return (
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
                      );
                    }
                  })}{" "}
                  {values.map((value, index) => {
                    if (showMoreData?.show) {
                      if (index + 1 <= 10) {
                        return (
                          <div
                            key={index}
                            id={value.id}
                            className="flex gap-4 border border-gray-50 bg-gray-100 px-5 py-2 rounded-full items-center"
                          >
                            <span className="text-base text-gray-500">
                              {value.name}
                            </span>
                            <SvgIcon
                              name="x-close"
                              className="fill-current w-3 h-3 cursor-pointer"
                              onClick={() => removeValue(value)}
                            />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div
                          key={index}
                          id={value.id}
                          className="flex gap-4 border border-gray-50 bg-gray-100 px-5 py-2 rounded-full items-center"
                        >
                          <span className="text-base text-gray-500">
                            {value.name}
                          </span>
                          <SvgIcon
                            name="x-close"
                            className="fill-current w-3 h-3 cursor-pointer"
                            onClick={() => removeValue(value)}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                {showMoreData?.show && (
                  <div
                    className="text-green-500 cursor-pointer flex justify-end items-center"
                    onClick={() =>
                      setShowMoreData((prev) => {
                        return { ...prev, show: false };
                      })
                    }
                  >
                    عرض المزيد{" "}
                  </div>
                )}
                {!showMoreData?.show && showMoreData?.length > 10 && (
                  <div
                    className="text-red-500 cursor-pointer flex justify-end items-center"
                    onClick={() =>
                      setShowMoreData((prev) => {
                        return { ...prev, show: true };
                      })
                    }
                  >
                    عرض أقل{" "}
                  </div>
                )}
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
                    onChange={handleInputChange}
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
