import { lazy } from "react";

const Page = lazy(() => import("./SuperVisorTeams"));
const TasksPage = lazy(() => import("./Details/SuperVisorTasks.tsx"));
const CreateReport = lazy(() => import("./Report/CreateReport.tsx"));
const Reports = lazy(() => import("./Report/Reports.tsx"));
const TeamsMember = lazy(() => import("./TeamsMember.tsx"));
const ReportDetail = lazy(() => import("./Report/ReportDetail.tsx"));
export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: ":teamId/details/tasks",
        element: <TasksPage />,
      },
      {
        path: ":teamId/details/members",
        element: <TeamsMember />,
      },
      {
        path: ":teamId/details/report",
        element: <Reports />,
      },
      {
        path: ":teamId/details/report/:reportId",
        element: <ReportDetail />,
      },
      {
        path: ":teamId/details/report/add",
        element: <CreateReport />,
      },
    ],
  },
];
