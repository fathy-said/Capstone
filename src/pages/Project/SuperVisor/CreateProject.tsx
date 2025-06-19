import React, { useState } from 'react';
import { X, Paperclip } from 'lucide-react';
import { NewProject } from './Project Types';

interface CreateProjectProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: NewProject) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ isOpen, onClose, onCreateProject }) => {
  const [newProject, setNewProject] = useState<NewProject>({
    name: '',
    type: '',
    description: ''
  });

  const handleInputChange = (field: keyof NewProject, value: string) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (newProject.name && newProject.type && newProject.description) {
      onCreateProject(newProject);
      // Reset form
      setNewProject({ name: '', type: '', description: '' });
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setNewProject({ name: '', type: '', description: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Popup Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-gray-100 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors z-10"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Popup Content */}
        <div className="h-full overflow-y-auto p-6 pt-16 flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#42A5f5]">New project</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mt-2"></div>
          </div>

          {/* Form Container */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
            
            {/* Project Name */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg font-semibold mb-3">
                Project Name
              </label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter project name"
              />
            </div>

            {/* Type */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg font-semibold mb-3">
                Type
              </label>
              <input
                type="text"
                value={newProject.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter project type (e.g., Medical, Academic, Team)"
              />
            </div>

            {/* Project Description */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg font-semibold mb-3">
                Project Description
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Start writing here....."
              />
            </div>

            {/* Attachments */}
            <div className="mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <div className="flex items-center justify-center text-gray-500">
                  <span className="text-lg mr-2">Attachments</span>
                  <Paperclip size={24} className="text-red-400" />
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleClose}
              className="flex-1 bg-white text-gray-800 border border-gray-300 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newProject.name || !newProject.type || !newProject.description}
              className="flex-1 bg-[#42A5f5] hover:bg-[3994e4] text-white py-4 rounded-xl font-semibold text-lg disabled:cursor-not-allowed transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;