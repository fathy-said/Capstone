import { userTypes } from "../../utils/global.ts";
import studentRoute from "./Student/student-route";
import superVisorRoute from "./SuperVisor/superVisor-route.tsx";
import adminRoute from "./Admin/admin-route.tsx";

function DashboardRoutes() {
  const userType = localStorage.getItem("user_type") as userTypes;

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

export default DashboardRoutes;

