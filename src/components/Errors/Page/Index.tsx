import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export interface PageErrorElementInterface {
  status?: number;
}

export const PageErrorElement = () => {
  const error = useRouteError() as PageErrorElementInterface;

  return (
    <>
      {isRouteErrorResponse(error) && (
        <div className="fixed top-0 start-0 w-full h-full bg-white flex items-center justify-center text-center p-4">
          <div>
            <h2 className="text-brown-500 text-5xl lg:text-8xl font-bold">
              {error?.status}
            </h2>
            <>
              {error?.status === 404 && (
                <p className="mt-4 text-lg font-medium">
                  هذه الصفحة غير متوفره !!
                </p>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};
