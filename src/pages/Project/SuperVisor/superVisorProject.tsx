import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { Project, NewProject } from './Project Types';
import CreateProject from './CreateProject';
import ProjectDetails from './ProjectDetails';

// Mock data - replace with your actual data source
const mockProjects: Project[] = [
  { 
    id: 1, 
    name: 'Company-managed business', 
    type: 'Medical', 
    requests: 3,
    description: 'A comprehensive medical management system designed to streamline healthcare operations and improve patient care delivery through advanced technology solutions.',
    skills: ['Data Analyst', 'Frontend developer', 'Backend developer', 'DevOps Engineer', 'UI/UX developer', 'Software Tester']
  },
  { 
    id: 2, 
    name: 'Company-managed business', 
    type: 'Academic', 
    requests: 3,
    description: 'An innovative academic platform that enhances learning experiences through interactive content and collaborative tools for students and educators.',
    skills: ['Data Analyst', 'Frontend developer', 'Backend developer', 'DevOps Engineer', 'UI/UX developer', 'Software Tester']
  },
  { 
    id: 3, 
    name: 'Company-managed business', 
    type: 'Team', 
    requests: 3,
    description: 'A collaborative team management solution that optimizes workflow efficiency and communication across distributed teams.',
    skills: ['Data Analyst', 'Frontend developer', 'Backend developer', 'DevOps Engineer', 'UI/UX developer', 'Software Tester']
  },
  { 
    id: 4, 
    name: 'Company-managed business', 
    type: 'Team', 
    requests: 3,
    description: 'An advanced project coordination platform that brings teams together with powerful tools for planning, execution, and monitoring.',
    skills: ['Data Analyst', 'Frontend developer', 'Backend developer', 'DevOps Engineer', 'UI/UX developer', 'Software Tester']
  },
];

const SupervisorProject: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  // Event handlers
  const handleCreateProject = () => {
    setIsCreatePopupOpen(true);
  };

  const handleMoreDetails = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsDetailsPopupOpen(true);
    }
  };

  const handleCloseDetailsPopup = () => {
    setIsDetailsPopupOpen(false);
    setSelectedProject(null);
  };

  const handleCloseCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCreateNewProject = (newProject: NewProject) => {
    const projectData: Project = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      name: newProject.name,
      type: newProject.type as 'Medical' | 'Academic' | 'Team',
      requests: 0,
      description: newProject.description,
      skills: ['Data Analyst', 'Frontend developer', 'Backend developer'] // Default skills
    };
    
    setProjects([...projects, projectData]);
    setIsCreatePopupOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Medical':
        return 'text-green-700 bg-green-50 border border-green-200';
      case 'Academic':
        return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'Team':
        return 'text-purple-700 bg-purple-50 border border-purple-200';
      default:
        return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#42A5f5] hover:bg-[3994e4] text-white p-2 rounded-lg transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Create Project Button */}
          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 bg-[#42A5f5] hover:bg-[3994e4] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus size={20} />
            Create project
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-4">
              <div className="text-left">
                <h3 className="text-gray-900 font-semibold text-lg">ID</h3>
              </div>
              <div className="text-left col-span-2">
                <h3 className="text-gray-900 font-semibold text-lg">Name</h3>
              </div>
              <div className="text-left">
                <h3 className="text-gray-900 font-semibold text-lg">Type</h3>
              </div>
              <div className="text-left">
                <h3 className="text-gray-900 font-semibold text-lg">Request</h3>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredProjects.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <p className="text-lg">No projects found</p>
                <p className="text-sm mt-1">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="grid grid-cols-5 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors"
                >
                  {/* ID */}
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium text-lg">
                      {index + 1}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-2 flex items-center">
                    <span className="text-gray-900 font-medium">
                      {project.name}
                    </span>
                  </div>

                  {/* Type */}
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                  </div>

                  {/* Request & Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium text-lg">
                      {project.requests}
                    </span>
                    <button
                      onClick={() => handleMoreDetails(project.id)}
                      className="text-[#42A5f5] hover:bg-[3994e4] font-medium hover:underline transition-colors"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        {filteredProjects.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            <p>Showing {filteredProjects.length} of {projects.length} projects</p>
          </div>
        )}
      </div>

      {/* Create Project Popup */}
      <CreateProject
        isOpen={isCreatePopupOpen}
        onClose={handleCloseCreatePopup}
        onCreateProject={handleCreateNewProject}
      />

      {/* Project Details Popup */}
      <ProjectDetails
        isOpen={isDetailsPopupOpen}
        project={selectedProject}
        onClose={handleCloseDetailsPopup}
      />
    </div>
  );
};

export default SupervisorProject;