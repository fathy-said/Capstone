import { useState } from "react";
import { ModalDialog } from "../../ModalDialog/Index";
import { SvgIcon } from "../../SvgIcon/Index";
import { Button } from "../Button/Index";
import { Tooltip } from "../Tooltip/Index";
import "./main.css";
export default function RemoveDialog({ onDeleteAction }) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Tooltip
        text={"حذف"}
        children={
          <button
            type="button"
            onClick={() => setVisible(true)}
            // onClick={onDeleteAction}
            className="controls-button delete"
          >
            <SvgIcon name="bin" className="fill-current w-4 h-4" />
          </button>
        }
      />
      <ModalDialog
        onClose={() => {
          setVisible(false);
        }}
        isOpen={visible}
        size="sm"
      >
        {" "}
        <div className="rounded-xl flex px-10 py-10 gap-8 justify-center items-center flex-col bg-white">
          <div>
            <SvgIcon
              name="svgexport-21 1"
              className="fill-current w-[120px] h-[120px]"
            />
          </div>
          <div className="flex gap-2 justify-center items-center flex-col ">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600">
              هل متأكد من الحذف !
            </h2>
            {/* <h2 className="text-sm font-normal text-gray-450">
                  هل متأكد من حذف المشروع
                </h2> */}
          </div>
          <div className=" flex justify-center items-center gap-4">
            <Button
              className="prev-button"
              text="الغاء"
              onClick={() => {
                setVisible(false);
              }}
            />
            <Button
              onClick={() => {
                setVisible(false);
                onDeleteAction();
              }}
              text={"حذف "}
              className="bg-transparent  text-base font-semibold text-white !bg-blue-450"
            />{" "}
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
