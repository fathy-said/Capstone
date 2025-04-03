import "./main.css";

type Props = {
  title?: string;
  desc?: string;
  valueOne?: any;
  className?: string;
};

export const StatisticsCardProgress = ({
  title = "",
  desc = "",
  valueOne = "",
  className = "",
}: Props) => {
  return (
    <div className={`card py-6 ${className}`}>
      <h2 className="text-lg w-full font-semibold text-blue-600 leading-7 mb-10">
        {title}
      </h2>
      <div className=" w-full  flex justify-center items-center gap-4">
        <div className=" text-center">
          <h5 className="mb-2 text-2xl font-bold text-gray-500 leading-6">
            {Number(valueOne)}%
          </h5>
          <h5 className="mb-2 text-base text-gray-450 leading-6">{desc}</h5>
        </div>
      </div>
      <div className=" w-full flex justify-center items-center gap-3 pt-4  text-color_04 text-[14px] font-[500]">
        <div className=" flex-1 max-w-full h-[8px] bg-gray-50 rounded-[30px] relative">
          <div
            style={{
              width: `${Number(valueOne)}%`,
            }}
            className=" absolute  h-full top-0 right-0 bg-blue-450 rounded-[30px]"
          ></div>
        </div>
      </div>
    </div>
  );
};
