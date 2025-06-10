import { userTypes } from "../../utils/global.ts";
import studentRoute from "./Student/student-route";
import superVisorRoute from "./Supervisor/superVisor-route";
import adminRoute from "./Admin/admin-route";

function DashboardRoutes() {
  const getFirstSlug = () => {
    const path = window.location.pathname;
    const pathArray = path.split("/");
    return pathArray[1]; // This gets the userType from /:userType/dashboard
  };

  const userType = getFirstSlug() as userTypes;
  
  // Return appropriate route based on user type
  switch (userType) {
    case "student":
      return studentRoute;
    case "Super_Visor":
      return superVisorRoute;
    case "admin":
      return adminRoute;
    default:
      return []; // Return empty array for unknown roles
  }
}

export default DashboardRoutes;
