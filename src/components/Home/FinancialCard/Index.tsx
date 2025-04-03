import { ReturnValueWithComma } from "../../../utils/transform";

type Props = {
  className?: string;
  data: any;
};

export const FinancialCard = ({ data, className = "" }: Props) => {
  return (
    <div
      className={`flex flex-col flex-2 justify-between border-gray-50 border shadow-sm shadow-gray-200 bg-white rounded-[12px] py-8 px-8 ${className}`}
    >
      <div className="w-full">
        <h2 className="text-lg text-start w-full font-bold text-gray-500 leading-7">
          المؤشرات المالية
        </h2>
        <div className=" w-full h-px mt-5 bg-gray-200"></div>
      </div>
      {/* <PieChart data={data} /> */}
      <div className=" w-full h-full flex-col flex justify-between items-start gap-5 pt-[50px]">
        <div className=" flex flex-1  justify-center items-start gap-2">
          <div className="w-2 rounded-full mt-2 h-2 bg-blue-450"></div>
          <div className="flex justify-start items-start  flex-col">
            <h5 className="text-xl font-medium text-gray-450 leading-5">
              قيمة العقود
            </h5>
            <span className="text-[22px] font-semibold text-gray-500 leading-8">
              {data?.contract_values >= 0
                ? `${ReturnValueWithComma(data?.contract_values)}  ر.س`
                : null}
            </span>
          </div>
        </div>
        <div className=" w-full h-[1px] my-[20px] bg-gray-50"> </div>
        <div className=" flex  flex-1 justify-center items-start gap-2">
          <div className="w-2 rounded-full mt-2 h-2 bg-blue-450"></div>
          <div className="flex justify-start items-start  flex-col">
            <h5 className="text-xl font-medium text-gray-450 leading-5">
              قيمة المحصل
            </h5>
            <span className="text-[22px] font-semibold text-gray-500 leading-8">
              {data?.invoices_value >= 0
                ? `${ReturnValueWithComma(data?.invoices_value)}  ر.س`
                : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
