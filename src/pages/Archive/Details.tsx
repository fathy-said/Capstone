import { useMemo } from "react";
import { AppTable } from "../../components/AppTable/Index";
import { Avatar } from "../../components/Ui/Avatar/Index";
import { useParams } from "react-router-dom";
import { useArchiveDetails } from "../../hooks/archive";

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

function Details() {
  const { id } = useParams();
  const { value, loading } = useArchiveDetails(id || "");
  
  if (loading) {
    return (
      <div className="container py-20 min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl">Loading project details...</div>
      </div>
    );
  }
  
  if (!value) {
    return (
      <div className="container py-20 min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl">Project not found</div>
      </div>
    );
  }
  
  const project = value as Project;
  
  return (
    <div className="container py-20 min-h-screen flex flex-col justify-start items-center gap-8">
      <div className="flex justify-between items-center py-5 px-8 rounded-lg w-full bg-white">
        <h4 className="text-xl font-normal text-center">Archive Details</h4>
      </div>
      
      {/* Project Details */}
      <div className="h-full w-full min-h-fit flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <div className="flex w-full justify-start items-center gap-6">
          <Avatar size="lg" className="w-40 h-40 rounded-full" />
          <div>
            <h4 className="text-2xl font-semibold">{project.title}</h4>
            <p className="text-md text-gray-500">Project Year: {project.year}</p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-start items-start gap-4">
          <h4 className="text-xl font-semibold">Project Description</h4>
          <p className="text-gray-600 text-md leading-8">{project.description}</p>
          
          {/* Tools Section */}
          <div className="w-full mt-4">
            <h5 className="text-lg font-medium mb-2">Tools & Technologies:</h5>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Supervisor Section */}
      <div className="h-full w-full mt-10 min-h-fit flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <h4 className="text-lg font-semibold">Supervisor</h4>

        <div className="flex w-full justify-start items-center gap-6">
          <Avatar size="lg" className="w-40 h-40 rounded-full" />
          <div>
            <h4 className="text-2xl font-semibold">{project.supervisor}</h4>
            <p className="text-md text-gray-500">Project Supervisor</p>
          </div>
        </div>
      </div>
      
      {/* Team Members Section */}
      <div className="h-full w-full mt-10 min-h-fit flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <h4 className="text-lg font-semibold">Team Members</h4>
        <MemberTable teamMembers={project.team_members} />
      </div>
    </div>
  );
}

export default Details;

interface MemberTableProps {
  teamMembers: TeamMember[];
}

function MemberTable({ teamMembers }: MemberTableProps) {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row: TeamMember) => `${row.firstName} ${row.lastName}`,
        cell: (info: any) => (
          <div className="flex items-center gap-2">
            <span>{info.getValue()}</span>
            {info.row.original.is_leader && (
              <span className="ml-2 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Team Leader
              </span>
            )}
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
    ],
    []
  );

  return (
    <>
      <AppTable
        data={teamMembers}
        columns={columns}
        loading={false}
        className="mt-10 w-full"
        total={teamMembers.length}
        onPaginate={(e) => console.log(e)}
      />
    </>
  );
}
