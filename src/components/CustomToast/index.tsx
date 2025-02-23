import {useState} from "react";
import {toast, resolveValue} from "react-hot-toast";
import "./main.css";

export type ToastType = {
  id: string;
  visible: boolean;
  type: string;
  message: string;
};

type Props = {
  item: ToastType;
};

const CustomToast = ({item}: Props) => {
  const [visible] = useState(true);

  const handleClick = () => {
    item.visible = false;
    toast.dismiss(item?.id);
  };

  if (!visible) return null;

  return (
    <div
      className={`${
        item.visible ? "slide-in-right" : "slide-out-right"
      } toast ${item?.type ? `toast-${item.type}` : ""}`}
      onClick={handleClick}
    >
      {resolveValue(item?.message, item)}
    </div>
  );
};

export default CustomToast;
