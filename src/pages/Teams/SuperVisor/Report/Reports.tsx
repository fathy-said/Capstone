import { useEffect, useMemo, useState } from "react";
import { TableControls } from "../../../../components/AppTable/components/Controls/Controls";
import { AppTable } from "../../../../components/AppTable/Index";
import { useParams } from "react-router-dom";
import { userTypes } from "../../../../utils/global";
import { Button } from "../../../../components/Ui/Button/Index";
import { useNavigate } from "react-router-dom";

function Reports() {
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
            <Button
              text="Members"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/members`)}
            />

            <Button text="Report" disabled={true} className="bg-gray-200" />
          </div>
          <div className=" w-full h-[1px] bg-blue-400"></div>
        </div>
      </div>
      <div className="container flex flex-col justify-start items-center gap-8">
        <div className="h-full w-full mt-10 min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
          <div className="flex items-center justify-between gap-2 w-full">
            <h4 className="text-lg font-semibold">meetings Report</h4>
            <Button
              text="Add Report"
              className=" border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={() => navigate(`${currentLocation}/report/add`)}
            />
          </div>

          <ReportTable />
        </div>
      </div>
    </div>
  );
}

export default Reports;

function ReportTable() {
  const [posts, setPosts] = useState([]);
  const { teamId } = useParams();
  const userType = localStorage.getItem("user_type") as userTypes;
  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Meeting Date",
        accessorKey: "meetingDate",
        cell: (props) => {
          return <>{`${+props?.row?.id + 1}/11/2024`}</>;
        },
      },

      {
        header: "Comment",
        accessorKey: "comment",
        cell: () => {
          return <>Academic</>;
        },
      },
      {
        header: "Actions",
        accessorKey: "controls",
        cell: (props) => {
          return (
            <TableControls
              value={props?.original}
              isView
              isEdit={false}
              isDelete={false}
              baseUrl={`/${userType}/teams/${teamId}/details/report/${
                +props?.row?.id + 1
              }`}
              isDownload={false}
              className="px-12"
              isUrl={true}
            />
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
