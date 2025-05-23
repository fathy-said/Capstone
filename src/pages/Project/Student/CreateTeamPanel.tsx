import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUtils } from "../../../store/utils";

// Member Search Panel Component
const MemberSearchPanel: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onInvite: (email: string) => void;
}> = ({ isOpen, onClose, onInvite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock member data
  const members = [
    { id: 1, name: 'Ahmed', email: 'ahmed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Mohamed', email: 'mohamed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { id: 3, name: 'Ali', email: 'ali@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { id: 4, name: 'Nada', email: 'nada@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-hidden">
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">Invite Members</h2>
            <button 
              onClick={onClose}
              className="text-black hover:text-[#42A5F5] bg-white rounded-full p-1 shadow-md transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Email address"
              className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none text-sm"
            />
            <button 
              className="bg-[#42A5F5] text-white px-3 py-1 rounded-md whitespace-nowrap text-sm transition-all duration-200"
              onClick={() => onInvite("new@example.com")}
            >
              Invite
            </button>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden mt-4">
            <h3 className="text-sm font-semibold mb-1">Members</h3>
            <div className="flex-1 overflow-y-auto">
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
                    className="bg-[#42A5F5] text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200"
                    onClick={() => onInvite(member.email)}
                  >
                    Invite
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-1">Invite Link</h3>
            <div className="flex gap-2">
              <div className="flex-1 bg-white border border-gray-200 rounded-md p-2 overflow-hidden relative">
                <p className="text-gray-400 text-xs truncate">https://capstone.team/invite/34565yy29</p>
              </div>
              <button className="bg-[#42A5F5] text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateTeamPanel: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);
  const { sideMenuIsOpen } = useUtils();
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent body scrolling when panel is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore body scrolling when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the team
    console.log('Creating team:', { teamName, teamMembers });
    // After successful creation, navigate back to projects page
    navigate('/student/projects');
  };

  const handleInviteMember = (email: string) => {
    setTeamMembers(prev => prev ? `${prev}, ${email}` : email);
    setIsSearchMemberOpen(false);
  };

  return (
    <div 
      className="fixed bottom-0 right-0 z-50 transition-all duration-400 ease-in-out"
      style={{ 
        top: '72px',
        left: sideMenuIsOpen ? '320px' : '0', // Width of sidebar when open (320px) or closed (0)
        opacity: isPanelVisible ? '1' : '0',
        pointerEvents: isPanelVisible ? 'auto' : 'none',
        transitionDelay: isPanelVisible ? '0ms' : '200ms' // Delay opacity change when closing
      }}
    >
      <div 
        className="absolute inset-0 bg-[#cfe0f3] transform transition-all duration-400 ease-in-out"
        style={{ 
          height: 'calc(100vh - 72px)', // Set height to viewport minus header
          transform: isPanelVisible ? 'translateX(0)' : 'translateX(100%)',
          transitionDelay: isPanelVisible ? '0ms' : '0ms' // No delay for transform when closing
        }}
      >
        {/* Navigation button in top right */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => navigate('/student/projects')}
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
            
            {/* Main white card with form */}
            <div className="bg-white rounded-lg mb-12 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-8">Create Team</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label htmlFor="teamName" className="block text-black text-lg mb-2">Team name</label>
                  <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-md bg-white focus:outline-none transition-all duration-200"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="teamMembers" className="block text-black text-lg mb-2">Team members</label>
                  <p className="text-black mb-2">Who should be in this team?</p>
                  <div className="relative">
                    <input
                      id="teamMembers"
                      type="text"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-md bg-white focus:outline-none pr-10 transition-all duration-200"
                      placeholder="Search for team members..."
                    />
                    <div 
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setIsSearchMemberOpen(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-[#42A5F5] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between">
                  <button
                    type="button"
                    onClick={() => navigate('/student/projects')}
                    className="px-6 py-2 text-black text-lg font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-12 py-2 bg-[#42A5F5] hover:bg-[#3994e4] text-white text-lg font-medium rounded-md transition-all duration-200"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Member Search Panel */}
      {isSearchMemberOpen && (
        <MemberSearchPanel
          isOpen={isSearchMemberOpen}
          onClose={() => setIsSearchMemberOpen(false)}
          onInvite={handleInviteMember}
        />
      )}
    </div>
  );
};

export default CreateTeamPanel;
