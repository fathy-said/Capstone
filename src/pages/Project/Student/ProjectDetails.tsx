import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface ProjectDetailsProps {
  // Add any props if needed
}

const StudentProjectDetails: React.FC<ProjectDetailsProps> = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch project data
    // In a real app, you would fetch from an API
    const fetchProject = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock project data
          const projectData = {
            id: parseInt(projectId || "0"),
            userName: "DR / Mohamed Ahmed",
            projectName: "AI-Driven Healthcare Analytics",
            description:
              "This project focuses on developing machine learning algorithms to analyze patient data and predict potential health risks. Students will work with anonymized healthcare datasets to create predictive models.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            details:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
            requirements: [
              "Strong understanding of machine learning algorithms",
              "Experience with Python and data analysis libraries",
              "Knowledge of healthcare data structures",
              "Ability to work with large datasets",
            ],
            timeline: [
              { phase: "Research", duration: "2 weeks" },
              { phase: "Development", duration: "6 weeks" },
              { phase: "Testing", duration: "2 weeks" },
              { phase: "Deployment", duration: "2 weeks" },
            ],
          };

          setProject(projectData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F5F7FB]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#42A5F5]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F5F7FB]">
        <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
        <button
          className="mt-4 bg-[#42A5F5] hover:bg-[#3994e4] text-white px-6 py-2 rounded-md transition duration-200"
          onClick={() => navigate("/project")}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/project")}
          className="flex items-center text-[#42A5F5] hover:text-[#3994e4] mb-6 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Projects
        </button>

        {/* Project header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            <img
              src={project.avatar}
              alt={project.userName}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {project.projectName}
              </h2>
              <p className="text-lg text-gray-600 mt-1">
                Supervisor: {project.userName}
              </p>
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Project Description
          </h3>
          <p className="text-gray-600 mb-6">{project.description}</p>
          <p className="text-gray-600">{project.details}</p>
        </div>

        {/* Project requirements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
          <ul className="list-disc pl-5 space-y-2">
            {project.requirements.map((req: string, index: number) => (
              <li key={index} className="text-gray-600">
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Project timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Timeline</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800">Phase</th>
                  <th className="px-4 py-2 text-left text-gray-800">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.timeline.map(
                  (
                    phase: { phase: string; duration: string },
                    index: number
                  ) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td className="px-4 py-3 text-gray-600">{phase.phase}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {phase.duration}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request button */}
        <div className="flex justify-end">
          <button className="bg-[#42A5F5] hover:bg-[#3994e4] text-white px-8 py-3 rounded-md transition duration-200 text-lg font-medium">
            Request This Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectDetails;
