import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/Index";
import { Avatar } from "../../components/Ui/Avatar/Index";
import { Button } from "../../components/Ui/Button/Index";
import { useArchive } from "../../hooks/archive";

interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  is_leader: boolean;
}

interface Project {
  id: number;
  title: string;
  supervisor: string;
  description: string;
  tools: string[];
  year: number;
  team_members: TeamMember[];
}

function Archive() {
  const { value, loading } = useArchive();

  return (
    <div className="container py-20 min-h-screen flex flex-col justify-start items-center gap-8">
      <div className="flex justify-between items-center py-5 px-8 rounded-lg w-full bg-white">
        <h4 className="text-xl font-normal text-center">Archive page</h4>
        <SearchBar />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : value && value.length > 0 ? (
        value.map((project: Project) => (
          <ArchiveItem key={project.id} project={project} />
        ))
      ) : (
        <div className="text-center py-8">No projects found</div>
      )}
    </div>
  );
}

export default Archive;

const ArchiveItem = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full min-h-fit flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
      <div className="flex w-full justify-start items-center gap-6">
        <Avatar size="lg" className="w-40 h-40 rounded-full" />
        <div>
          <h4 className="text-2xl font-semibold">DR / {project.supervisor}</h4>
          <p className="text-md text-gray-500">Project Year: {project.year}</p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-xl font-semibold">{project.title}</h4>
        <p className="text-gray-600 text-md leading-8">{project.description}</p>

        <div className="w-full">
          <h5 className="text-lg font-medium mb-2">Tools & Technologies:</h5>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h5 className="text-lg font-medium mb-2">Team Members:</h5>
          <ul className="list-disc pl-6">
            {project.team_members.map((member, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">
                  {member.firstName} {member.lastName}
                </span>
                {member.is_leader && (
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    (Team Leader)
                  </span>
                )}{" "}
                - {member.role}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        onClick={() => navigate(`${project.id}`)}
        text="See More"
        className="ml-auto"
      />
    </div>
  );
};
