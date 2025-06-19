import { useEffect, useMemo, useState } from "react";
import { TableControls } from "../../../components/AppTable/components/Controls/Controls";
import { AppTable } from "../../../components/AppTable/Index";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Ui/Button/Index";

function TeamsMember() {
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/").slice(0, -1).join("/");
  return (
    <div className="w-full">
      <div className="container py-20 flex flex-col justify-start items-center gap-8">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <div className="flex justify-start items-center gap-2 w-full">
            <Button
              text="Tasks"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/tasks`)}
            />

            <Button text="Members" disabled={true} className="bg-gray-200" />

            <Button
              text="Report"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/report`)}
            />
          </div>
          <div className=" w-full h-[1px] bg-blue-400"></div>
        </div>
      </div>
      <div className="container flex flex-col justify-start items-center gap-8">
        <div className="h-full w-full mt-10 min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
          <h4 className="text-lg font-semibold">Team Members</h4>

          <MemberTable />
        </div>
      </div>
    </div>
  );
}

export default TeamsMember;

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
        data={posts.slice(0, 10)}
        columns={columns}
        loading={false}
        className="mt-10 w-full"
        total={40}
        onPaginate={(e) => console.log(e)}
      />
    </>
  );
}
