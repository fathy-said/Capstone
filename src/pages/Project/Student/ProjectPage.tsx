import React from 'react';

interface ProjectCardProps {
  supervisor: string;
  title: string;
  description: string;
  avatar: string;
  onView?: () => void;
  onRequest?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  supervisor, 
  title, 
  description, 
  avatar,
  onView,
  onRequest
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <img 
          src={avatar} 
          alt={supervisor} 
          className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{supervisor}</h2>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button 
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            onClick={onView}
          >
            View
          </button>
          <button 
            className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-6 py-2 rounded-md transition duration-200"
            onClick={onRequest}
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

// Sample project data
const projects = [
  {
    id: 1,
    supervisor: 'DR / Mohamed',
    title: 'Project name',
    description: 'project description................................................................................................................',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    supervisor: 'DR / Mohamed',
    title: 'Project name',
    description: 'project description................................................................................................................',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    supervisor: 'DR / Fatma',
    title: 'AI Research Project',
    description: 'project description................................................................................................................',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

const ProjectPage: React.FC = () => {
  const handleView = (id: number) => {
    console.log(`View project ${id}`);
  };

  const handleRequest = (id: number) => {
    console.log(`Request project ${id}`);
  };
  
  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Available Projects</h1>
        
        <div className="space-y-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              supervisor={project.supervisor}
              title={project.title}
              description={project.description}
              avatar={project.avatar}
              onView={() => handleView(project.id)}
              onRequest={() => handleRequest(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage; 