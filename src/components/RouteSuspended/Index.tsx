import {ReactNode, Suspense} from "react";
import {FallbackLoading} from "../FallbackLoading/Index";

type Props = {
  children: ReactNode;
};

export const RouteSuspended = ({children}: Props) => {
  return (
    <>
      <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
    </>
  );
};
