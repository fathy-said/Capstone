import { lazy } from "react";

const ProjectsPage = lazy(() => import("./superVisorProject"));


export default [
  {
    index: true,
    element: <ProjectsPage />,
  },

];