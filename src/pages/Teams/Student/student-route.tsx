import { lazy } from "react";

const Page = lazy(() => import("./StudentTeams"));
const TasksPage = lazy(() => import("./StudentTasks"));

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
