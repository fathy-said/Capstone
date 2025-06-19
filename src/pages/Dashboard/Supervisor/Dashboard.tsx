import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { create } from "zustand";
import ReactApexChart from "react-apexcharts";
import {
  Users,
  TrendingUp,
  Calendar,
  UserCheck,
  RefreshCw,
} from "lucide-react";

// Zustand store for dashboard state
interface DashboardStore {
  selectedTeams: string[];
  dateRange: string;
  refreshCount: number;
  setSelectedTeams: (teams: string[]) => void;
  setDateRange: (range: string) => void;
  refresh: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  selectedTeams: [],
  dateRange: "last30days",
  refreshCount: 0,
  setSelectedTeams: (teams) => set({ selectedTeams: teams }),
  setDateRange: (range) => set({ dateRange: range }),
  refresh: () => set((state) => ({ refreshCount: state.refreshCount + 1 })),
}));

// Mock data based on your image
const mockData = {
  totalTeams: 15,
  studentsPerTeam: [
    { teamId: 1, students: 10 },
    { teamId: 2, students: 8 },
    { teamId: 3, students: 4 },
    { teamId: 4, students: 9 },
    { teamId: 5, students: 6 },
    { teamId: 6, students: 10 },
  ],
  teamProgress: [
    { teamId: 1, progress: 100 },
    { teamId: 2, progress: 72 },
    { teamId: 3, progress: 30 },
    { teamId: 4, progress: 82 },
    { teamId: 5, progress: 50 },
    { teamId: 6, progress: 90 },
  ],
  meetingFrequency: [
    { teamId: 1, meetings: 10 },
    { teamId: 2, meetings: 7 },
    { teamId: 3, meetings: 3 },
    { teamId: 4, meetings: 8 },
    { teamId: 5, meetings: 5 },
    { teamId: 6, meetings: 9 },
  ],
  attendanceData: [
    { teamId: 1, attended: 2, absent: 3 },
    { teamId: 2, attended: 2, absent: 2 },
    { teamId: 3, attended: 4, absent: 3 },
    { teamId: 4, attended: 4, absent: 0 },
    { teamId: 5, attended: 2, absent: 0 },
    { teamId: 6, attended: 3, absent: 0 },
    { teamId: 7, attended: 5, absent: 2 },
    { teamId: 8, attended: 2, absent: 2 },
    { teamId: 9, attended: 2, absent: 6 },
    { teamId: 10, attended: 2, absent: 4 },
  ],
};

const Dashboard: React.FC = () => {
  const { control } = useForm();
  const {
    selectedTeams,
    dateRange,
    refreshCount,
    setSelectedTeams,
    setDateRange,
    refresh,
  } = useDashboardStore();

  const [loading, setLoading] = useState(false);

  // Team options for select
  const teamOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `team-${i + 1}`,
    label: `Team ${i + 1}`,
  }));

  const dateRangeOptions = [
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "last90days", label: "Last 90 Days" },
    { value: "thisyear", label: "This Year" },
  ];

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [refreshCount, selectedTeams, dateRange]);

  // Chart configurations
  const studentsPerTeamOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.studentsPerTeam.map((item) => `Team ${item.teamId}`),
      title: { text: "Team ID" },
    },
    yaxis: {
      title: { text: "Number of Students" },
    },
    colors: ["#8B5CF6"],
    title: {
      text: "Number of Students Per Team",
      align: "center" as const,
    },
  };

  const teamProgressOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.teamProgress.map((item) => `Team ${item.teamId}`),
      title: { text: "Team ID" },
    },
    yaxis: {
      title: { text: "Complete Rate" },
      max: 100,
    },
    colors: ["#10B981"],
    title: {
      text: "Team Progress",
      align: "center" as const,
    },
  };

  const meetingFrequencyOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.meetingFrequency.map(
        (item) => `Team ${item.teamId}`
      ),
      title: { text: "Team ID" },
    },
    yaxis: {
      title: { text: "Number of Meetings" },
    },
    colors: ["#3B82F6"],
    title: {
      text: "Meeting Frequency Per Team",
      align: "center" as const,
    },
  };

  const attendanceOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    xaxis: {
      categories: mockData.attendanceData.map((item) => `${item.teamId}`),
      title: { text: "Team ID" },
    },
    yaxis: {
      title: { text: "Number of Students" },
    },
    legend: {
      position: "top" as const,
      horizontalAlign: "left" as const,
    },
    colors: ["#3B82F6", "#EF4444"],
    title: {
      text: "Meeting Attendance Per Team",
      align: "center" as const,
    },
  };

  // Chart series data
  const studentsPerTeamSeries = [
    {
      name: "Students",
      data: mockData.studentsPerTeam.map((item) => item.students),
    },
  ];

  const teamProgressSeries = [
    {
      name: "Progress %",
      data: mockData.teamProgress.map((item) => item.progress),
    },
  ];

  const meetingFrequencySeries = [
    {
      name: "Meetings",
      data: mockData.meetingFrequency.map((item) => item.meetings),
    },
  ];

  const attendanceSeries = [
    {
      name: "Attended",
      data: mockData.attendanceData.map((item) => item.attended),
    },
    {
      name: "Absent",
      data: mockData.attendanceData.map((item) => item.absent),
    },
  ];

  const averageProgress = Math.round(
    mockData.teamProgress.reduce((sum, team) => sum + team.progress, 0) /
      mockData.teamProgress.length
  );

  const totalMeetings = mockData.meetingFrequency.reduce(
    (sum, team) => sum + team.meetings,
    0
  );

  const averageAttendance = Math.round(
    (mockData.attendanceData.reduce((sum, team) => sum + team.attended, 0) /
      mockData.attendanceData.reduce(
        (sum, team) => sum + team.attended + team.absent,
        0
      )) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Team Statistics Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor team progress, attendance, and meeting statistics
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <Controller
                  name="teams"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={teamOptions}
                      placeholder="Filter by teams..."
                      className="text-sm"
                      onChange={(selected) => {
                        field.onChange(selected);
                        setSelectedTeams(selected?.map((s) => s.value) || []);
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
                        setDateRange(selected?.value || "last30days");
                      }}
                    />
                  )}
                />
              </div>

              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#42A5f5] hover:bg-[3994e4] text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Number of Teams
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockData.totalTeams}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Average Progress
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {averageProgress}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Meetings
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalMeetings}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Avg Attendance
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {averageAttendance}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students Per Team Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={studentsPerTeamOptions}
                series={studentsPerTeamSeries}
                type="bar"
                height={350}
              />
            )}
          </div>

          {/* Team Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={teamProgressOptions}
                series={teamProgressSeries}
                type="bar"
                height={350}
              />
            )}
          </div>

          {/* Meeting Frequency Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={meetingFrequencyOptions}
                series={meetingFrequencySeries}
                type="bar"
                height={350}
              />
            )}
          </div>

          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <ReactApexChart
                options={attendanceOptions}
                series={attendanceSeries}
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

export default Dashboard;
