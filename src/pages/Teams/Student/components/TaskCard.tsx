import React, { useState, useRef, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import { userTypes } from "../../../../utils/global";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  startDate: string;
  endDate: string;
  assignedUsers?: { id: number; avatar: string }[];
  status:
    | "my-task"
    | "prof-task"
    | "to-do"
    | "in-progress"
    | "in-review"
    | "completed";
  onMoreDetails?: () => void;
  onUpload?: () => void;
  onReview?: () => void;
  onUpdate?: () => void;
  highlighted?: boolean;
  isUpdate?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  assignedUsers = [],
  status,
  onMoreDetails,
  onUpdate,
  highlighted = false,
  startDate,
  endDate,
}) => {
  // Helper function to format date safely

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";

    // Try to parse the date in different formats
    try {
      // Check if the date is in DD/MM/YYYY format (our new format)
      if (dateString.includes("/")) {
        const parts = dateString.split("/");
        if (parts.length === 3) {
          // Detect if it's in DD/MM/YYYY format
          if (parts[0].length === 2 && parseInt(parts[0]) <= 31) {
            // Parse as DD/MM/YYYY
            const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
            if (isValid(parsedDate)) {
              return format(parsedDate, "MM/dd/yyyy");
            }
          }
        }
      }

      // Try other formats
      const date = new Date(dateString);
      if (isValid(date)) {
        return format(date, "MM/dd/yyyy");
      }

      // If all parsing attempts fail
      return dateString;
    } catch (error) {
      console.error("Date parsing error:", error);
      return dateString; // Return the original string if parsing fails
    }
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userType = localStorage.getItem("user_type") as userTypes;
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm mb-3 ${
        highlighted ? "border-l-4 border-blue-500" : ""
      }`}
    >
      <div className="flex items-center mb-1">
        <h3 className="text-sm font-medium flex-grow">{title}</h3>
        {(status == "prof-task" && userType == "supervisor") ||
        status !== "prof-task" ? (
          <div className="flex relative" ref={dropdownRef}>
            <button
              className="text-gray-500 ml-2 hover:text-gray-700"
              onClick={toggleDropdown}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z"
                  fill="currentColor"
                />
                <path
                  d="M3 9.5C3.82843 9.5 4.5 8.82843 4.5 8C4.5 7.17157 3.82843 6.5 3 6.5C2.17157 6.5 1.5 7.17157 1.5 8C1.5 8.82843 2.17157 9.5 3 9.5Z"
                  fill="currentColor"
                />
                <path
                  d="M13 9.5C13.8284 9.5 14.5 8.82843 14.5 8C14.5 7.17157 13.8284 6.5 13 6.5C12.1716 6.5 11.5 7.17157 11.5 8C11.5 8.82843 12.1716 9.5 13 9.5Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-6 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={onUpdate}
                      className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      Update Task
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <p className="text-xs text-gray-600 mb-3">{description}</p>

      {status === "my-task" || status === "prof-task" ? (
        <>
          <div className="flex items-center text-xs text-gray-500 mb-2 gap-4">
            <span>{startDate && `Start Date: ${formatDate(startDate)}`}</span>

            <span>{endDate && `End Date: ${formatDate(endDate)}`}</span>
          </div>
          <button
            onClick={onMoreDetails}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            More Details
          </button>
        </>
      ) : (
        <>
          {(status === "to-do" || status === "in-progress") &&
            assignedUsers && (
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500 mr-2">
                    Assigned to:
                  </span>
                  <div className="flex -space-x-2">
                    {assignedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="w-6 h-6 rounded-full bg-gray-200 border border-white overflow-hidden"
                      >
                        <img
                          src={user.avatar || "https://via.placeholder.com/24"}
                          alt={`User ${user.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          <div className="flex justify-start flex-col items-start">
            <span className="text-xs text-gray-500">
              Due Date: {formatDate(dueDate)}
            </span>
            <button
              onClick={onMoreDetails}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              More Details
            </button>
            {/* {status === "in-progress" ? (
              <button
                onClick={onUpload}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
              >
                Upload
              </button>
            ) : status === "in-review" ? (
              <button
                onClick={onReview}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
              >
                Review
              </button>
            ) : null} */}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
