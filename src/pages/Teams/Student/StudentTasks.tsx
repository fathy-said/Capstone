import { useState } from "react";
import TaskCard from "./components/TaskCard";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import TaskUpdateForm from "./components/TaskUpdateForm";
import IconAtom from "../../../components/IconAtom/Icon-Atom";

interface Task {
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
  startDate: string;
  endDate: string;
}

function TasksPage() {
  // State for task form modal
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  // State for task details modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Sample data to mimic the tasks shown in the image
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "wireframe",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "my-task",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
    },
    {
      id: "2",
      title: "wireframe",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "prof-task",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "3",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "to-do",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "4",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "in-progress",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "5",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "in-review",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "6",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "completed",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "7",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "my-task",
    },
    {
      id: "8",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "prof-task",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "9",
      title: "wireframe",
      startDate: "2025/02/24",
      endDate: "2025/02/24",
      description:
        "Brainstorming brings team members'diverse experience into play. brainstorming brings team members'diverse experience into play.",
      dueDate: "2025/02/24",
      status: "to-do",
      assignedUsers: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
  ]);

  const handleMoreDetails = (taskId: string) => {
    // Find the task with the given ID
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };
  const handleUpdateDetails = (taskId: string) => {
    // Find the task with the given ID
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsEditing(true);
    }
  };

  // Close task details is now handled inline in the JSX

  const handleUpdateTask = (
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
  ) => {
    // Update the task in the tasks array
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update the selected task if it's currently being viewed
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask({ ...selectedTask, ...updatedTask });
    }
  };

  const handleUpload = (taskId: string) => {
    console.log("Upload for task", taskId);
    // Implement upload functionality
  };

  const handleReview = (taskId: string) => {
    console.log("Review task", taskId);
    // Implement review functionality
  };

  const handleAddTask = () => {
    setIsTaskFormOpen(true);
  };

  const handleCancelTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  const handleSubmitTask = (newTask: {
    title: string;
    dueDate: string;
    description: string;
    attachments?: File[];
  }) => {
    // Generate a unique ID for the new task
    const taskId = `task-${Date.now()}`;

    // Create a new task object
    const task: Task = {
      id: taskId,
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      startDate: newTask.dueDate,
      endDate: newTask.dueDate,
      status: "my-task", // New tasks start in 'my-task' column
    };

    // Add the new task to the tasks array
    setTasks([task, ...tasks]);

    // Close the form
    setIsTaskFormOpen(false);
  };

  // Create Add Task button component to pass to TaskBoard
  const addTaskButton = (
    <button
      onClick={handleAddTask}
      className="flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none mr-2"
    >
      <IconAtom className="h-4 w-4" name="Plus" />
    </button>
  );

  const renderTaskCard = (task: Task) => (
    <TaskCard
      key={task.id}
      title={task.title}
      description={task.description}
      dueDate={task.dueDate}
      assignedUsers={task.assignedUsers}
      status={task.status}
      onMoreDetails={() => handleMoreDetails(task.id)}
      onUpload={() => handleUpload(task.id)}
      onReview={() => handleReview(task.id)}
      onUpdate={() => handleUpdateDetails(task.id)} // Open the task details modal for updating
      startDate={task.startDate}
      endDate={task.endDate}
    />
  );

  return (
    <div className="p-6 h-full bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Task Board</h1>
      </div>
      <div className="h-[calc(100vh-120px)]">
        <TaskBoard
          tasks={tasks}
          renderTaskCard={renderTaskCard}
          addTaskButton={addTaskButton}
        />
      </div>

      {/* Task Form Modal */}
      {isTaskFormOpen && (
        <TaskForm
          onSubmit={handleSubmitTask as any}
          onCancel={handleCancelTaskForm}
        />
      )}

      {/* Task Details or Update Modal */}
      {selectedTask && !isEditing && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={() => setIsEditing(true)}
        />
      )}
      {/* Task Update Modal */}
      {selectedTask && isEditing && (
        <TaskUpdateForm
          task={selectedTask}
          onClose={() => {
            setIsEditing(false);
            setSelectedTask(null);
          }}
          onUpdate={(taskId, updatedTask) => {
            handleUpdateTask(taskId, updatedTask);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default TasksPage;
