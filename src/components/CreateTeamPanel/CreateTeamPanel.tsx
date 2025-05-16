import React, { useState, useEffect } from 'react';
import { useUtils } from "../../store/utils";

interface CreateTeamPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { teamName: string; teamMembers: string }) => void;
}

const CreateTeamPanel: React.FC<CreateTeamPanelProps> = ({ 
  isOpen, 
  onClose,
  onSubmit 
}) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isSearchMemberOpen, setIsSearchMemberOpen] = useState(false);
  const { sideMenuIsOpen } = useUtils();

  useEffect(() => {
    if (isOpen) {
      setIsPanelVisible(true);
      // Prevent body scrolling when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsPanelVisible(false);
        // Restore body scrolling
        document.body.style.overflow = 'auto';
      }, 400); // Increased timeout for smoother transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ teamName, teamMembers });
    setTeamName('');
    setTeamMembers('');
    onClose();
  };

  const handleInviteMember = (email: string) => {
    setTeamMembers(prev => prev ? `${prev}, ${email}` : email);
    setIsSearchMemberOpen(false);
  };

  if (!isPanelVisible && !isOpen) return null;

  return (
    <>
      {/* Main create team panel that covers the project page from sidebar to right edge */}
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
        {/* The panel content */}
        <div 
          className="absolute inset-0 bg-[#F5F7FB] transform transition-all duration-400 ease-in-out"
          style={{ 
            height: 'calc(100vh - 72px)', // Set height to viewport minus header
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transitionDelay: isOpen ? '0ms' : '0ms' // No delay for transform when closing
          }}
        >
          {/* Exit button - fixed position at top right */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-[#42A5F5] bg-white rounded-full p-2 shadow-md z-10 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Single scrollable container for all content */}
          <div className="h-full overflow-y-auto">
            <div className="p-6 md:p-8 relative">
              {/* Member search panel - integrated into right side of main panel, full height */}
              {isSearchMemberOpen && (
                <div className="absolute top-0 right-0 bottom-0 w-[500px] bg-[#F5F7FB] shadow-lg border-l border-gray-200 z-10 flex flex-col transition-all duration-300 ease-in-out"
                     style={{ height: 'calc(100vh - 72px)' }} // Set height to viewport minus header
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-black">Invite Members</h2>
                      <button 
                        onClick={() => setIsSearchMemberOpen(false)}
                        className="text-black hover:text-[#42A5F5] bg-white rounded-full p-1 shadow-md transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Email address"
                          className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none text-sm"
                        />
                        <button 
                          className="bg-[#42A5F5] text-white px-3 py-1 rounded-md whitespace-nowrap text-sm transition-all duration-200"
                          onClick={() => handleInviteMember("new@example.com")}
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <h3 className="text-sm font-semibold mb-1">Members</h3>
                      <div className="border border-gray-200 rounded-md bg-white p-2 overflow-y-auto flex-1 mb-3">
                        {[
                          { id: 1, name: 'Ahmed', email: 'ahmed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                          { id: 2, name: 'Mohamed', email: 'mohamed@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
                          { id: 3, name: 'Ali', email: 'ali@gmail.com', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
                          { id: 4, name: 'Nada', email: 'nada@gmail.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                        ].map(member => (
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
                              onClick={() => handleInviteMember(member.email)}
                            >
                              Invite
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
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
              )}

              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-black lowercase">create team</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col max-w-[585px]">
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
                    onClick={onClose}
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
    </>
  );
};

export default CreateTeamPanel; 