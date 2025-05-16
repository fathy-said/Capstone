import React from "react";

interface TaskColumnProps {
  title: string;
  count: number;
  children: React.ReactNode;
  variant?: "default" | "accent";
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
  titleBgColor?: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  count,
  children,
  variant = "default",
  icon,
  actionButton,
  titleBgColor,
}) => {
  const getBgColor = () => {
    switch (variant) {
      case "accent":
        return "bg-blue-50";
      case "default":
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className={`flex flex-col rounded-lg h-full ${getBgColor()} p-3`}>
      <div className={`flex items-center p-3 ${titleBgColor} mb-3 rounded-md`}>
        <div className="flex items-center flex-grow">
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        <div className="flex items-center">
          {actionButton}
          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-gray-200 ml-2">
            {count}
          </span>
        </div>
      </div>
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default TaskColumn;
