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

/**
 * Routes
 */


/**
 * Error Page
 */
import { PageErrorElement } from "../components/Errors/Page/Index";
import PermissionPage from "../components/PermissionPage/PermissionPage";


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
          element: (
            <PermissionPage permissionName={"view_analytics"}>
              <HomePage />{" "}
            </PermissionPage>
          ),
        },

     {
          path: "design-system",
          element: <DesignSystemPage />,
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
