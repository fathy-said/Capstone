import { Outlet } from "react-router-dom";
import { RouteSuspended } from "../../components/RouteSuspended/Index";
import { SvgIcon } from "../../components/SvgIcon/Index";
import authbg from "../../assets/Images/authbg.png";
import "./main.css";

export const AuthLayout = () => {
  return (
    <div className="authLayout">
      <div className="container">
        <div className="authCard relative z-[50] md:w-2/3 lg:w-1/2 mx-auto  rounded-xl py-14 md:py-20">
          <SvgIcon name="logo" className="w-36 h-12 mx-auto" />
          <div className="mt-6 mx-6 lg:mx-10">
            <RouteSuspended>
              <Outlet />
            </RouteSuspended>
          </div>
        </div>
      </div>
      <div className="authBg">
        <img src={authbg} alt="" />
      </div>
    </div>
  );
};
