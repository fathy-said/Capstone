import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { RouteSuspended } from "../../components/RouteSuspended/Index";
import { SideMenu } from "../../components/SideMenu/Index";
import { useUtils } from "../../store/utils";

import "./main.css";

/**
 * Lazy loaded components
 */
const Header = lazy(() => import("../../components/Header/Index"));

export const MainLayout = () => {
  const { sideMenuIsOpen } = useUtils();

  return (
    <div className="mainLayout">
      <RouteSuspended>
        <SideMenu />
        <div className={`app-content ${sideMenuIsOpen ? "lg:ms-80" : "ms-0"}`}>
          <Header />
          <Outlet />
        </div>
      </RouteSuspended>
    </div>
  );
};
