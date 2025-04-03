import { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import { SvgIcon } from "../SvgIcon/Index";

import "./main.css";

interface Props {
  children?: ReactNode;
  isOpen?: boolean;
  disableClose?: boolean;
  padding?: string;
  closeButton?: boolean;
  title?: string;
  onClose?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  contentClassName?: string;
}

export const ModalDialog = ({
  children = null,
  isOpen = false,
  closeButton = true,
  disableClose = false,
  onClose,
  title = "",
  size = "sm",
  className = "",
  contentClassName = "",
  padding = "p-6",
}: Props) => {
  const nodeRef = useRef(null);

  const defaultStyle = {
    transition: `all 400ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1, transform: "translateX(0%)" },
    entered: { opacity: 1, transform: "translateX(0%)" },
    exiting: { opacity: 0, transform: "translateY(100%)" },
    exited: { opacity: 0, transform: "translateY(-100%)" },
  };

  /**
   * On close action
   */
  const onCloseAction = () => {
    if (!disableClose) onClose?.();
  };

  return createPortal(
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={400}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        return (
          <div
            className={`modalDialog ${className} fixed top-0 start-0 w-full h-full flex items-center justify-center p-6 ${size}`}
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div
              className="absolute z-[1] top-0 start-0 w-full h-full bg-black/50"
              onClick={onCloseAction}
            ></div>

            <div
              className={`${contentClassName} modalDialog-content relative z-[2] bg-white rounded-2xl ${padding}`}
            >
              <div>
                {title ? <h3 className="fs-lg">{title}</h3> : null}

                {!disableClose ? (
                  <>
                    {closeButton && (
                      <button
                        className="w-8 h-8 flex items-center justify-center duration-150 transition-all bg-brown-200 rounded-lg text-brown-500 hover:text-brown-300"
                        onClick={onCloseAction}
                      >
                        <SvgIcon
                          name="close-square"
                          className="w-5 h-5 fill-current"
                        />
                      </button>
                    )}
                  </>
                ) : null}
              </div>
              {children}
            </div>
          </div>
        );
      }}
    </Transition>,
    document?.getElementById("app-portal") as HTMLElement
  );
};
