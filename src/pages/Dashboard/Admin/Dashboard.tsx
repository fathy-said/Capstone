import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { create } from 'zustand';
import ReactApexChart from 'react-apexcharts';
import { 
  Users, 
  GraduationCap, 
  FolderOpen, 
  TrendingUp, 
  Calendar,
  Award,
  RefreshCw,
  Filter,
  BarChart3,
  PieChart,
  Settings
} from 'lucide-react';

// Zustand store for admin dashboard state
interface AdminDashboardStore {
  selectedTeams: string[];
  dateRange: string;
  refreshCount: number;
  setSelectedTeams: (teams: string[]) => void;
  setDateRange: (range: string) => void;
  refresh: () => void;
}

const useAdminDashboardStore = create<AdminDashboardStore>((set) => ({
  selectedTeams: [],
  dateRange: 'all',
  refreshCount: 0,
  setSelectedTeams: (teams) => set({ selectedTeams: teams }),
  setDateRange: (range) => set({ dateRange: range }),
  refresh: () => set((state) => ({ refreshCount: state.refreshCount + 1 })),
}));

// Mock data based on your image
const mockData = {
  overviewStats: {
    numberOfTeams: 15,
    numberOfStudents: 250,
    numberOfProjects: 17,
    progressPerTeam: 75,
    meetingFrequency: 8.5,
    topStudents: 10,
  },
  studentsPerTeam: [
    { teamId: 1, students: 9 },
    { teamId: 2, students: 8 },
    { teamId: 3, students: 10 },
    { teamId: 4, students: 5 },
    { teamId: 5, students: 10 },
    { teamId: 6, students: 9 },
    { teamId: 7, students: 4 },
    { teamId: 8, students: 6 },
    { teamId: 9, students: 9 },
    { teamId: 10, students: 10 },
    { teamId: 11, students: 8 },
    { teamId: 12, students: 9 },
    { teamId: 13, students: 8 },
    { teamId: 14, students: 9 },
    { teamId: 15, students: 9 },
  ],
  studentAssignment: {
    assigned: 210,
    unassigned: 40,
    total: 250,
  },
  projectDistribution: {
    collegeProjects: 9,
    studentProjects: 8,
    total: 17,
  },
  teamProgress: [
    { teamId: 1, progress: 95 },
    { teamId: 2, progress: 20 },
    { teamId: 3, progress: 70 },
    { teamId: 4, progress: 40 },
    { teamId: 5, progress: 60 },
    { teamId: 6, progress: 100 },
    { teamId: 7, progress: 70 },
    { teamId: 8, progress: 80 },
    { teamId: 9, progress: 30 },
    { teamId: 10, progress: 50 },
    { teamId: 11, progress: 90 },
    { teamId: 12, progress: 70 },
    { teamId: 13, progress: 75 },
    { teamId: 14, progress: 80 },
    { teamId: 15, progress: 85 },
  ],
  meetingFrequency: [
    { teamId: 1, meetings: 7 },
    { teamId: 2, meetings: 2 },
    { teamId: 3, meetings: 6 },
    { teamId: 4, meetings: 4 },
    { teamId: 5, meetings: 10 },
    { teamId: 6, meetings: 7 },
    { teamId: 7, meetings: 3 },
    { teamId: 8, meetings: 8 },
    { teamId: 9, meetings: 5 },
    { teamId: 10, meetings: 9 },
    { teamId: 11, meetings: 6 },
    { teamId: 12, meetings: 5 },
    { teamId: 13, meetings: 4 },
    { teamId: 14, meetings: 8 },
    { teamId: 15, meetings: 3 },
  ],
  topStudents: [
    { studentId: 1, tasks: 2.5 },
    { studentId: 2, tasks: 1 },
    { studentId: 3, tasks: 3 },
    { studentId: 4, tasks: 2.5 },
    { studentId: 5, tasks: 1.5 },
    { studentId: 6, tasks: 4 },
    { studentId: 7, tasks: 3 },
    { studentId: 8, tasks: 2 },
    { studentId: 9, tasks: 3.5 },
    { studentId: 10, tasks: 2 },
  ],
};

const AdminDashboard: React.FC = () => {
  const { control } = useForm();
  const { selectedTeams, dateRange, refreshCount, setSelectedTeams, setDateRange, refresh } = useAdminDashboardStore();
  
  const [loading, setLoading] = useState(false);

  // Filter options
  const teamOptions = Array.from({ length: 15 }, (_, i) => ({
    value: `team-${i + 1}`,
    label: `Team ${i + 1}`,
  }));

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
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
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.studentsPerTeam.map(item => item.teamId.toString()),
      title: { text: 'Team ID' },
    },
    yaxis: {
      title: { text: 'Number of Students' },
      max: 12,
    },
    colors: ['#8B5CF6'],
    title: {
      text: 'Number of Students Per Team',
      align: 'center' as const,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1F2937'
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: '#E5E7EB',
    },
  };

  const teamProgressOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.teamProgress.map(item => item.teamId.toString()),
      title: { text: 'Team ID' },
    },
    yaxis: {
      title: { text: 'Completion Rate' },
      max: 100,
    },
    colors: ['#10B981'],
    title: {
      text: 'Team Progress',
      align: 'center' as const,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1F2937'
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: '#E5E7EB',
    },
  };

  const meetingFrequencyOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.meetingFrequency.map(item => item.teamId.toString()),
      title: { text: 'Team ID' },
    },
    yaxis: {
      title: { text: 'Number of Meetings' },
      max: 12,
    },
    colors: ['#3B82F6'],
    title: {
      text: 'Meeting Frequency Per Team',
      align: 'center' as const,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1F2937'
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: '#E5E7EB',
    },
  };

  const topStudentsOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: mockData.topStudents.map(item => item.studentId.toString()),
      title: { text: 'Student ID' },
    },
    yaxis: {
      title: { text: 'Number of Completed Tasks' },
      max: 5,
    },
    colors: ['#10B981'],
    title: {
      text: 'Top 10 Students by Task Contributions',
      align: 'center' as const,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1F2937'
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: '#E5E7EB',
    },
  };

  // Chart series
  const studentsPerTeamSeries = [{
    name: 'Students',
    data: mockData.studentsPerTeam.map(item => item.students),
  }];

  const teamProgressSeries = [{
    name: 'Progress %',
    data: mockData.teamProgress.map(item => item.progress),
  }];

  const meetingFrequencySeries = [{
    name: 'Meetings',
    data: mockData.meetingFrequency.map(item => item.meetings),
  }];

  const topStudentsSeries = [{
    name: 'Completed Tasks',
    data: mockData.topStudents.map(item => item.tasks),
  }];

  // Overview Card Component
  const OverviewCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    bgColor 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    bgColor: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  // Donut Chart Component
  const DonutChart = ({ 
    title, 
    total, 
    data, 
    colors, 
    labels 
  }: {
    title: string;
    total: number;
    data: number[];
    colors: string[];
    labels: string[];
  }) => {
    const options = {
      chart: {
        type: 'donut' as const,
        height: 200,
      },
      labels,
      colors,
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
        },
      },
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <ReactApexChart
              options={options}
              series={data}
              type="donut"
              height={200}
            />
          </div>
          <div className="ml-6">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-sm text-gray-500">{title}</div>
            </div>
            <div className="space-y-2">
              {labels.map((label, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: colors[index] }}
                  />
                  <span className="text-gray-600">{label}</span>
                  <span className="ml-auto font-medium">{data[index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Comprehensive overview of teams, students, and project statistics</p>
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
                        setSelectedTeams(selected?.map(s => s.value) || []);
                      }}
                    />
                  )}
                />
              </div>
              
              <div className="w-full sm:w-48">
                <Controller
                  name="dateRange"
                  control={control}
                  defaultValue={dateRangeOptions.find(opt => opt.value === dateRange)}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={dateRangeOptions}
                      placeholder="Date range..."
                      className="text-sm"
                      onChange={(selected) => {
                        field.onChange(selected);
                        setDateRange(selected?.value || 'all');
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
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Overview Cards */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Statistics Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockData.overviewStats.numberOfTeams}</div>
                <div className="text-sm text-blue-100">Number of Teams</div>
              </div>
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockData.overviewStats.numberOfStudents}</div>
                <div className="text-sm text-blue-100">Number of Students</div>
              </div>
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockData.overviewStats.numberOfProjects}</div>
                <div className="text-sm text-blue-100">Number of Projects</div>
              </div>
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockData.overviewStats.progressPerTeam}%</div>
                <div className="text-sm text-blue-100">Progress per Team</div>
              </div>
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{mockData.overviewStats.meetingFrequency}</div>
                <div className="text-sm text-blue-100">Meeting Frequency by Team</div>
              </div>
              <div className="bg-[#42A5f5]  rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">Top {mockData.overviewStats.topStudents}</div>
                <div className="text-sm text-blue-100">Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Donut Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Students Per Team Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          </div>

          {/* Donut Charts */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DonutChart
              title="Total Students"
              total={mockData.studentAssignment.total}
              data={[mockData.studentAssignment.assigned, mockData.studentAssignment.unassigned]}
              colors={['#3B82F6', '#E5E7EB']}
              labels={['Assigned Students', 'Unassigned Students']}
            />
            
            <DonutChart
              title="Total Projects"
              total={mockData.projectDistribution.total}
              data={[mockData.projectDistribution.collegeProjects, mockData.projectDistribution.studentProjects]}
              colors={['#3B82F6', '#8B5CF6']}
              labels={['College Projects', 'Students Projects']}
            />
          </div>
        </div>

        {/* Additional Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        </div>

        {/* Top Students Chart - Full Width */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <ReactApexChart
              options={topStudentsOptions}
              series={topStudentsSeries}
              type="bar"
              height={350}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Admin Dashboard last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;