import { ReactNode, useState } from "react";

interface TooltipProps {
  text: ReactNode;
  children: ReactNode;
  backGroundColor?: string;
  textColor?: string;
  offset?: string;
  trigger?: "hover" | "click";
  className?: string;
  TextClassName?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  backGroundColor = "#101828",
  textColor = "gray-700",
  offset = "5px",
  trigger = "hover",
  className,
  TextClassName,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Handlers for tooltip visibility based on trigger
  const handleInteraction = (type: "enter" | "leave" | "click") => {
    if (trigger === "hover") {
      setShowTooltip(type === "enter");
    } else if (trigger === "click" && type === "click") {
      setShowTooltip((prev) => !prev);
    }
  };

  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => handleInteraction("enter")}
      onMouseLeave={() => handleInteraction("leave")}
    >
      {showTooltip && trigger == "click" && (
        <div
          className=" fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-[#1202022a] z-[52]"
          onClick={() => setShowTooltip(false)}
        ></div>
      )}{" "}
      <span
        className={`text-${textColor} group z-[54] ${
          trigger == "click" && "cursor-pointer"
        } `}
        onClick={() => {
          handleInteraction("click");
        }}
      >
        {children}
      </span>
      {showTooltip && (
        <div
          style={{
            background: backGroundColor,
            bottom: `calc(100% + ${offset})`,
          }}
          onClick={(e) => {
            e.preventDefault();
          }}
          className={`${className} text-white z-[54] min-w-full w-fit text-xs rounded-md p-2 absolute z-1000 left-[50%] transform -translate-x-1/2 pointer-events-auto`}
        >
          <p
            className={`${TextClassName} min-w-full leading-relaxed whitespace-normal max-w-[240px]`}
          >
            {text}
          </p>
          <div className=" absolute min-w-full h-5  bottom-[-18px] left-0 z-[53] rounded-md rounded-t-none"></div>

          <svg
            style={{ color: backGroundColor }}
            className="absolute h-2 top-full z-[54] left-1/2 transform -translate-x-1/2"
            viewBox="0 0 255 255"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      )}
    </div>
  );
};
