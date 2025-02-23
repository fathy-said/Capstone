import {SvgIcon} from "../SvgIcon/Index";

export const FallbackLoading = () => {
  return (
    <div className="fixed top-0 start-0 w-full h-full bg-blue-100 z-50 flex flex-col gap-y-3 items-center justify-center">
      <SvgIcon name="logo" className="fill-current w-40 h-14" />
    </div>
  );
};
