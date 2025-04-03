export const ProjectHeader = ({ className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-6">
          <div className="h-14 md:w-16 md:h-16 animate-pulse rounded-md bg-blue-100"></div>
          <div className="flex flex-col">
            <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
            <div className="h-14 md:w-40 md:h-5 animate-pulse rounded-md bg-blue-100"></div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
            <div className="h-14 md:w-40 md:h-5 animate-pulse rounded-md bg-blue-100"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-start w-full items-center gap-4 mt-12">
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
        <div className="h-14 md:w-32 md:h-5 animate-pulse rounded-md bg-blue-100 mb-2"></div>
      </div>
    </div>
  );
};
