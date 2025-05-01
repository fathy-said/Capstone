import { lazy } from "react";

const Page = lazy(() => import("./Index"));
const Details = lazy(() => import("./Details"));

export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: ":id",
        element: <Details />,
      },
    ],
  },
];
