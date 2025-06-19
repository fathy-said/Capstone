import { useEffect, useMemo, useState } from "react";
import { TableControls } from "../../../components/AppTable/components/Controls/Controls";
import { AppTable } from "../../../components/AppTable/Index";
import { useParams } from "react-router-dom";
import { userTypes } from "../../../utils/global";

export function ReportTable() {
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
              baseUrl={`/${userType}/teams/${teamId}/details/${
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
