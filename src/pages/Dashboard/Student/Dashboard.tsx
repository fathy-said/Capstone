import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { create } from "zustand";
import ReactApexChart from "react-apexcharts";
import { CheckCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";

// Zustand store for dashboard state
interface StudentDashboardStore {
  selectedSubjects: string[];
  dateRange: string;
  refreshCount: number;
  setSelectedSubjects: (subjects: string[]) => void;
  setDateRange: (range: string) => void;
  refresh: () => void;
}

const useStudentDashboardStore = create<StudentDashboardStore>((set) => ({
  selectedSubjects: [],
  dateRange: "all",
  refreshCount: 0,
  setSelectedSubjects: (subjects) => set({ selectedSubjects: subjects }),
  setDateRange: (range) => set({ dateRange: range }),
  refresh: () => set((state) => ({ refreshCount: state.refreshCount + 1 })),
}));

// Mock data based on your image
const mockData = {
  taskStats: {
    completed: {
      count: 53,
      percentage: 53,
      startDate: "20 Nov",
      endDate: "20 Nov",
    },
    assigned: {
      count: 14,
      percentage: 14,
      startDate: "20 Nov",
      endDate: "20 Nov",
    },
    pending: { count: 33, percentage: 33, startDate: "20 Nov", endDate: null },
  },
  projectProgress: {
    currentProgress: 50,
    timeline: [
      { date: "11/2024", progress: 0 },
      { date: "12/2024", progress: 40 },
      { date: "1/2025", progress: 55 },
      { date: "2/2025", progress: 80 },
      { date: "3/2025", progress: 80 },
      { date: "4/2025", progress: 40 },
      { date: "5/2025", progress: 100 },
    ],
  },
  taskStatusDistribution: {
    completed: 40,
    inProgress: 25,
    pending: 35,
  },
  timeDistribution: {
    categories: ["-300", "-200", "-100", "0", "100", "200"],
    data: [1, 5, 7, 13, 6, 4],
    curve: [1, 3, 5, 8, 6, 3], // Overlay curve data
  },
};

const StudentDashboard: React.FC = () => {
  const { control } = useForm();
  const {
    selectedSubjects,
    dateRange,
    refreshCount,
    setSelectedSubjects,
    setDateRange,
    refresh,
  } = useStudentDashboardStore();

  const [loading, setLoading] = useState(false);

  // Subject options for select
  const subjectOptions = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "programming", label: "Programming" },
  ];

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "thisWeek", label: "This Week" },
    { value: "thisMonth", label: "This Month" },
    { value: "lastMonth", label: "Last Month" },
  ];

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [refreshCount, selectedSubjects, dateRange]);

  // Cumulative Task Completion Chart Options
  const cumulativeTaskOptions = {
    chart: {
      type: "line" as const,
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    markers: {
      size: 6,
      colors: ["#3B82F6"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    xaxis: {
      categories: mockData.projectProgress.timeline.map((item) => item.date),
      title: { text: "Month" },
    },
    yaxis: {
      title: { text: "Completion Rate (%)" },
      min: 0,
      max: 100,
    },
    colors: ["#3B82F6"],
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "#E5E7EB",
    },
    title: {
      text: "Cumulative Task Completion Over Time",
      align: "center" as const,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#1F2937",
      },
    },
  };

  // Task Status Distribution (Pie Chart)
  const taskDistributionOptions = {
    chart: {
      type: "pie" as const,
      height: 350,
    },
    labels: ["Completed", "In Progress", "Pending"],
    colors: ["#10B981", "#3B82F6", "#EF4444"],
    legend: {
      position: "right" as const,
      offsetY: 50,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return Math.round(val) + "%";
      },
    },
    title: {
      text: "Task Status Distribution",
      align: "center" as const,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#1F2937",
      },
    },
  };

  // Time Distribution Chart (Histogram with Curve)
  const timeDistributionOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.timeDistribution.categories,
      title: { text: "Days to Complete Task" },
    },
    yaxis: {
      title: { text: "Number of Tasks" },
    },
    colors: ["#8B5CF6"],
    title: {
      text: "Distribution of Time Taken to Complete Tasks",
      align: "center" as const,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#1F2937",
      },
    },
    annotations: {
      points: mockData.timeDistribution.categories.map((cat, index) => ({
        x: cat,
        y: mockData.timeDistribution.curve[index],
        marker: {
          size: 4,
          fillColor: "#EC4899",
          strokeColor: "#EC4899",
        },
      })),
    },
  };

  const cumulativeTaskSeries = [
    {
      name: "Completion Rate",
      data: mockData.projectProgress.timeline.map((item) => item.progress),
    },
  ];

  const taskDistributionSeries = [
    mockData.taskStatusDistribution.completed,
    mockData.taskStatusDistribution.inProgress,
    mockData.taskStatusDistribution.pending,
  ];

  const timeDistributionSeries = [
    {
      name: "Number of Tasks",
      data: mockData.timeDistribution.data,
    },
  ];

  const TaskCard = ({
    title,
    percentage,
    startDate,
    endDate,
    icon: Icon,
    color,
    bgColor,
  }: {
    title: string;
    percentage: number;
    startDate: string;
    endDate?: string;
    icon: any;
    color: string;
    bgColor: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div
          className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-900">
            {percentage}%
          </span>
          <span className="text-sm text-gray-500">completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${color.replace(
              "text-",
              "bg-"
            )}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <div className="flex justify-between">
          <span>Start Date: {startDate}</span>
          {endDate && <span>End Date: {endDate}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Student Dashboard
              </h1>
              <p className="text-gray-600">
                Track your academic progress and task completion
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <Controller
                  name="subjects"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={subjectOptions}
                      placeholder="Filter by subjects..."
                      className="text-sm"
                      onChange={(selected) => {
                        field.onChange(selected);
                        setSelectedSubjects(
                          selected?.map((s) => s.value) || []
                        );
                      }}
                    />
                  )}
                />
              </div>

              <div className="w-full sm:w-48">
                <Controller
                  name="dateRange"
                  control={control}
                  defaultValue={dateRangeOptions.find(
                    (opt) => opt.value === dateRange
                  )}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={dateRangeOptions}
                      placeholder="Date range..."
                      className="text-sm"
                      onChange={(selected) => {
                        field.onChange(selected);
                        setDateRange(selected?.value || "all");
                      }}
                    />
                  )}
                />
              </div>

              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#42A5f5]  text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Task Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TaskCard
            title="Task Completed"
            percentage={mockData.taskStats.completed.percentage}
            startDate={mockData.taskStats.completed.startDate}
            endDate={mockData.taskStats.completed.endDate}
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100"
          />

          <TaskCard
            title="Task Assigned"
            percentage={mockData.taskStats.assigned.percentage}
            startDate={mockData.taskStats.assigned.startDate}
            endDate={mockData.taskStats.assigned.endDate}
            icon={Clock}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />

          <TaskCard
            title="Task Pending to Assign"
            percentage={mockData.taskStats.pending.percentage}
            startDate={mockData.taskStats.pending.startDate}
            icon={AlertCircle}
            color="text-red-600"
            bgColor="bg-red-100"
          />
        </div>

        {/* Project Progress Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Project Progress
          </h3>
          <div className="relative">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              {mockData.projectProgress.timeline.map((item, index) => (
                <span key={index}>{item.date}</span>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-[#42A5f5]  h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{
                  width: `${mockData.projectProgress.currentProgress}%`,
                }}
              >
                <span className="text-white text-sm font-medium">
                  {mockData.projectProgress.currentProgress}%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>Completion Rate (%)</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cumulative Task Completion Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={cumulativeTaskOptions}
                series={cumulativeTaskSeries}
                type="line"
                height={350}
              />
            )}
          </div>

          {/* Task Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={taskDistributionOptions}
                series={taskDistributionSeries}
                type="pie"
                height={350}
              />
            )}
          </div>

          {/* Time Distribution Chart - Full Width */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={timeDistributionOptions}
                series={timeDistributionSeries}
                type="bar"
                height={350}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dashboard last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
