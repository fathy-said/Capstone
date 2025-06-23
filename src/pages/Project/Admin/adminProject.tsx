import React, { useEffect } from 'react';
import { create } from 'zustand';

// Define interfaces for data structures
interface Project {
  id: string;
  name: string;
  supervisor: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface adminProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  activeTab: 'all' | 'pending' | 'approved';
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveTab: (tab: 'all' | 'pending' | 'approved') => void;
  updateProjectStatus: (id: string, status: 'approved' | 'rejected') => void;
}

// Zustand store for managing global state related to projects
const useadminProjectStore = create<adminProjectStore>((set) => ({
  projects: [],
  loading: false,
  error: null,
  activeTab: 'all',
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateProjectStatus: (id, status) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, status } : project
      ),
    })),
}));

const AdminProject: React.FC = () => {
  const {
    projects,
    loading,
    error,
    activeTab,
    setProjects,
    setLoading,
    setError,
    setActiveTab,
    updateProjectStatus,
  } = useadminProjectStore();


  // Simulate fetching project data from an API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const dummyProjects: Project[] = [
          {
            id: 'p1',
            name: 'Advanced Research on Quantum Computing Applications',
            supervisor: 'Dr. Alice Smith',
            description: 'This comprehensive project explores the fundamental principles and real-world applications of quantum computing technology. The research focuses on quantum algorithms, error correction methods, and practical implementations in various industries including cryptography, optimization, and simulation.',
            status: 'pending',
          },
          {
            id: 'p2',
            name: 'Artificial Intelligence in Medical Diagnosis and Treatment',
            supervisor: 'Prof. Bob Johnson',
            description: 'Developing advanced AI models and machine learning algorithms to assist healthcare professionals in early medical diagnosis and personalized treatment planning. This project includes deep learning for medical imaging, predictive analytics for patient outcomes, and integration with electronic health records.',
            status: 'approved',
          },
          {
            id: 'p3',
            name: 'Sustainable Energy Solutions for Future Generations',
            supervisor: 'Dr. Carol White',
            description: 'A comprehensive investigation into renewable energy sources, energy storage technologies, and sustainable practices. This project covers solar panel efficiency optimization, wind energy harvesting, battery technology improvements, and smart grid implementations for sustainable urban development.',
            status: 'pending',
          },
          {
            id: 'p4',
            name: 'Blockchain Technology for Supply Chain Management',
            supervisor: 'Dr. David Green',
            description: 'Implementing distributed ledger technology to enhance transparency, traceability, and efficiency in global supply chains. The project includes smart contract development, consensus mechanism optimization, and integration with IoT devices for real-time tracking and verification.',
            status: 'pending',
          },
          {
            id: 'p5',
            name: 'Natural Language Processing for Advanced Chatbot Systems',
            supervisor: 'Prof. Emily Brown',
            description: 'Building sophisticated NLP models using transformer architecture to improve conversational AI capabilities. This includes sentiment analysis, context understanding, multilingual support, and integration with knowledge bases for more accurate and helpful responses.',
            status: 'rejected',
          },
          {
            id: 'p6',
            name: 'Cybersecurity in Cloud Computing Environments',
            supervisor: 'Dr. Michael Davis',
            description: 'Developing advanced security frameworks and protocols for protecting cloud infrastructure and data. The project focuses on encryption algorithms, intrusion detection systems, zero-trust architecture implementation, and compliance with international security standards.',
            status: 'approved',
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 800));
        setProjects(dummyProjects);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [setProjects, setLoading, setError]);

  const handleDecision = async (projectId: string, decision: 'accept' | 'reject') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Update the project status in the Zustand store
      updateProjectStatus(projectId, decision === 'accept' ? 'approved' : 'rejected');
      console.log(`Project ${projectId} ${decision}ed successfully.`);
      setError(null);
    } catch (err) {
      setError(`Failed to ${decision} project ${projectId}.`);
      console.error(`Error ${decision}ing project:`, err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return project.status === 'pending';
    if (activeTab === 'approved') return project.status === 'approved';
    return false;
  });

  const getProjectCounts = () => {
    const all = projects.length;
    const pending = projects.filter(p => p.status === 'pending').length;
    const approved = projects.filter(p => p.status === 'approved').length;
    return { all, pending, approved };
  };

  const counts = getProjectCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Enhanced Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                activeTab === 'all'
                  ? 'bg-[#42A5f5] text-white shadow-blue-200'
                  : 'bg-white text-gray-700 hover:bg-[#42A5f5] hover:text-white border border-gray-200'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Projects
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === 'all' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {counts.all}
              </span>
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                activeTab === 'pending'
                  ? 'bg-[#42A5f5] text-white shadow-blue-200'
                  : 'bg-white text-gray-700 hover:bg-[#42A5f5] hover:text-white border border-gray-200'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending Approval
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === 'pending' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {counts.pending}
              </span>
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                activeTab === 'approved'
                  ? 'bg-[#42A5f5] text-white shadow-blue-200'
                  : 'bg-white text-gray-700 hover:bg-[#42A5f5] hover:text-white border border-gray-200'
              }`}
              onClick={() => setActiveTab('approved')}
            >
              Approved Projects
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === 'approved' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {counts.approved}
              </span>
            </button>
          </div>
          {/* Enhanced underline */}
          <div className="w-full h-1 bg-[#42A5f5] rounded-full"></div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-blue-700">Loading projects...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-red-800 font-medium">{error}</div>
          </div>
        )}

        {/* Projects Column */}
        <div className="space-y-6">
          {filteredProjects.length === 0 && !loading && !error && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <div className="text-xl text-gray-600 mb-2">No projects found</div>
              <div className="text-gray-500">No projects match the current filter criteria.</div>
            </div>
          )}

          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="p-8">
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {project.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold text-sm">
                          {project.supervisor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">{project.supervisor}</p>
                        <p className="text-gray-500 text-sm">Project Supervisor</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'pending' 
                      ? 'bg-orange-100 text-orange-800' 
                      : project.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  {project.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleDecision(project.id, 'reject')}
                        disabled={loading}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleDecision(project.id, 'accept')}
                        disabled={loading}
                        className="px-6 py-2 bg-[#42A5f5] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Accept
                      </button>
                    </>
                  )}
                  {project.status === 'approved' && (
                    <div className="flex items-center text-green-600 font-semibold">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Project Approved
                    </div>
                  )}
                  {project.status === 'rejected' && (
                    <div className="flex items-center text-red-600 font-semibold">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Project Rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProject;