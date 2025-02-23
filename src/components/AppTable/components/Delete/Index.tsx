import {useState} from "react";
import {ModalDialog} from "../../../ModalDialog/Index";
import {SvgIcon} from "../../../SvgIcon/Index";

export const DeleteRow = () => {
  const [toggle, setToggle] = useState(false);

  // On toggle action
  const onToggleAction = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <button
        type="button"
        className="controls-button delete"
        onClick={onToggleAction}
      >
        <SvgIcon name="bin" className="fill-current w-4 h-4" />
      </button>

      <ModalDialog isOpen={toggle} onClose={onToggleAction}>
        <p>Delete </p>
      </ModalDialog>
    </>
  );
};
