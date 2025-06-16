import React, { useState } from "react";
import { userTypes } from "../../../../utils/global";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, isValid } from "date-fns";

interface TaskUpdateFormProps {
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignedUsers?: { id: number; avatar: string }[];
    status:
      | "my-task"
      | "prof-task"
      | "to-do"
      | "in-progress"
      | "in-review"
      | "completed";
    attachments?: string[];
    startDate?: string;
    endDate?: string;
  };
  onClose: () => void;
  onUpdate: (
    taskId: string,
    updatedTask: {
      title?: string;
      description?: string;
      dueDate?: string;
      startDate?: string;
      endDate?: string;
      status?:
        | "my-task"
        | "prof-task"
        | "to-do"
        | "in-progress"
        | "in-review"
        | "completed";
    }
  ) => void;
}

const TaskUpdateForm: React.FC<TaskUpdateFormProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  // Helper function to parse date strings in different formats
  const parseDate = (dateString: string | undefined): Date | null => {
    if (!dateString) return null;
    
    try {
      // Check if the date is in DD/MM/YYYY format
      if (dateString.includes("/")) {
        const parts = dateString.split("/");
        
        // Check if it's DD/MM/YYYY format
        if (parts.length === 3 && parts[0].length === 2 && parseInt(parts[0]) <= 31) {
          const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
          if (isValid(parsedDate)) return parsedDate;
        }
        
        // Check if it's YYYY/MM/DD format
        if (parts.length === 3 && parts[0].length === 4) {
          const parsedDate = parse(dateString, "yyyy/MM/dd", new Date());
          if (isValid(parsedDate)) return parsedDate;
        }
      }
      
      // Try standard date format
      const date = new Date(dateString);
      if (isValid(date)) return date;
      
      return new Date(); // Fallback to current date if all parsing attempts fail
    } catch (error) {
      console.error("Date parsing error:", error);
      return new Date(); // Fallback to current date if parsing fails
    }
  };

  const [editedStartDate, setEditedStartDate] = useState<Date | null>(
    task.startDate ? parseDate(task.startDate) : new Date()
  );
  
  const [editedEndDate, setEditedEndDate] = useState<Date | null>(
    task.endDate ? parseDate(task.endDate) : null
  );
  const [editedStatus, setEditedStatus] = useState(task.status);
  const userType = localStorage.getItem("user_type") as userTypes;
  const handleSaveChanges = () => {
    // Format dates to string in the format dd/mm/yyyy
    const formatDate = (date: Date | null): string | undefined => {
      if (!date) return undefined;
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };

    onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: formatDate(editedEndDate) || task.dueDate, // For backward compatibility
      startDate: formatDate(editedStartDate),
      endDate: formatDate(editedEndDate),
      status: editedStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Edit Task</h2>
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

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value as any)}
            >
              <option value="to-do">To Do</option>
              {userType === "super_visor" && (
                <option value="prof-task">Prof Task</option>
              )}
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Range
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex flex-col items-stretch justify-start">
                <label className="block text-xs text-gray-500 mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={editedStartDate}
                  onChange={(date: Date) => setEditedStartDate(date)}
                  selectsStart
                  startDate={editedStartDate}
                  endDate={editedEndDate}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 flex flex-col items-stretch justify-start">
                <label className="block text-xs text-gray-500 mb-1 w-full">
                  End Date
                </label>
                <DatePicker
                  selected={editedEndDate}
                  onChange={(date: Date) => setEditedEndDate(date)}
                  selectsEnd
                  startDate={editedStartDate}
                  endDate={editedEndDate}
                  minDate={editedStartDate}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdateForm;
