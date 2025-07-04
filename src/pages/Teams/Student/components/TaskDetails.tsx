import React from "react";
import { format, parse, isValid } from "date-fns";
import { userTypes } from "../../../../utils/global";

interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    startDate?: string;
    endDate?: string;
    assignedUsers?: { id: number; avatar: string }[];
    status:
      | "my-task"
      | "prof-task"
      | "to-do"
      | "in-progress"
      | "in-review"
      | "completed";
    attachments?: string[];
  };
  onClose: () => void;
  onEdit: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose, onEdit }) => {
  const userType = localStorage.getItem("user_type") as userTypes;

  // Helper function to format date safely
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";

    try {
      // Check if the date is in DD/MM/YYYY format
      if (dateString.includes("/")) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
          // Detect if it's in DD/MM/YYYY format
          if (parts[0].length === 2 && parseInt(parts[0]) <= 31) {
            // Parse as DD/MM/YYYY
            const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
            if (isValid(parsedDate)) {
              return format(parsedDate, "MMMM dd, yyyy");
            }
          }
        }
      }

      // Try standard date format
      const date = new Date(dateString);
      if (isValid(date)) {
        return format(date, "MMMM dd, yyyy");
      }

      return dateString;
    } catch (error) {
      console.error("Date parsing error:", error);
      return dateString; // Return the original string if parsing fails
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Title</p>
              <p className="font-medium">{task.title}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <div className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "in-review"
                      ? "bg-yellow-500"
                      : task.status === "in-progress"
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  }`}
                ></span>
                <span className="capitalize">
                  {task.status.replace(/-/g, " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date Range</p>
              <div className="flex flex-row gap-3">
                <div>
                  <p className="text-xs text-gray-400">Start:</p>
                  <p>
                    {task.startDate
                      ? formatDate(task.startDate)
                      : formatDate(task.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">End:</p>
                  <p>
                    {task.endDate
                      ? formatDate(task.endDate)
                      : formatDate(task.dueDate)}
                  </p>
                </div>
              </div>
            </div>

            {task.assignedUsers && task.assignedUsers.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Assigned To</p>
                <div className="flex items-center">
                  {task.assignedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="w-8 h-8 rounded-full overflow-hidden mr-1 bg-gray-200 border border-white"
                      title={`User ${user.id}`}
                    >
                      <img
                        src={user.avatar || "https://via.placeholder.com/32"}
                        alt={`User ${user.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Description</p>
            <p className="bg-gray-50 p-4 rounded">{task.description}</p>
          </div>

          {task.attachments && task.attachments.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Attachments</p>
              <div className="grid grid-cols-2 gap-2">
                {task.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500 mr-2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <span className="text-sm truncate">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            {(task.status == "prof-task" && userType == "supervisor") ||
            task.status !== "prof-task" ? (
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Edit Task
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
