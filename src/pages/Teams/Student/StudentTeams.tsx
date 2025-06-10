import { useEffect, useMemo, useState } from "react";
import { AppTable } from "../../../components/AppTable/Index";
import IconAtom from "../../../components/IconAtom/Icon-Atom";
import { Avatar } from "../../../components/Ui/Avatar/Index";
import { Button } from "../../../components/Ui/Button/Index";
import { TableControls } from "../../../components/AppTable/components/Controls/Controls";
import { useNavigate } from "react-router-dom";
import NewProjectForm from "./components/NewProjectForm";

function StudentTeams() {
  const navigate = useNavigate();
  const [newProjectModal, setNewProjectModal] = useState(false);

  return (
    <div className="container py-20 min-h-screen flex flex-col justify-start items-center gap-8">
      <div className="flex justify-start w-full items-center gap-4">
        <Button
          text="Tasks page"
          onClick={() => navigate("tasks")}
          className="  py-2 px-5 "
        />
        {/* <Button
          text="Tasks"
          className=" bg-transparent  border-[1px] border-blue-400 text-blue-400 py-2 px-5 "
        /> */}
      </div>
      <div className="flex justify-between items-center py-5 px-8 rounded-lg w-full bg-white">
        <h4 className="text-xl font-normal text-center">My teams page</h4>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => setNewProjectModal(true)}
            text={
              <>
                <IconAtom name="Plus" className="w-5 h-5" /> New idea
              </>
            }
            className=" bg-transparent !gap-2 border-[1px] border-blue-400 text-blue-400 py-2 px-5 "
          />
          <Button
            text={
              <>
                <IconAtom name="UserPlus" className="w-5 h-5" /> Invite
              </>
            }
            className=" bg-transparent !gap-2 border-[1px] border-blue-400 text-blue-400 py-2 px-5 "
          />
        </div>
      </div>
      <StudentTeamsItem data={"test"} />
      <div className="h-full w-full mt-10 min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <h4 className="text-lg font-semibold">Supervisor</h4>

        <div className="flex w-full justify-start items-center gap-6">
          <Avatar size="lg" className=" w-40 h-40 rounded-full" />
          <h4 className="text-2xl font-semibold">Xo</h4>
        </div>
        <div className="flex w-full flex-col justify-start items-start gap-4">
          <p className="text-gray-600 text-md leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam
            tempore quisquam cumque ipsum, facilis modi, iure nemo, magni
            doloribus magnam in? Optio voluptatibus aliquam excepturi velit
            provident voluptate totam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Harum quam tempore quisquam cumque ipsum, facilis
            modi, iure nemo, magni doloribus magnam in? Optio voluptatibus
            aliquam excepturi velit provident voluptate totam. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Harum quam tempore quisquam
            cumque ipsum, facilis modi, iure nemo, magni doloribus magnam in?
            Optio voluptatibus aliquam excepturi velit provident voluptate
            totam.
          </p>
        </div>
      </div>
      <div className="h-full w-full mt-10 min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <h4 className="text-lg font-semibold">Team Members</h4>
        <MemberTable />
      </div>
      <NewProjectForm state={newProjectModal} setState={setNewProjectModal} />
    </div>
  );
}

export default StudentTeams;

const StudentTeamsItem = ({ data }: { data: any }) => {
  return (
    <div className="h-full w-full min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
      <div className="flex w-full justify-start items-center gap-6">
        <Avatar size="lg" className=" w-40 h-40 rounded-full" />
        <h4 className="text-2xl font-semibold">DR / Mohamed</h4>
      </div>
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <h4 className="text-xl font-semibold">project idea</h4>
        <p className="text-gray-600 text-md leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quam
          tempore quisquam cumque ipsum, facilis modi, iure nemo, magni
          doloribus magnam in? Optio voluptatibus aliquam excepturi velit
          provident voluptate totam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Harum quam tempore quisquam cumque ipsum, facilis
          modi, iure nemo, magni doloribus magnam in? Optio voluptatibus aliquam
          excepturi velit provident voluptate totam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Harum quam tempore quisquam cumque
          ipsum, facilis modi, iure nemo, magni doloribus magnam in? Optio
          voluptatibus aliquam excepturi velit provident voluptate totam.
        </p>
      </div>
    </div>
  );
};

function MemberTable() {
  const [posts, setPosts] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "title",
      },
      {
        header: "Email",
        accessorKey: "title",
      },
      {
        header: "Section",
        accessorKey: "title",
      },
      {
        header: "",
        accessorKey: "controls",
        cell: (props) => {
          return (
            <TableControls value={props?.original} isView baseUrl="/projects" />
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos");
        const response = await data.json();

        setPosts(response);

        return response?.map((item) => {
          return { label: item?.title, value: item?.id };
        });
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
    getData();
  }, []);
  return (
    <>
      <AppTable
        data={posts}
        columns={columns}
        loading={false}
        className="mt-10 w-full"
        total={posts?.length}
        onPaginate={(e) => console.log(e)}
      />
    </>
  );
}
