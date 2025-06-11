import React, { useState } from "react";

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
  };
  onClose: () => void;
  onUpdate: (
    taskId: string,
    updatedTask: {
      title?: string;
      description?: string;
      dueDate?: string;
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
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleSaveChanges = () => {
    onUpdate(task.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
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
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedDueDate.split("/").reverse().join("-")} // Convert date from yyyy/mm/dd to yyyy-mm-dd
              onChange={(e) => {
                const date = e.target.value;
                // Convert date from yyyy-mm-dd to yyyy/mm/dd
                const formattedDate = date.split("-").join("/");
                setEditedDueDate(formattedDate);
              }}
            />
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
