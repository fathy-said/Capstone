import React from 'react';
import { X, GraduationCap, Users } from 'lucide-react';
import { Project } from './Project Types';

interface ProjectDetailsProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ isOpen, project, onClose }) => {
  if (!project) return null;

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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Popup Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-100 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors z-10"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Popup Content */}
        <div className="h-full overflow-y-auto p-6 pt-16">
          
          {/* Project Logo and Title */}
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mr-4">
              <div className="flex items-center justify-center">
                <GraduationCap size={32} className="text-[#42A5f5] mr-1" />
                <Users size={20} className="text-[#42A5f5]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#42A5f5] italic">Capstone</h2>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Description</h3>
            <div className="text-gray-600 leading-relaxed">
              {project.description}
            </div>
          </div>

          {/* Type Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Type</h3>
            <div className="ml-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(project.type)}`}>
                {project.type}
              </span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="ml-4 space-y-3">
              {project.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requests Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Requests</h3>
            <div className="ml-4">
              <span className="text-2xl font-bold text-blue-600">{project.requests}</span>
              <span className="text-gray-600 ml-2">active requests</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectDetails;