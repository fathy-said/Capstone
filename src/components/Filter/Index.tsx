import { ReactNode } from "react";
import { ModalDialog } from "../ModalDialog/Index";
import { SvgIcon } from "../SvgIcon/Index";
import { Button } from "../Ui/Button/Index";
import "./main.css";
interface Props {
  children?: ReactNode;
  handleSubmit: any;
  handleReset: (e) => void;
  visible: boolean;
  setVisible: any;
  searchParamsCount?: number | string;
}
export default function FilterModal({
  children,
  handleSubmit,
  handleReset,
  visible,
  setVisible,
  searchParamsCount,
}: Props) {
  return (
    <>
      <Button
        text={
          <>
            <SvgIcon name="filter-lines" className="w-5 h-5" />
            <span>فلتر بـ</span>{" "}
            <h4 className=" mr-[-5px]">{searchParamsCount || ""}</h4>
          </>
        }
        className="btn-secondary !w-fit"
        onClick={() => {
          setVisible(true);
        }}
      />
      <ModalDialog
        disableClose
        padding="py-[60px] px-[80px]"
        onClose={() => {
          setVisible(false);
        }}
        isOpen={visible}
        className=""
        contentClassName="py-[40px] !h-fit !max-h-[95vh] flex justify-start items-center flex-col "
        size="md"
      >
        {" "}
        <form
          onSubmit={handleSubmit()}
          className=" flex justify-center items-center flex-col bg-white w-full h-fit max-h-[700px] "
        >
          <div className="  flex justify-between items-center w-full ">
            <h2 className="flex justify-start items-center gap-2 text-xl font-semibold text-blue-600">
              <SvgIcon name="filter-lines" className="w-10 h-10" />
              <span>فلترة بواسطة</span>
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className=" flex justify-start items-center gap-2 text-sm font-semibold text-blue-480"
            >
              <SvgIcon name="close-circle" className="w-5 h-5" />{" "}
              <span>إزالة الكل</span>
            </button>
          </div>
          <div className=" my-6 w-full h-[1px] bg-gray-50"></div>
          <div className="w-full h-full max-h-[700px] overflow-y-auto px-5 z-[9]">
            {children}
          </div>
          <div className="  flex justify-between items-center w-full mt-10">
            <Button
              text={
                <div className=" flex justify-between gap-2 items-center leading-[25.6px]  ">
                  <span>إلغاء</span>
                </div>
              }
              type="button"
              onClick={() => {
                handleReset({ resetParams: false });
              }}
              className=" btn-secondary "
            />
            <Button
              text={
                <div className=" flex justify-between gap-2 items-center leading-[25.6px]  ">
                  <span>تطبيق</span>
                </div>
              }
              type="submit"
              className="bg-transparent text-base font-semibold text-white !bg-blue-450"
            />
          </div>{" "}
        </form>
      </ModalDialog>
    </>
  );
}
