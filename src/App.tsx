import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useEffectOnce } from "react-use";
import CustomToast, { ToastType } from "./components/CustomToast";
import { FallbackLoading } from "./components/FallbackLoading/Index";
import { routesTree } from "./router";
import { useAuth } from "./store/auth";

function App() {
  const { isLoading, me } = useAuth();
  useEffectOnce(() => {
    (async () => {
      await me();
    })();
  });
  return (
    <div className="app">
      <Toaster
        position="top-right"
        containerClassName="hotToast"
        toastOptions={{
          className: "hotToast-item",
          custom: {},
        }}
      >
        {(toast) => <CustomToast item={toast as ToastType} />}
      </Toaster>

      {!isLoading ? (
        <RouterProvider router={routesTree()} />
      ) : (
        <FallbackLoading />
      )}
    </div>
  );
}

export default App;
