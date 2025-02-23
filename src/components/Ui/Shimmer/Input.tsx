export const InputShimmer = ({ className = "", simmerHeight = "h-16" }) => {
  return (
    <div className={`rounded-lg w-full flex flex-col gap-y-4 ${className}`}>
      <div
        className={`bg-blue-100 animate-pulse ${simmerHeight} rounded-lg w-full`}
      />
    </div>
  );
};
