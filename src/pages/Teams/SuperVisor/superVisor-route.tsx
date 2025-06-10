import { lazy } from "react";

const Page = lazy(() => import("./SuperVisorTeams"));
const TasksPage = lazy(() => import("./Details/SuperVisorTasks.tsx"));

export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: ":teamId/details/tasks",
        element: <TasksPage />,
      },
    ],
  },
];
