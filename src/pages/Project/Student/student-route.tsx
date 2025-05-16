import { lazy } from "react";

const ProjectsPage = lazy(() => import("./ProjectsPage"));
const ProjectDetails = lazy(() => import("./ProjectDetails"));
const ProjectPage = lazy(() => import("./ProjectPage"));

export default [
  {
    children: [
      {
        index: true,
        element: <ProjectsPage />,
      },
      {
        path: "details/:id",
        element: <ProjectDetails />,
      },
      {
        path: "create",
        element: <ProjectPage />,
      },
    ],
  },
]; 