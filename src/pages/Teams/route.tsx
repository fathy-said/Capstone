import { lazy } from "react";
import { userTypes } from "../../utils/global.ts";
// import { useLocation } from "react-router-dom";

const UserPage = lazy(() => import("./Student/StudentTeams.tsx"));

function Route() {
  // const location = useLocation();
  const getFirstSlug = () => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    return pathArray[1];
  };
  console.log("getFirstSlug", getFirstSlug());
  const teamsRoute =
    (getFirstSlug() as userTypes) === "student" ? <UserPage /> : <>test</>;
  return [
    {
      children: [
        {
          index: true,
          element: teamsRoute,
        },
      ],
    },
  ];
}

export default Route;
