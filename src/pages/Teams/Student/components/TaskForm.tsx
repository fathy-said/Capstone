import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    dueDate?: string;
    startDate: string;
    endDate: string;
    description: string;
    attachments?: File[];
  }) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format dates to string in the format dd/mm/yyyy
    const formatDate = (date: Date | null): string => {
      if (!date) return "";
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };

    onSubmit({
      title,
      dueDate: endDate ? formatDate(endDate) : "", // For backward compatibility
      startDate: formatDate(startDate),
      endDate: endDate ? formatDate(endDate) : formatDate(startDate),
      description,
      attachments,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit} className="p-6">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dateRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Range
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start writing here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="border border-gray-300 rounded p-4 flex items-center justify-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V3C11 2.44772 11.4477 2 12 2Z"
                    fill="#FF0000"
                  />
                  <path
                    d="M12 22C11.4477 22 11 21.5523 11 21V16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16V21C13 21.5523 12.5523 22 12 22Z"
                    fill="#FF0000"
                  />
                  <path
                    d="M2 12C2 11.4477 2.44772 11 3 11H8C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13H3C2.44772 13 2 12.5523 2 12Z"
                    fill="#FF0000"
                  />
                  <path
                    d="M16 12C16 11.4477 16.4477 11 17 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H17C16.4477 13 16 12.5523 16 12Z"
                    fill="#FF0000"
                  />
                </svg>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {attachments.length > 0
                    ? `${attachments.length} file(s) selected`
                    : "Click to upload attachments"}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 bg-gray-100 -mx-6 -mb-6 p-4 rounded-b-lg">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
