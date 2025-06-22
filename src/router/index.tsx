import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthorizedRoute } from "../components/AuthorizedRoute/Index";
import { AuthLayout } from "../layouts/Auth/Index";
import { MainLayout } from "../layouts/Main/Index";

/**
 * Pages
 */
const LoginPage = lazy(() => import("../pages/Login/Index"));
const ForgetPasswordPage = lazy(() => import("../pages/ForgetPassword/Index"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPassword/Index"));

// Design system page (contains all common components)
const DesignSystemPage = lazy(() => import("../pages/DesignSystem/Index"));
import ArchiveRoutes from "../pages/Archive/route.tsx";
import ProjectRoutes from "../pages/Project/route.tsx";
import TeamsRoutes from "../pages/Teams/route.tsx";
import DashboardRoutes from "../pages/Dashboard/route.tsx";
import UsersRoutes from "../pages/users/route.tsx";
/**
 * Routes
 */

/**
 * Error Page
 */
import { PageErrorElement } from "../components/Errors/Page/Index";
import ChatPage from "../pages/chat/ChatPage.tsx";

const routesTree = () => {
  return createBrowserRouter([
    // Main layout
    {
      path: "/",
      element: (
        <AuthorizedRoute>
          <MainLayout />
        </AuthorizedRoute>
      ),
      errorElement: <PageErrorElement />,
      children: [
        {
          path: "/",
          children: DashboardRoutes(),
        },
        {
          path: "design-system",
          element: <DesignSystemPage />,
        },
        {
          path: "/:userType/archive",
          children: ArchiveRoutes,
        },
        {
          path: "/:userType/projects",
          children: ProjectRoutes(),
        },
        {
          path: ":userType/teams",
          children: TeamsRoutes(),
        },
        {
          path: ":userType/users",
          children: UsersRoutes(),
        },
        {
          path: "/chat",
          element: <ChatPage />,
        },
      ],
    },
    // Auth layout
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/forget-password",
          element: <ForgetPasswordPage />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPasswordPage />,
        },
        {
          path: "design-system",
          element: <DesignSystemPage />,
        },
      ],
    },
  ]);
};

export { routesTree };
