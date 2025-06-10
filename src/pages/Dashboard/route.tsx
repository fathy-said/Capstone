import { userTypes } from "../../utils/global.ts";
import studentRoute from "./Student/student-route";
import superVisorRoute from "./Supervisor/superVisor-route";
import adminRoute from "./Admin/admin-route";

function DashboardRoutes() {
  const userType = localStorage.getItem("user_type") as userTypes;

  const teamsRoute =
    userType == "student"
      ? studentRoute
      : userType == "super_visor"
      ? superVisorRoute
      : userType == "admin"
      ? adminRoute
      : studentRoute;

  return teamsRoute;
}

export default DashboardRoutes;
