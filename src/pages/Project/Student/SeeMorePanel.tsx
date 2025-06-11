import { useParams, useNavigate } from "react-router-dom";

const SeeMorePanel: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the team
  const team = {
    id: Number(id),
    teamName: "Data Science Innovators",
    teamLeader: "Team leader",
    description:
      "Our team is focused on creating innovative solutions using big data and machine learning algorithms. We are currently working on a project to predict customer behavior in e-commerce platforms.",
    logo: "https://i.imgur.com/jM0Qkhj.png",
  };

  // Mock data for the supervisor and team members
  const supervisor = {
    name: "Dr. Ahmed Mohamed El-syed Mahmoud",
    university: "Damanhur University",
    faculty: "Faculty of Computers and Information",
    department: "Information Technology department",
    qualifications: [
      {
        degree:
          "Ph.D. degree in information systems, Faculty of Computers and Information, Mansoura University, Jan. 2022",
      },
      {
        degree:
          "Master degree of Information Systems, Faculty of Computers and Informatics, Mansura University, Jan. 2018",
      },
      {
        degree:
          "The graduation project target was: Analysis and design database to Urology Hospital, Mansura (Excellent grade)",
      },
    ],
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
  };

  const teamMembers = [
    {
      id: "6641CS",
      name: "Mostafa Ahmed",
      email: "@gmail.com",
      section: "CS",
      role: "Frontend",
    },
    {
      id: "8242IT",
      name: "Nour Mohamed",
      email: "@gmail.com",
      section: "IT",
      role: "UI/UX",
    },
    {
      id: "6641CS",
      name: "Ahmed Mohamed",
      email: "@gmail.com",
      section: "CS",
      role: "Data analyst",
    },
    {
      id: "7242IT",
      name: "Mohamed Ali",
      email: "@gmail.com",
      section: "IT",
      role: "Backend",
    },
    {
      id: "541CS",
      name: "Ahmed Alaa",
      email: "@gmail.com",
      section: "CS",
      role: "Flutter",
    },
    {
      id: "541CS",
      name: "Ahmed Alaa",
      email: "@gmail.com",
      section: "CS",
      role: "Flutter",
    },
    {
      id: "6641CS",
      name: "Mostafa Ahmed",
      email: "@gmail.com",
      section: "CS",
      role: "Frontend",
    },
    {
      id: "8242IT",
      name: "Nour Mohamed",
      email: "@gmail.com",
      section: "IT",
      role: "UI/UX",
    },
    {
      id: "6641CS",
      name: "Ahmed Mohamed",
      email: "@gmail.com",
      section: "CS",
      role: "Data analyst",
    },
    {
      id: "7242IT",
      name: "Mohamed Ali",
      email: "@gmail.com",
      section: "IT",
      role: "Backend",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#cfe0f3] flex flex-col items-center justify-start relative"
      style={{ paddingTop: "72px" }}
    >
      {/* Exit button at the top-right of the page */}
      <button
        onClick={() => navigate("/student/projects")}
        className="absolute top-8 right-8 text-black hover:text-[#42A5F5] bg-white rounded-full p-2 shadow-md z-50 transition-all duration-200"
      >
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl p-8">
          {/* Top spacing area */}
          <div className="h-8"></div>
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
                <h2 className="text-3xl font-bold text-black mb-6">
                  {team.teamName}
                </h2>
                <p className="text-gray-600 text-lg">{team.description}</p>
              </div>
            </div>
          </div>
          {/* Supervisor section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#0047AB] mb-5 pl-2">
              Supervisor
            </h3>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-start">
                <img
                  src={supervisor.avatar}
                  alt={supervisor.name}
                  className="w-24 h-24 rounded-full object-cover mr-8"
                />
                <div>
                  <h4 className="text-2xl font-bold text-black mb-2">
                    {supervisor.name}
                  </h4>
                  <p className="text-blue-800 mb-1">{supervisor.university}</p>
                  <p className="text-blue-800 mb-1">{supervisor.faculty}</p>
                  <p className="text-blue-800">{supervisor.department}</p>
                </div>
              </div>
              <div className="mt-8">
                <h5 className="font-bold text-lg mb-3">
                  Academic Qualification
                </h5>
                <ul className="space-y-2">
                  {supervisor.qualifications.map((qual, index) => (
                    <li key={index} className="text-gray-700">
                      {qual.degree}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Team members */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#0047AB] mb-5 pl-2">
              Team Members
            </h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">
                        Section
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-[#0047AB] uppercase">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-3 whitespace-nowrap text-base font-medium text-gray-900">
                          {member.id}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-base text-gray-900">
                          {member.name}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">
                          ..................{member.email}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">
                          {member.section}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-base text-gray-500">
                          {member.role}
                        </td>
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
  );
};

export default SeeMorePanel;
