import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreateTeamPanel from '../../../components/CreateTeamPanel';
import { useUtils } from '../../../store/utils';

interface ProjectCardProps {
  id: number;
  userName: string;
  projectName: string;
  description: string;
  avatar: string;
}

// ProjectRequestPopup Component
const ProjectRequestPopup: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onAccept: () => void;
  onReject: () => void;
  project: {
    id: number;
    userName: string;
    projectName: string;
    description: string;
    avatar: string;
  } | null;
}> = ({ isOpen, onClose, onAccept, onReject, project }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const { sideMenuIsOpen } = useUtils();

  useEffect(() => {
    if (isOpen) {
      setIsPanelVisible(true);
      // Prevent body scrolling when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      // Delay hiding the panel to allow animation to complete
      const timer = setTimeout(() => {
        setIsPanelVisible(false);
        // Restore body scrolling
        document.body.style.overflow = 'auto';
      }, 400); // Increased timeout for smoother transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isPanelVisible && !isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] transition-all duration-400 ease-in-out"
      style={{ 
        opacity: isOpen ? '1' : '0',
        pointerEvents: isOpen ? 'auto' : 'none',
        transitionDelay: isOpen ? '0ms' : '200ms' // Delay opacity change when closing
      }}
    >
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-400 ease-in-out"
        onClick={onClose}
        style={{ 
          opacity: isOpen ? '1' : '0',
          transitionDelay: isOpen ? '0ms' : '100ms' // Slight delay for overlay fade
        }}
      ></div>
      
      <div 
        className="fixed top-0 right-0 w-full max-w-lg bg-gray-100 transform transition-all duration-400 ease-in-out shadow-xl"
        style={{ 
          height: '100vh', // Full viewport height
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionDelay: isOpen ? '0ms' : '0ms' // No delay for transform when closing
        }}
      >
        {/* Single scrollable container for all content */}
        <div className="h-full overflow-y-auto">
          <div className="p-8 relative">
            {/* Close button - repositioned to top right corner */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 z-[101] bg-white rounded-full p-3 shadow-lg transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Supervisor info */}
            <div className="mt-8 flex flex-col items-center">
              <img 
                src={project.avatar} 
                alt={project.userName} 
                className="w-28 h-28 rounded-full object-cover"
              />
              <div className="mt-4 text-center">
                <h2 className="text-3xl font-medium text-black">supervisor</h2>
                <p className="text-xl text-gray-600 mt-1">Doctor name</p>
              </div>
            </div>
            
            {/* Project info */}
            <div className="mt-12">
              <h3 className="text-4xl font-bold text-black mb-6">{project.projectName}</h3>
              <p className="text-lg text-gray-600">
                {project.description}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="mt-auto flex justify-between pt-6">
              <button
                onClick={onAccept}
                className="bg-[#42A5F5] hover:bg-[#3994e4] text-white text-xl font-medium py-3 px-12 rounded-md transition-all duration-200"
              >
                Accept
              </button>
              <button
                onClick={onReject}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 text-xl font-medium py-3 px-12 rounded-md transition-all duration-200"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ id, userName, projectName, description, avatar }) => {
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mb-3">
          <img 
            src={avatar} 
            alt={userName} 
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{userName}</h3>
            <h4 className="text-lg font-semibold">{projectName}</h4>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex justify-end">
          <button 
            className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-6 py-2 rounded-md transition duration-200"
            onClick={() => setIsRequestPopupOpen(true)}
          >
            Request
          </button>
        </div>
      </div>
      
      {/* Project Request Popup */}
      <ProjectRequestPopup
        isOpen={isRequestPopupOpen}
        onClose={() => setIsRequestPopupOpen(false)}
        onAccept={() => {
          console.log(`Accepted project ${id}`);
          setIsRequestPopupOpen(false);
        }}
        onReject={() => {
          console.log(`Rejected project ${id}`);
          setIsRequestPopupOpen(false);
        }}
        project={{ id, userName, projectName, description, avatar }}
      />
    </div>
  );
};

// TeamRequestPanel Component
const TeamRequestPanel: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  team: {
    id: number;
    teamName: string;
    teamLeader: string;
    description: string;
    logo: string;
  } | null;
}> = ({ isOpen, onClose, team }) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const { sideMenuIsOpen } = useUtils();

  useEffect(() => {
    if (isOpen) {
      setIsPanelVisible(true);
      // Prevent body scrolling when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      // Delay hiding the panel to allow animation to complete
      const timer = setTimeout(() => {
        setIsPanelVisible(false);
        // Restore body scrolling
        document.body.style.overflow = 'auto';
      }, 400); // Increased timeout for smoother transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isPanelVisible && !isOpen || !team) return null;

  // Mock data for the supervisor and team members
  const supervisor = {
    name: "Dr. Ahmed Mohamed El-syed Mahmoud",
    university: "Damanhur University",
    faculty: "Faculty of Computers and Information",
    department: "Information Technology department",
    qualifications: [
      {
        degree: "Ph.D. degree in information systems, Faculty of Computers and Information, Mansoura University, Jan. 2022",
      },
      {
        degree: "Master degree of Information Systems, Faculty of Computers and Informatics, Mansura University, Jan. 2018",
      },
      {
        degree: "The graduation project target was: Analysis and design database to Urology Hospital, Mansura (Excellent grade)",
      }
    ],
    avatar: "https://randomuser.me/api/portraits/men/35.jpg"
  };

  const teamMembers = [
    { id: "6641CS", name: "Mostafa Ahmed", email: "@gmail.com", section: "CS", role: "Frontend" },
    { id: "8242IT", name: "Nour Mohamed", email: "@gmail.com", section: "IT", role: "UI/UX" },
    { id: "6641CS", name: "Ahmed Mohamed", email: "@gmail.com", section: "CS", role: "Data analyst" },
    { id: "7242IT", name: "Mohamed Ali", email: "@gmail.com", section: "IT", role: "Backend" },
    { id: "541CS", name: "Ahmed Alaa", email: "@gmail.com", section: "CS", role: "Flutter" },
    { id: "541CS", name: "Ahmed Alaa", email: "@gmail.com", section: "CS", role: "Flutter" },
    { id: "6641CS", name: "Mostafa Ahmed", email: "@gmail.com", section: "CS", role: "Frontend" },
    { id: "8242IT", name: "Nour Mohamed", email: "@gmail.com", section: "IT", role: "UI/UX" },
    { id: "6641CS", name: "Ahmed Mohamed", email: "@gmail.com", section: "CS", role: "Data analyst" },
    { id: "7242IT", name: "Mohamed Ali", email: "@gmail.com", section: "IT", role: "Backend" }
  ];

  return (
    <>
      <div 
        className="fixed bottom-0 right-0 z-50 transition-all duration-400 ease-in-out"
        style={{ 
          top: '72px',
          left: sideMenuIsOpen ? '320px' : '0', // Width of sidebar when open (320px) or closed (0)
          opacity: isOpen ? '1' : '0',
          pointerEvents: isOpen ? 'auto' : 'none',
          transitionDelay: isOpen ? '0ms' : '200ms' // Delay opacity change when closing
        }}
      >
        <div 
          className="absolute inset-0 bg-[#cfe0f3] transform transition-all duration-400 ease-in-out"
          style={{ 
            height: 'calc(100vh - 72px)', // Set height to viewport minus header
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transitionDelay: isOpen ? '0ms' : '0ms' // No delay for transform when closing
          }}
        >
          {/* Navigation button in top right */}
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={onClose}
              className="text-black hover:text-[#42A5F5] bg-white rounded-full p-2 shadow-md z-10 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Single scrollable container for all content */}
          <div className="h-full overflow-y-auto">
            <div className="p-8">
              {/* Top spacing area */}
              <div className="h-16"></div>
              
              {/* Main white card with project details */}
              <div className="bg-white rounded-lg mb-12 p-8 shadow-sm">
                <div className="flex items-start">
                  <div className="w-40 h-40 flex items-center justify-center mr-8">
                    <img 
                      src={team.logo} 
                      alt={team.teamName}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <div className="flex-1 pt-4">
                    <h2 className="text-3xl font-bold text-black mb-6">{team.teamName}</h2>
                    <p className="text-gray-600 text-lg">
                      {team.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Supervisor section */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[#0047AB] mb-5 pl-2">Supervisor</h3>
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="flex items-start">
                    <img 
                      src={supervisor.avatar} 
                      alt={supervisor.name} 
                      className="w-24 h-24 rounded-full object-cover mr-8"
                    />
                    <div>
                      <h4 className="text-2xl font-bold text-black mb-2">{supervisor.name}</h4>
                      <p className="text-blue-800 mb-1">{supervisor.university}</p>
                      <p className="text-blue-800 mb-1">{supervisor.faculty}</p>
                      <p className="text-blue-800">{supervisor.department}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h5 className="font-bold text-lg mb-3">Academic Qualification</h5>
                    <ul className="space-y-2">
                      {supervisor.qualifications.map((qual, index) => (
                        <li key={index} className="text-gray-700">{qual.degree}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Team members */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-[#0047AB] mb-5 pl-2">Team Members</h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">ID</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">Section</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamMembers.map((member, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-3 whitespace-nowrap text-base font-medium text-gray-900">{member.id}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-base text-gray-900">{member.name}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">..................{member.email}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">{member.section}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">{member.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Bottom spacing area */}
              <div className="h-10"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Team card component
const TeamCard: React.FC<{ id: number; teamName: string; teamLeader: string; description: string; logo: string }> = ({ 
  id, teamName, teamLeader, description, logo 
}) => {
  const [isRequestPanelOpen, setIsRequestPanelOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
          <img 
            src={logo} 
            alt={teamName} 
            className="w-20 h-20 mr-4 object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">{teamName}</h3>
            <h4 className="text-md text-[#A1A3AB]">Team leader: {teamLeader}</h4>
          </div>
        </div>
        
        <p className="text-[#A1A3AB] mb-4">{description}</p>
        
        <div className="flex justify-end">
          <button 
            className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-6 py-2 rounded-md transition duration-200"
            onClick={() => setIsRequestPanelOpen(true)}
          >
            Request
          </button>
        </div>
      </div>
      
      {/* Team Request Panel */}
      <TeamRequestPanel
        isOpen={isRequestPanelOpen}
        onClose={() => setIsRequestPanelOpen(false)}
        team={{ id, teamName, teamLeader, description, logo }}
      />
    </div>
  );
};

// Member Search Panel Component
const MemberSearchPanel: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onInvite: (email: string) => void;
}> = ({ isOpen, onClose, onInvite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Mock member data
  const members = [
    { id: 1, name: 'Ahmed', email: 'ahmed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Mohamed', email: 'mohamed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { id: 3, name: 'Ali', email: 'ali@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { id: 4, name: 'Nada', email: 'nada@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div 
      className="fixed right-0 z-[70] transition-all duration-400 ease-in-out"
      style={{ 
        top: '72px',
        height: 'calc(100vh - 72px)', // Set height to viewport minus header
        width: '500px', // Increased width
        opacity: isOpen ? '1' : '0',
        transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transitionDelay: isOpen ? '0ms' : '200ms' // Delay opacity change when closing
      }}
    >
      <div className="absolute inset-0 shadow-xl bg-[#F5F7FB] rounded-bl-lg border border-gray-200">
        <div className="h-full flex flex-col p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-primary-black">Invite Members</h2>
            <button 
              onClick={onClose}
              className="text-primary-black hover:text-[#1976D2] transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Email address"
                className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none text-sm transition-all duration-200"
              />
              <button 
                className="bg-primary-blue text-white px-3 py-1 rounded-md whitespace-nowrap text-sm transition-all duration-200"
                onClick={() => onInvite(searchTerm)}
              >
                Invite
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <div className="mb-3">
              <h3 className="text-sm font-semibold mb-1">Members</h3>
              <div className="border border-gray-200 rounded-md bg-white p-2 overflow-y-auto flex-1 mb-3" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        <p className="text-gray-500 text-xs">{member.email}</p>
                      </div>
                    </div>
                    <button 
                      className="bg-primary-blue text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200"
                      onClick={() => onInvite(member.email)}
                    >
                      Invite
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Invite Link</h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-white border border-gray-200 rounded-md p-2 overflow-hidden relative">
                  <p className="text-gray-400 text-xs truncate">https://capstone.team/invite/34565yy29</p>
                </div>
                <button className="bg-primary-blue text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentProjectsPage: React.FC = () => {
  console.log("StudentProjectsPage component rendered"); // Debug log
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects' || location.pathname === '/student/projects' || location.pathname === '/project';
  const [activeTab, setActiveTab] = useState<'collage' | 'teams'>('collage');
  const [isCreateTeamPanelOpen, setIsCreateTeamPanelOpen] = useState(false);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Mock projects data
  const projects = [
    {
      id: 1,
      userName: 'DR / Mohamed Ahmed',
      projectName: 'AI-Driven Healthcare Analytics',
      description: 'This project focuses on developing machine learning algorithms to analyze patient data and predict potential health risks. Students will work with anonymized healthcare datasets to create predictive models.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      userName: 'DR / Ahmed Khalid',
      projectName: 'Smart City Infrastructure',
      description: 'Designing IoT solutions for urban environments to monitor traffic, air quality, and energy usage. This project involves hardware prototyping and data visualization techniques.',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
      id: 3,
      userName: 'DR / Fatma Nour',
      projectName: 'Blockchain for Supply Chain',
      description: 'Implementing blockchain technology to create transparent and secure supply chain management systems. Students will learn smart contract development and distributed systems.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 4,
      userName: 'DR / Laila Hassan',
      projectName: 'Natural Language Processing for Education',
      description: 'Creating applications that use NLP to enhance learning experiences, including automated grading systems and personalized learning assistants.',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
      id: 5,
      userName: 'DR / Khaled Omar',
      projectName: 'Renewable Energy Optimization',
      description: 'Developing algorithms to optimize the placement and efficiency of solar panels and wind turbines using geographical and meteorological data analysis.',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    }
  ];

  // Mock teams data with updated logo
  const teamLogo = 'https://i.imgur.com/jM0Qkhj.png'; // Updated team logo - education/student icon
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: 'Data Science Innovators',
      teamLeader: 'Team leader',
      description: 'Our team is focused on creating innovative solutions using big data and machine learning algorithms. We are currently working on a project to predict customer behavior in e-commerce platforms.',
      logo: teamLogo
    },
    {
      id: 2,
      teamName: 'Web Development Squad',
      teamLeader: 'Team leader',
      description: 'We specialize in creating modern, responsive web applications using React and Node.js. Our current project involves developing a platform for university course management and student collaboration.',
      logo: teamLogo
    },
    {
      id: 3,
      teamName: 'Mobile App Creators',
      teamLeader: 'Team leader',
      description: 'Our team develops cross-platform mobile applications using Flutter and Firebase. We are currently working on a health tracking app that integrates with various wearable devices.',
      logo: teamLogo
    },
    {
      id: 4,
      teamName: 'AI Research Group',
      teamLeader: 'Team leader',
      description: 'We explore cutting-edge artificial intelligence techniques and their practical applications. Our current focus is on developing computer vision solutions for autonomous navigation systems.',
      logo: teamLogo
    },
    {
      id: 5,
      teamName: 'Cybersecurity Team',
      teamLeader: 'Team leader',
      description: 'Our team specializes in identifying and addressing security vulnerabilities in various systems. We are currently working on developing a secure authentication framework for distributed applications.',
      logo: teamLogo
    }
  ]);
  
  const handleCreateTeam = (teamData: any) => {
    console.log('Creating new team:', teamData);
    
    // Create a new team with the data from the form
    const newTeam = {
      id: teams.length + 1,
      teamName: teamData.teamName,
      teamLeader: 'Team leader',
      description: teamData.teamMembers ? `Team with members: ${teamData.teamMembers}` : 'New team created by user',
      logo: teamLogo
    };
    
    // Add the new team to the teams array
    setTeams([...teams, newTeam]);
    
    // Switch to the teams tab to show the newly created team
    setActiveTab('teams');
    
    // Show success message
    setTimeout(() => {
      alert(`Team "${teamData.teamName}" created successfully!`);
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">
      {/* Create Team Panel */}
      <CreateTeamPanel 
        isOpen={isCreateTeamPanelOpen}
        onClose={() => setIsCreateTeamPanelOpen(false)}
        onSubmit={handleCreateTeam}
      />
      
      {/* Header with tabs and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('collage')}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              activeTab === 'collage' 
              ? 'bg-[#42A5F5] text-white' 
              : 'bg-[#A1A3AB] text-white hover:bg-[#42A5F5]'
            }`}
          >
            Collage idea
          </button>
          <button 
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              activeTab === 'teams' 
              ? 'bg-[#42A5F5] text-white' 
              : 'bg-[#A1A3AB] text-white hover:bg-[#42A5F5]'
            }`}
          >
            Teams
          </button>
        </div>
        
        <div className="relative w-full md:w-auto flex-grow md:max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#42A5F5]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#42A5F5] text-white p-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <button 
          onClick={() => setIsCreateTeamPanelOpen(true)}
          className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-4 py-2 rounded-md whitespace-nowrap"
        >
          Create Team
        </button>
      </div>
      
      {/* Conditional Content Based on Active Tab */}
      <div className="max-w-3xl mx-auto" ref={projectsContainerRef}>
        {activeTab === 'collage' ? (
          /* Project Cards */
          <>
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                userName={project.userName}
                projectName={project.projectName}
                description={project.description}
                avatar={project.avatar}
              />
            ))}
          </>
        ) : (
          /* Teams Cards */
          <>
            {teams.map(team => (
              <TeamCard 
                key={team.id}
                id={team.id}
                teamName={team.teamName}
                teamLeader={team.teamLeader}
                description={team.description}
                logo={team.logo}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProjectsPage; 