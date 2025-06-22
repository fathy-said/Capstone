import React from "react";
import TaskColumn from "./TaskColumn";
import { userTypes } from "../../../../utils/global";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  startDate: string;
  endDate: string;
  assignedUsers?: { id: number; avatar: string }[];
  status:
    | "my-task"
    | "prof-task"
    | "to-do"
    | "in-progress"
    | "in-review"
    | "completed";
}

interface TaskBoardProps {
  tasks: Task[];
  renderTaskCard: (task: Task, isUpdate?: boolean) => React.ReactNode;
  addTaskButton?: React.ReactNode;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  renderTaskCard,
  addTaskButton,
}) => {
  const userType = localStorage.getItem("user_type") as userTypes;

  // Group tasks by status
  const tasksByStatus = {
    "my-task": tasks.filter((task) => task.status === "my-task"),
    "prof-task": tasks.filter((task) => task.status === "prof-task"),
    "to-do": tasks.filter((task) => task.status === "to-do"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    "in-review": tasks.filter((task) => task.status === "in-review"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  // Check if user is professor
  const isProfessor = userType === "supervisor";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 h-full">
      <TaskColumn
        title="My Task"
        titleBgColor="bg-green-200"
        count={tasksByStatus["my-task"].length}
        variant="accent"
        actionButton={addTaskButton}
      >
        {tasksByStatus["my-task"].map((task) => renderTaskCard(task))}
      </TaskColumn>

      <TaskColumn
        titleBgColor="bg-blue-200"
        title="Prof. Task"
        count={tasksByStatus["prof-task"].length}
        actionButton={isProfessor ? addTaskButton : null}
      >
        {tasksByStatus["prof-task"].map((task) => renderTaskCard(task))}
      </TaskColumn>

      <TaskColumn
        titleBgColor="bg-blue-200"
        title="To-Do"
        count={tasksByStatus["to-do"].length}
      >
        {tasksByStatus["to-do"].map((task) => renderTaskCard(task))}
      </TaskColumn>

      <TaskColumn
        title="In Progress"
        titleBgColor="bg-red-300"
        count={tasksByStatus["in-progress"].length}
      >
        {tasksByStatus["in-progress"].map((task) => renderTaskCard(task))}
      </TaskColumn>

      <TaskColumn
        title="In Review"
        titleBgColor="bg-orange-300"
        count={tasksByStatus["in-review"].length}
      >
        {tasksByStatus["in-review"].map((task) => renderTaskCard(task))}
      </TaskColumn>

      <TaskColumn
        title="Completed"
        titleBgColor="bg-green-300"
        count={tasksByStatus["completed"].length}
      >
        {tasksByStatus["completed"].map((task) => renderTaskCard(task))}
      </TaskColumn>
    </div>
  );
};

export default TaskBoard;
