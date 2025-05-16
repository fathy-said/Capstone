import { userTypes } from "../../utils/global.ts";

import studentRoute from "./Student/student-route";
import superVisorRoute from "./SuperVisor/superVisor-route";
function Route() {
  // const location = useLocation();
  const getFirstSlug = () => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    return pathArray[1];
  };

  const teamsRoute =
    (getFirstSlug() as userTypes) == "student" ? studentRoute : superVisorRoute;
  return teamsRoute;
}

export default Route;
