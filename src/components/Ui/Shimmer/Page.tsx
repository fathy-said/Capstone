export const PageShimmer = ({className = ""}) => {
  return (
    <div className={`container flex flex-col gap-6 ${className}`}>
      <div className="w-full h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      <div className="w-3/4 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      <div className="flex gap-x-6">
        <div className="w-1/3 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
        <div className="w-2/3 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      </div>
      <div className="w-1/3 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      <div className="w-full h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      <div className="flex gap-x-6">
        <div className="w-2/3 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
        <div className="w-1/3 h-14 md:h-20 animate-pulse rounded-xl bg-blue-100"></div>
      </div>{" "}
    </div>
  );
};
