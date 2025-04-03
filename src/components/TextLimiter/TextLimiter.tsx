import { useMediaQuery } from "react-responsive";
import { Tooltip } from "../Ui/Tooltip/Index";

interface TextLimiterProps {
  text: string;
  limits: {
    vsm: number; // Optional limit for very small screens
    sm?: number; // Optional limit for small screens
    md?: number; // Optional limit for medium screens
    lg?: number; // Optional limit for large screens
    xl?: number; // Optional limit for extra-large screens
    xxl?: number; // Optional limit for 2XL screens
  };
}

const TextLimiter = ({ text, limits = { vsm: 0 } }: TextLimiterProps) => {
  // Media query hooks
  const isVsm = useMediaQuery({ minWidth: 640 });
  const isSm = useMediaQuery({ minWidth: 640 });
  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  const isXl = useMediaQuery({ minWidth: 1280 });
  const is2xl = useMediaQuery({ minWidth: 1536 });

  // Assign limits in priority order
  const limit =
    (is2xl && limits?.xxl) ||
    (isXl && limits?.xl) ||
    (isLg && limits?.lg) ||
    (isMd && limits?.md) ||
    (isSm && limits?.sm) ||
    (isVsm && limits?.vsm) ||
    text.length;
  return (
    <>
      {text?.length > limit ? (
        <Tooltip
          text={text}
          children={<span>{text?.slice(0, limit) + "..."}</span>}
        />
      ) : (
        text
      )}
    </>
  );
};

export default TextLimiter;
