import { ReturnValueWithComma } from "../../../utils/transform";
import { SvgIcon } from "../../SvgIcon/Index";

import "./main.css";

type Props = {
  titleOne?: string;
  titleTwo?: string;
  valueTwo?: any;
  valueOne?: any;
  className?: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  bg?: string;
};

export const StatisticsCardWithTwoValue = ({
  titleOne = "",
  titleTwo = "",
  valueTwo = "",
  valueOne = "",
  className = "",
  icon = "",
  iconBg = "bg-blue-450/10",
  bg = "bg-blue-450/5",
  iconColor = "text-blue-450",
}: Props) => {
  return (
    <div className={`card ${className}`}>
      <div className="mb-5 py-3 rounded-full bg-white">
        <div className={`p-3 rounded-full ${bg}`}>
          <p className={`p-3 rounded-full ${iconBg}`}>
            <SvgIcon
              name={icon}
              className={`fill-blue-450 w-5 h-5 ${iconColor}`}
            />
          </p>
        </div>
      </div>
      <div className=" w-full  flex justify-center items-center gap-4">
        <div className=" flex-1">
          <h5 className="mb-2 text-base text-gray-450 leading-6">{titleOne}</h5>
          <span className="text-[16px] font-semibold text-gray-500 leading-8">
            {ReturnValueWithComma(valueOne)}
          </span>
        </div>
        <div className=" flex-1">
          <h5 className="mb-2 text-base text-gray-450 leading-6">{titleTwo}</h5>
          <span className="text-[16px] font-semibold text-gray-500 leading-8">
            {ReturnValueWithComma(valueTwo)}
          </span>
        </div>
      </div>
      <div className=" w-full flex justify-center items-center gap-3 py-4  text-color_04 text-[14px] font-[500]">
        <div className=" flex-1 max-w-full   h-[8px] bg-gray-50 rounded-[30px] relative">
          <div
            style={{
              width: `${(
                (Number(valueOne) / (Number(valueTwo) + Number(valueOne))) *
                  100 || 0
              ).toFixed(0)}%`,
            }}
            className=" absolute  h-full top-0 right-0 bg-blue-450 rounded-[30px]"
          ></div>
        </div>
        <bdi className=" w-[44px]">
          %
          {(
            (Number(valueOne) / (Number(valueTwo) + Number(valueOne))) * 100 ||
            0
          ).toFixed(0)}
        </bdi>
      </div>
    </div>
  );
};
