import { userTypes } from "../../utils/global.ts";
import adminRoute from "./Admin/admin-route.tsx";

function route() {
  const userType: userTypes = localStorage.getItem("user_type") as userTypes;
  
  // Return the appropriate routes based on user type
  if (userType === "admin") {
    return adminRoute;
  }
  
  // For non-admin users, return empty array or their specific routes
  return [];
}

export default route;
