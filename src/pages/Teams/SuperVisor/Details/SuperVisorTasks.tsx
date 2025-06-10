import { Button } from "../../../../components/Ui/Button/Index";
import { useLocation, useNavigate } from "react-router-dom";
import TasksPage from "../../components/TasksPage";
function SuperVisorTasks() {
  const location = useLocation();
  const currentLocation = location.pathname.split("/").slice(0, -1).join("/");
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="container py-20 flex flex-col justify-start items-center gap-8">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <div className="flex justify-start items-center gap-2 w-full">
            <Button text="Tasks" disabled={true} className="bg-gray-200" />
            <Button
              text="Members"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/members`)}
            />
            <Button
              text="Report"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/report`)}
            />
          </div>
          <div className=" w-full h-[1px] bg-blue-400"></div>
        </div>
      </div>
      <TasksPage />
    </div>
  );
}

export default SuperVisorTasks;
