import { userTypes } from "../../utils/global.ts";
import adminRoute from "./Admin/admin-route.tsx";
import studentRoute from "./Student/student-route";
import superVisorRoute from "./SuperVisor/superVisor-route";

function route() {
  const userType: userTypes = localStorage.getItem("user_type") as userTypes;
  const teamsRoute =
    userType == "student"
      ? studentRoute
      : userType == "supervisor"
      ? superVisorRoute
      : userType == "admin"
      ? adminRoute
      : studentRoute;
  return teamsRoute;
}

export default route;
