import { lazy } from "react";

const ProjectsPage = lazy(() => import("./ProjectsPage"));
const ProjectDetails = lazy(() => import("./ProjectDetails"));
const ProjectPage = lazy(() => import("./ProjectPage"));
const CreateTeamPanel = lazy(() => import("./CreateTeamPanel"));
const SeeMorePanel = lazy(() => import("./SeeMorePanel"));

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
      {
        path: "createteam",
        element: <CreateTeamPanel />,
      },
      {
        path: "seemore/:id",
        element: <SeeMorePanel />,
      },
    ],
  },
]; 