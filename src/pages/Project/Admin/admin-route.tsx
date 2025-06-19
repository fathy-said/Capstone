import { lazy } from "react";

const ProjecPage = lazy(() => import("./adminProject"));

export default [
  {
    children: [
      {
        index: true,
        element: <ProjecPage />,
      }
    ],
  },
];
