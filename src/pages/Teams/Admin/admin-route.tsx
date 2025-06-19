import { lazy } from "react";

const Page = lazy(() => import("./AdminTeams.tsx"));
const Details = lazy(() => import("./TeamDetail"));
const MeetingDetail = lazy(() => import("./MeetingDetail.tsx"));

export default [
  {
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: ":teamId/details",
        element: <Details />,
      },
      {
        path: ":teamId/details/:meetingId",
        element: <MeetingDetail />,
      },
    ],
  },
];
