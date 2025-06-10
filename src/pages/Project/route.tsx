import { userTypes } from "../../utils/global.ts";
import studentRoute from "./Student/student-route";

function Route() {
  const userType: userTypes = localStorage.getItem("user_type") as userTypes;

  const teamsRoute = userType == "student" ? studentRoute : studentRoute;
  return teamsRoute;
}

export default Route;
