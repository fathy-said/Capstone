export const TableShimmer = ({className = ""}) => {
  return (
    <div className={`rounded-lg flex flex-col gap-y-4 ${className}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8]?.map((i) => (
        <div key={i} className="grid grid-cols-5 gap-4">
          <div className="bg-blue-100 animate-pulse h-16 rounded-lg" />
          <div className="bg-blue-100 animate-pulse h-16 rounded-lg" />
          <div className="bg-blue-100 animate-pulse h-16 rounded-lg" />
          <div className="bg-blue-100 animate-pulse h-16 rounded-lg" />
          <div className="bg-blue-100 animate-pulse h-16 rounded-lg" />
        </div>
      ))}
    </div>
  );
};
