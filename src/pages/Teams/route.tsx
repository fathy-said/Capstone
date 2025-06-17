import { userTypes } from "../../utils/global.ts";

import studentRoute from "./Student/student-route";
import superVisorRoute from "./SuperVisor/superVisor-route";
function route() {
  const userType: userTypes = localStorage.getItem("user_type") as userTypes;
  const teamsRoute =
    userType == "student"
      ? studentRoute
      : userType == "supervisor"
      ? superVisorRoute
      : studentRoute;
  return teamsRoute;
}

export default route;
