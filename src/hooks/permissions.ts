import { useAsync } from "react-use";
import { $api } from "../client";

export const usePermissions = () => {
  const { value, loading } = useAsync(async () => {
    const {
      data: { records },
    } = await $api.get("/permissions");
    return mapPermissions(records);
  }, []);

  return {
    value,
    loading,
    checkedOrUnCheckedAll,
    mappedCurrentPermissions,
  };
};

// Permission enums
export enum PermissionEnum {
  "الأدوار" = "ROLES",
  "المستخدمين" = "USERS",
  "المشاريع" = "PROJECTS",
  "المحافظ" = "PORTFOLIOS",
  "الإعدادات" = "SETTINGS",
  "الإحصائيات" = "STATISTICS",
}

// Map permissions
const mapPermissions = (permissions) => {
  let currentPermissions: Record<string, any>[] = [];

  for (let key in permissions) {
    const currentKey = PermissionEnum[key];
    currentPermissions.push({
      id: currentKey,
      title: key,
      values: permissions[key]?.map((y) => {
        return {
          ...y,
          checked: false,
        };
      }),
    });
  }

  return currentPermissions;
};

// Check or un check role
const checkedOrUnCheckedAll = (permissions, checked = true) => {
  const mappedPermissions = permissions?.map((item) => {
    return {
      ...item,
      values: item?.values?.map((itemX) => {
        return {
          ...itemX,
          checked,
        };
      }),
    };
  });

  return mappedPermissions;
};

// Mapped current permissions to all
const mappedCurrentPermissions = (permissions, current) => {
  const mappedPermissions = permissions?.map((item) => {
    return {
      ...item,
      values: item?.values?.map((itemX) => {
        return {
          ...itemX,
          checked: !!current?.find((y) => y?.name === itemX?.name),
        };
      }),
    };
  });

  return mappedPermissions;
};
