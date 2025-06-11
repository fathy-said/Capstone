import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (isOpen) {
      setIsPanelVisible(true);
      // Prevent body scrolling when panel is open
      document.body.style.overflow = "hidden";
    } else {
      // Delay hiding the panel to allow animation to complete
      const timer = setTimeout(() => {
        setIsPanelVisible(false);
        // Restore body scrolling
        document.body.style.overflow = "auto";
      }, 400); // Increased timeout for smoother transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if ((!isPanelVisible && !isOpen) || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] transition-all duration-400 ease-in-out"
      style={{
        opacity: isOpen ? "1" : "0",
        pointerEvents: isOpen ? "auto" : "none",
        transitionDelay: isOpen ? "0ms" : "200ms", // Delay opacity change when closing
      }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-400 ease-in-out"
        onClick={onClose}
        style={{
          opacity: isOpen ? "1" : "0",
          transitionDelay: isOpen ? "0ms" : "100ms", // Slight delay for overlay fade
        }}
      ></div>

      <div
        className="fixed top-0 right-0 w-full max-w-lg bg-gray-100 transform transition-all duration-400 ease-in-out shadow-xl"
        style={{
          height: "100vh", // Full viewport height
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transitionDelay: isOpen ? "0ms" : "0ms", // No delay for transform when closing
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
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
              <h3 className="text-4xl font-bold text-black mb-6">
                {project.projectName}
              </h3>
              <p className="text-lg text-gray-600">{project.description}</p>
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

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  userName,
  projectName,
  description,
  avatar,
}) => {
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mb-3">
          <img src={avatar} alt={userName} className="w-16 h-16 rounded-full" />
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

// Team card component
const TeamCard: React.FC<{
  id: number;
  teamName: string;
  teamLeader: string;
  description: string;
  logo: string;
}> = ({ id, teamName, teamLeader, description, logo }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={logo}
          alt={teamName}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{teamName}</h2>
          <p className="text-gray-600 mt-1">{teamLeader}</p>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>
      <div className="flex justify-end w-full mt-2">
        <button
          onClick={() => navigate(`/student/projects/seemore/${id}`)}
          className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-6 py-2 rounded-md transition duration-200"
        >
          See More
        </button>
      </div>
    </div>
  );
};

// Member Search Panel Component
// const MemberSearchPanel: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onInvite: (email: string) => void;
// }> = ({ isOpen, onClose, onInvite }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Mock member data
//   const members = [
//     {
//       id: 1,
//       name: "Ahmed",
//       email: "ahmed@gmail.com",
//       avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       id: 2,
//       name: "Mohamed",
//       email: "mohamed@gmail.com",
//       avatar: "https://randomuser.me/api/portraits/men/41.jpg",
//     },
//     {
//       id: 3,
//       name: "Ali",
//       email: "ali@gmail.com",
//       avatar: "https://randomuser.me/api/portraits/men/55.jpg",
//     },
//     {
//       id: 4,
//       name: "Nada",
//       email: "nada@gmail.com",
//       avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//   ];

//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

//   return (
//     <div
//       className="fixed right-0 z-[70] transition-all duration-400 ease-in-out"
//       style={{
//         top: "72px",
//         height: "calc(100vh - 72px)", // Set height to viewport minus header
//         width: "500px", // Increased width
//         opacity: isOpen ? "1" : "0",
//         transform: isOpen ? "translateY(0)" : "translateY(-10px)",
//         pointerEvents: isOpen ? "auto" : "none",
//         transitionDelay: isOpen ? "0ms" : "200ms", // Delay opacity change when closing
//       }}
//     >
//       <div className="absolute inset-0 shadow-xl bg-[#F5F7FB] rounded-bl-lg border border-gray-200">
//         <div className="h-full flex flex-col p-5">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-primary-black">
//               Invite Members
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-primary-black hover:text-[#1976D2] transition-all duration-200"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="mb-4">
//             <div className="flex gap-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Email address"
//                 className="flex-1 p-2 border border-gray-200 rounded-md focus:outline-none text-sm transition-all duration-200"
//               />
//               <button
//                 className="bg-primary-blue text-white px-3 py-1 rounded-md whitespace-nowrap text-sm transition-all duration-200"
//                 onClick={() => onInvite(searchTerm)}
//               >
//                 Invite
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-auto">
//             <div className="mb-3">
//               <h3 className="text-sm font-semibold mb-1">Members</h3>
//               <div
//                 className="border border-gray-200 rounded-md bg-white p-2 overflow-y-auto flex-1 mb-3"
//                 style={{ maxHeight: "calc(100vh - 250px)" }}
//               >
//                 {members.map((member) => (
//                   <div
//                     key={member.id}
//                     className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={member.avatar}
//                         alt={member.name}
//                         className="w-8 h-8 rounded-full"
//                       />
//                       <div>
//                         <h4 className="font-medium text-sm">{member.name}</h4>
//                         <p className="text-gray-500 text-xs">{member.email}</p>
//                       </div>
//                     </div>
//                     <button
//                       className="bg-primary-blue text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200"
//                       onClick={() => onInvite(member.email)}
//                     >
//                       Invite
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-semibold mb-1">Invite Link</h3>
//               <div className="flex gap-2">
//                 <div className="flex-1 bg-white border border-gray-200 rounded-md p-2 overflow-hidden relative">
//                   <p className="text-gray-400 text-xs truncate">
//                     https://capstone.team/invite/34565yy29
//                   </p>
//                 </div>
//                 <button className="bg-primary-blue text-white px-2 py-1 rounded-md whitespace-nowrap text-xs transition-all duration-200">
//                   Copy
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const StudentProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"collage" | "teams">("collage");
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Mock projects data
  const projects = [
    {
      id: 1,
      userName: "DR / Mohamed Ahmed",
      projectName: "AI-Driven Healthcare Analytics",
      description:
        "This project focuses on developing machine learning algorithms to analyze patient data and predict potential health risks. Students will work with anonymized healthcare datasets to create predictive models.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      userName: "DR / Ahmed Khalid",
      projectName: "Smart City Infrastructure",
      description:
        "Designing IoT solutions for urban environments to monitor traffic, air quality, and energy usage. This project involves hardware prototyping and data visualization techniques.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 3,
      userName: "DR / Fatma Nour",
      projectName: "Blockchain for Supply Chain",
      description:
        "Implementing blockchain technology to create transparent and secure supply chain management systems. Students will learn smart contract development and distributed systems.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      userName: "DR / Laila Hassan",
      projectName: "Natural Language Processing for Education",
      description:
        "Creating applications that use NLP to enhance learning experiences, including automated grading systems and personalized learning assistants.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 5,
      userName: "DR / Khaled Omar",
      projectName: "Renewable Energy Optimization",
      description:
        "Developing algorithms to optimize the placement and efficiency of solar panels and wind turbines using geographical and meteorological data analysis.",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  // Mock teams data with updated logo
  const teamLogo = "https://i.imgur.com/jM0Qkhj.png"; // Updated team logo - education/student icon
  const [teams] = useState([
    {
      id: 1,
      teamName: "Data Science Innovators",
      teamLeader: "Team leader",
      description:
        "Our team is focused on creating innovative solutions using big data and machine learning algorithms. We are currently working on a project to predict customer behavior in e-commerce platforms.",
      logo: teamLogo,
    },
    {
      id: 2,
      teamName: "Web Development Squad",
      teamLeader: "Team leader",
      description:
        "We specialize in creating modern, responsive web applications using React and Node.js. Our current project involves developing a platform for university course management and student collaboration.",
      logo: teamLogo,
    },
    {
      id: 3,
      teamName: "Mobile App Creators",
      teamLeader: "Team leader",
      description:
        "Our team develops cross-platform mobile applications using Flutter and Firebase. We are currently working on a health tracking app that integrates with various wearable devices.",
      logo: teamLogo,
    },
    {
      id: 4,
      teamName: "AI Research Group",
      teamLeader: "Team leader",
      description:
        "We explore cutting-edge artificial intelligence techniques and their practical applications. Our current focus is on developing computer vision solutions for autonomous navigation systems.",
      logo: teamLogo,
    },
    {
      id: 5,
      teamName: "Cybersecurity Team",
      teamLeader: "Team leader",
      description:
        "Our team specializes in identifying and addressing security vulnerabilities in various systems. We are currently working on developing a secure authentication framework for distributed applications.",
      logo: teamLogo,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">
      {/* Header with tabs and buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("collage")}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              activeTab === "collage"
                ? "bg-[#42A5F5] text-white"
                : "bg-[#A1A3AB] text-white hover:bg-[#42A5F5]"
            }`}
          >
            Collage idea
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`px-4 py-2 rounded-md transition duration-200 ${
              activeTab === "teams"
                ? "bg-[#42A5F5] text-white"
                : "bg-[#A1A3AB] text-white hover:bg-[#42A5F5]"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => navigate("/student/projects/createteam")}
          className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-4 py-2 rounded-md whitespace-nowrap"
        >
          Create Team
        </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      <div className="max-w-3xl mx-auto" ref={projectsContainerRef}>
        {activeTab === "collage" ? (
          /* Project Cards */
          <>
            {projects.map((project) => (
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
            {teams.map((team) => (
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
