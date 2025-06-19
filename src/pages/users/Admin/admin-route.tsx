import { lazy } from "react";

const Page = lazy(() => import("./Users.tsx"));
const UserDetail = lazy(() => import("./UserDetail.tsx"));
const CreateUsers = lazy(() => import("./CreateUsers.tsx"));
const EditUsers = lazy(() => import("./EditUsers.tsx"));

export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "user/details/:userId",
        element: <UserDetail />,
      },
      {
        path: "user/create",
        element: <CreateUsers />,
      },
      {
        path: "user/edit/:userId",
        element: <EditUsers />,
      },
    ],
  },
];
