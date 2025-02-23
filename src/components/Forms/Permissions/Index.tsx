import { useEffect, useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { usePermissions } from "../../../hooks/permissions";
import { ConnectForm } from "../../ConnectForm/Index";
import { CheckBoxInput } from "../../FormInputs/CheckBoxInput/Index";
import { PageShimmer } from "../../Ui/Shimmer/Page";

type Props = {
  className?: string;
};

export const PermissionForm = ({ className = "" }: Props) => {
  const {
    value: permissions,
    loading,
    checkedOrUnCheckedAll,
    mappedCurrentPermissions,
  } = usePermissions();
  return (
    <ConnectForm>
      {({ formState: { errors }, setValue, watch, control }) => {
        const { fields } = useFieldArray({
          control,
          name: "permissions",
        });
        const renderNo = useRef(0);

        // Current permissions
        const currentPermissions = watch("currentPermissions");

        // Is Extra value
        const isExtra = watch("isExtra");

        // Get all permission status (0 / 1)
        const allPermissions = watch("allPermissions");

        // Get selected permissions
        const selectedPermissions = watch("permissions");

        useEffect(() => {
          if (!permissions?.length) return;
          setValue("permissions", permissions);
          setValue("allPermissions", allPermissions || 0);
        }, [permissions, loading, allPermissions]);

        // On change to all permissions
        const onChangeToAllPermissions = () => {
          setValue("allPermissions", 1);
        };

        // On check input change in all permission status
        const onCheckInputChange = (value) => {
          if (allPermissions === 1 && !value) {
            setValue("allPermissions", 0);
          }
        };

        // control checked or un checked
        useEffect(() => {
          if (!permissions?.length && !currentPermissions?.length) return;

          // When all permission is 0
          if (allPermissions === 0) {
            let result;

            // First render on update
            if (currentPermissions?.length && renderNo.current === 0) {
              result = mappedCurrentPermissions(
                selectedPermissions,
                currentPermissions
              );

              renderNo.current++;
            } else {
              if (!!isExtra) {
                result = mappedCurrentPermissions(
                  selectedPermissions,
                  currentPermissions
                );
              } else {
                result = selectedPermissions;
              }
            }

            setValue("permissions", result);
          }

          // When all permission is 1
          if (allPermissions === 1) {
            const result = checkedOrUnCheckedAll(permissions);
            setValue("permissions", result);
          }
        }, [allPermissions, permissions, currentPermissions, loading]);

        return (
          <div className={`py-6 ${className}`}>
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-gray-50">
              <h3>الصلاحيات</h3>
              <button
                type="button"
                className="text-blue-450 py-3 px-4 text-sm"
                onClick={onChangeToAllPermissions}
              >
                تحديد الكل
              </button>
            </div>
            {loading ? <PageShimmer className="mt-6" /> : null}
            {fields?.map((item: Record<string, any>, index) => {
              return (
                <div
                  className="flex flex-col md:flex-row gap-4 border-b border-gray-50 py-8 my-2"
                  key={item?.id}
                >
                  <p className="md:w-1/5 shrink-0">{item?.title}</p>
                  <div className="md:w-4/5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {item?.values?.map((permission, idx) => {
                      return (
                        <CheckBoxInput
                          key={permission?.id}
                          name={`permissions.${index}.values.${idx}.checked`}
                          defaultValue={permission?.checked}
                          control={control}
                          errors={errors}
                          label={permission?.name_ar}
                          onChange={onCheckInputChange}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }}
    </ConnectForm>
  );
};
