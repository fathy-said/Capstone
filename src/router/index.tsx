import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthorizedRoute } from "../components/AuthorizedRoute/Index";
import { AuthLayout } from "../layouts/Auth/Index";
import { MainLayout } from "../layouts/Main/Index";

/**
 * Pages
 */
const HomePage = lazy(() => import("../pages/Home/Index"));
const LoginPage = lazy(() => import("../pages/Login/Index"));
const ForgetPasswordPage = lazy(() => import("../pages/ForgetPassword/Index"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPassword/Index"));

// Design system page (contains all common components)
const DesignSystemPage = lazy(() => import("../pages/DesignSystem/Index"));
import ArchiveRoutes from "../pages/Archive/route.tsx";
import ProjectRoutes from "../pages/Project/route.tsx";
import TeamsRoutes from "../pages/Teams/route.tsx";
import DashboardRoutes from "../pages/Dashboard/route.tsx";

/**
 * Routes
 */

/**
 * Error Page
 */
import { PageErrorElement } from "../components/Errors/Page/Index";

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
          index: true,
          element: <HomePage />,
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
          path: "/:userType/dashboard",
          children: DashboardRoutes(),
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
