import HandlePermissions from "../../hooks/HandlePermissions";
import { SvgIcon } from "../SvgIcon/Index";

interface PageInterfaces {
  children: any;
  permissionName: any;
  text?: string;
  textClassName?: string;
  pageClassName?: string;
  IconClassName?: string;
  permissionIsMulti?: boolean;
}
function PermissionPage({
  children,
  permissionName,
  text = "ليس لديك صلاحية الوصول لهذه الصفحة",
  textClassName = "text-lg",
  pageClassName = "h-[calc(100vh-88px)]",
  IconClassName = "w-[150px] h-[150px]",
  permissionIsMulti = false,
}: PageInterfaces) {
  // return <div className=" w-full h-full bg-red-700">{children}</div>;
  return HandlePermissions({ object: true, permissionName, permissionIsMulti })
    ? children
    : DesignNotPermission({
        text,
        textClassName,
        IconClassName,
        pageClassName,
      });
}

export default PermissionPage;

const DesignNotPermission = ({
  text,
  textClassName,
  IconClassName,
  pageClassName,
}) => {
  return (
    <div
      className={` w-full  ${pageClassName} bg-gray-150 flex justify-center items-center gap-[40px] flex-col `}
    >
      <SvgIcon
        name="profile-delete"
        className={`${IconClassName} fill-current    text-gray-300  `}
      />
      <h2 className={`${textClassName} text-gray-300  font-bold }`}>{text}</h2>
    </div>
  );
};
