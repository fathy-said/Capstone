import { SvgIcon } from "../../SvgIcon/Index";

import "./main.css";

type Props = {
  title?: string;
  className?: string;
  icon?: string;
  subTitle?: string;
  iconBg?: string;
  iconColor?: string;
  bg?: string;
};

export const StatisticsCard = ({
  title = "",
  className = "",
  icon = "",
  subTitle = "",
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
      <div>
        <h5 className="mb-2 text-base text-gray-450 leading-6">{title}</h5>
        <span className="text-2xl font-semibold text-gray-500 leading-8">
          {subTitle}
        </span>
      </div>
    </div>
  );
};
