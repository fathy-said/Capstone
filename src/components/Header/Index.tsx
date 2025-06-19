import { NavLink } from "react-router-dom";
import { useUtils } from "../../store/utils";
import { SvgIcon } from "../SvgIcon/Index";

import "./main.css";
import { Bot } from "lucide-react";

export default () => {
  const { sideMenuToggle } = useUtils();

  // On close side menu
  const closeMenu = () => {
    sideMenuToggle();
  };

  return (
    <header className="top-bar-header bg-white border-gray-200 border-b">
      <div className="flex   items-center justify-between px-6 py-6 gap-x-5">
        <div className="header-right flex gap-x-5">
          <SvgIcon
            name="menu"
            className="fill-current w-10 h-10 cursor-pointer"
            onClick={closeMenu}
          />
        </div>
        <div className="header-left flex gap-x-5">
          <NavLink to={"/chat"}>
            <Bot className="text-gray-400" />
          </NavLink>
          <SvgIcon name="bell" className="header-icon" />
        </div>
      </div>
    </header>
  );
};
