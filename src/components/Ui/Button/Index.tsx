import { ReactNode } from "react";
import { Spinner } from "../../Spinner/Index";
import { SvgIcon } from "../../SvgIcon/Index";

type Props = {
  text?: string | ReactNode;
  className?: string;
  loadingClass?: string;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: (el) => void;
};

export const Button = ({
  text = "حفظ",
  className = "",
  loadingClass = "",
  icon = "",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
}: Props) => {
  return (
    <button
      className={`btn flex items-center justify-center gap-x-3 ${className} ${
        loading || disabled ? "cursor-not-allowed	" : ""
      }`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <div className="absolute w-full h-full flex items-center justify-center bg-white/30 rounded-lg">
          <Spinner
            className={`border-black/20 !border-b-black ${loadingClass}`}
          />
        </div>
      ) : null}
      {icon ? <SvgIcon name={icon} className="w-5 h-5" /> : null}

      {text}
    </button>
  );
};
