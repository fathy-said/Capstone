import { lazy } from "react";

const Page = lazy(() => import("./SuperVisorTeams"));
const TasksPage = lazy(() => import("./SuperVisorTasks.tsx"));

export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
];
