import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import { UseUtilsInterface, useUtils } from "../../store/utils";
import { SvgIcon } from "../SvgIcon/Index";
import { Accordion } from "../Ui/Accordion/Index";

import HandlePermissions from "../../hooks/HandlePermissions";
import { Button } from "../Ui/Button/Index";
import "./main.css";
import IconAtom from "../IconAtom/Icon-Atom";
import { icons } from "lucide-react";

const pages = [
    {
    isLocked: false,
    accordion: false,
    route: "/student/projects",
    icon: "FolderKanban",
    title: "projects",
    permission: "",
    subPages: [],
  },
  {
    isLocked: false,
    accordion: false,
    route: "/student/archive",
    icon: "ArchiveRestore",
    title: "Archive",
    permission: "",
    subPages: [],
  },
  {
    isLocked: false,
    accordion: false,
    route: "/student/teams",
    icon: "Users",
    title: "Teams",
    permission: "",
    subPages: [],
  },
];
type Props = {
  className?: string;
};

export const SideMenu = ({ className = "" }: Props) => {
  const { sideMenuToggle } = useUtils();
  const { sideMenuIsOpen } = useUtils(
    ({ sideMenuIsOpen }: UseUtilsInterface) => ({
      sideMenuIsOpen,
    })
  );

  const { logout } = useLogout();

  // On logout CTA
  const onLogoutAction = async () => {
    await logout();
  };

  return (
    <>
      <div
        onClick={sideMenuToggle}
        className={` ${
          sideMenuIsOpen && "max-lg:left-0"
        }   left-[-100%]  transition-[0.3s] fixed w-full h-full z-[49] bg-[#00000082] top-0 right-0  bottom-0  `}
      ></div>

      <aside
        className={`fixed z-50 flex flex-col top-0 left-0 w-80 px-6 bg-white h-full border-r  ${
          sideMenuIsOpen ? "open" : "close"
        } ${className}`}
      >
        <div className="flex justify-start py-8 ">
          <Link to="/">
            <SvgIcon name="logo" className="fill-current w-48 h-14" />
          </Link>
        </div>
        <div className=" h-full  flex justify-between items-center flex-col flex-1">
          <div className="overflow-y-auto max-h-full flex-1 w-full">
            <div className="flex flex-col py-4 space-y-1">
              <NavLink to="/" className="sidemenu-navigation">
                <SvgIcon name="bar-chart" className="fill-current w-6 h-6" />
                نظرة عامة
              </NavLink>
              {pages?.length &&
                pages?.map((page, index) => {
                  if (page?.isLocked) {
                    console.log("page?.title", page?.title);
                    return (
                      <div className=" w-full h-fit" key={index}>
                        {handleLockComponent(page?.title)}
                      </div>
                    );
                  }

                  if (page?.accordion) {
                    return (
                      <Accordion
                        key={index}
                        header={
                          <p className="flex items-center gap-x-3 text-base text-blue-500 font-semibold">
                            <SvgIcon
                              name={page?.icon}
                              className="fill-current w-6 h-6"
                            />
                            {page?.title}
                          </p>
                        }
                        headerClassName="rounded-md hover:bg-gray-100 hover:text-blue-600"
                      >
                        {" "}
                        {page?.subPages?.length &&
                          page?.subPages?.map((sub: any, index) => {
                            if (sub?.isLocked) {
                              return (
                                <div className=" w-full h-fit" key={index}>
                                  {handleLockComponent(sub?.title)}
                                </div>
                              );
                            } else {
                              return (
                                <div className=" w-full h-fit" key={index}>
                                  <HandlePageRoute
                                    route={sub?.route}
                                    icon={sub?.icon}
                                    title={sub?.title}
                                    permission={sub?.permission}
                                  />
                                </div>
                              );
                            }
                          })}
                      </Accordion>
                    );
                  } else {
                    return (
                      <div className=" w-full h-fit" key={index}>
                        <HandlePageRoute
                          route={page?.route}
                          icon={page?.icon}
                          title={page?.title}
                          permission={page?.permission}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="py-4 border-t  w-full">
            <Button
              onClick={onLogoutAction}
              className="text-base text-blue-500 font-semibold rounded-md bg-transparent hover:bg-gray-100 hover:text-blue-600 p-3 w-full"
              text={
                <p className="flex justify-between items-center w-full">
                  تسجيل الخروج
                  <SvgIcon name="log-out" className="fill-current w-5 h-5" />
                </p>
              }
            />
          </div>
        </div>
      </aside>
    </>
  );
};

interface RouteProps {
  route: string;
  icon: string;
  title: string;
  permission: string;
}
const HandlePageRoute = ({ route, icon, title, permission }: RouteProps) => {
  const iconName = icon as keyof typeof icons;
  return HandlePermissions({
    object: true,
    permissionName: permission,
  }) ? (
    <NavLink to={route} className="sidemenu-navigation">
      <SvgIcon name={iconName} className="fill-current w-6 h-6" />
      {title}{" "}
    </NavLink>
  ) : (
    <>
      {/* handleLockComponent(title) */}

      <NavLink to={route} className="sidemenu-navigation">
        <IconAtom name={iconName} className=" w-6 h-6" />
        {title}{" "}
      </NavLink>
    </>
  );
};

const handleLockComponent = (name: string) => {
  return (
    <div className="sidemenu-navigation block">
      <div className="flex justify-center items-end gap-3">
        <SvgIcon
          name="bar-chart"
          className="fill-current text-gray-250 w-6 h-6"
        />
        {name}
      </div>

      <SvgIcon name="lock" className="fill-current text-gray-250 w-6 h-6" />
    </div>
  );
};
