import { NavLink } from "react-router-dom";
import { SvgIcon } from "../../../SvgIcon/Index";

import RemoveDialog from "../../../Ui/RemoveDialog/RemoveDialog";
import { Tooltip } from "../../../Ui/Tooltip/Index";
import "./main.css";

type Props = {
  value: any;
  className?: string;
  baseUrl: string;
  downloadLink?: string;
  isEdit?: boolean;
  isUrl?: boolean;
  isView?: boolean;
  isDelete?: boolean;
  isDownload?: boolean;
  isRestore?: boolean;
  isSteps?: boolean;
  onDelete?: (e) => void;
  onRestore?: (e) => void;
  onEdit?: (e) => void;
  isEditAction?: boolean;
  children?: React.ReactNode;
};

export const TableControls = ({
  className = "",
  baseUrl,
  onDelete,
  onRestore,
  onEdit,
  value,
  isView = true,
  isEdit = true,
  isDelete = true,
  isDownload = true,
  isRestore = false,
  isSteps = false,
  isEditAction = false,
  isUrl = false,
  downloadLink,
  children,
}: Props) => {
  // On delete action
  const onDeleteAction = () => {
    onDelete?.(value);
  };
  // on return project from deleted
  const onRestoreAction = () => {
    onRestore?.(value);
  };
  // on edit
  const onEditAction = () => {
    onEdit?.(value);
  };
  return (
    <div
      className={`flex flex-wrap w-max mx-auto items-center gap-2 justify-center ${className}`}
    >
      {/* <Tooltip text={undefined} children={undefined}/> */}
      {children}

      {isView ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"عرض التفاصيل"}
          children={
            <NavLink
              // to={`/${baseUrl}/view/${value?.id}`}
              to={!isUrl ? `/${baseUrl}/view/${value?.id}` : baseUrl}
              className="controls-button"
            >
              <SvgIcon name="eye" className="fill-current w-4 h-4" />
            </NavLink>
          }
        />
      ) : null}
      {isDownload ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"تحميل"}
          children={
            <a
              target="_blank"
              href={downloadLink || ""}
              download={downloadLink || ""}
              className="controls-button sucsess cursor-pointer"
            >
              <SvgIcon name="download-cloud" className="fill-current w-4 h-4" />
            </a>
          }
        />
      ) : null}

      {isEdit ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"تعديل"}
          children={
            <NavLink
              to={`/${baseUrl}/edit/${value?.id}`}
              className="controls-button"
            >
              <SvgIcon name="edit" className="fill-current w-4 h-4" />
            </NavLink>
          }
        />
      ) : null}
      {isEditAction ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"تعديل"}
          children={
            <button
              type="button"
              onClick={onEditAction}
              className="controls-button delete"
            >
              <SvgIcon name="edit" className="fill-current w-4 h-4" />
            </button>
          }
        />
      ) : null}
      {isDelete ? <RemoveDialog onDeleteAction={onDeleteAction} /> : null}
      {isSteps ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"استكمال انشاء المشروع"}
          children={
            <NavLink
              to={`/project/create/step-${value?.number}/create/${value?.id}`}
              // to={`/project/create/step-2/update/${value?.id} `}
              className="controls-button"
            >
              <SvgIcon
                name="notification-status"
                className="fill-current w-4 h-4"
              />
            </NavLink>
          }
        />
      ) : null}

      {isRestore ? (
        <Tooltip
          TextClassName="!w-fit text-nowrap"
          text={"استرجاع"}
          children={
            <button
              type="button"
              onClick={onRestoreAction}
              className="controls-button sucsess"
            >
              <SvgIcon name="refresh-2-0" className="fill-current w-4 h-4" />
            </button>
          }
        />
      ) : null}
    </div>
  );
};
