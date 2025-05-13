import { lazy } from "react";

const Page = lazy(() => import("./User/UserTeams.tsx"));
export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
    ],
  },
];
