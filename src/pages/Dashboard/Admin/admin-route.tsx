import { lazy } from "react";

const DashboardPage = lazy(() => import("./Dashboard.tsx"));

export default [
  {
    children: [
      {
        index: true,
        element: <DashboardPage />,
      }
    ],
  },
];
