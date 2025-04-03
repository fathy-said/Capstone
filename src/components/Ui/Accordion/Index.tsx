import {ReactNode, useState} from "react";
import {SvgIcon} from "../../SvgIcon/Index";
import {CSSTransition} from "react-transition-group";
import {useUpdateEffect} from "react-use";

import "./main.css";

type Props = {
  className?: string;
  headerClassName?: string;
  activeHeaderClassName?: string;
  contentClassName?: string;
  activeContentClassName?: string;
  children: ReactNode;
  header: string | ReactNode;
  isOpen?: boolean;
  arrow?: ReactNode;
  isArrow?: boolean;
  isRotate?: boolean;
  onChange?: (e: boolean) => void;
};

// Arrow component for menu collpase  action
const arrowComponent = (
  <SvgIcon name="chevron-down" className="fill-current w-4 h-4" />
);

export const Accordion = ({
  className = "",
  headerClassName = "",
  activeHeaderClassName = "",
  contentClassName = "",
  activeContentClassName = "",
  children,
  header,
  isOpen = false,
  arrow = arrowComponent,
  isRotate = true,
  isArrow = true,
  onChange,
}: Props) => {
  const [toggle, setToggle] = useState(isOpen);

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
    onChange?.(!toggle);
  };

  // On isOpen change
  useUpdateEffect(() => {
    setToggle(isOpen);
  }, [isOpen]);

  return (
    <div className={className}>
      <button
        type="button"
        className={`duration-200 transition-all w-full flex items-center justify-between md:text-lg font-medium p-4 ${headerClassName} ${
          toggle ? activeHeaderClassName : ""
        }`}
        onClick={onToggleAction}
      >
        {header}

        {isArrow ? (
          <div
            className={`w-4 h-4 flex items-center justify-center transition-all duration-200 ${
              toggle && isRotate ? "rotate-180" : ""
            }`}
          >
            {arrow}
          </div>
        ) : null}
      </button>

      <CSSTransition
        in={toggle}
        timeout={300}
        classNames="accordion-content"
        unmountOnExit
      >
        <div
          className={`duration-200 transition-all px-4 py-2 ${contentClassName} ${
            toggle ? activeContentClassName : ""
          }`}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};
