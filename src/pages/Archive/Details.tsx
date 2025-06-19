import { useEffect, useMemo, useState } from "react";
import { AppTable } from "../../components/AppTable/Index";
import { Avatar } from "../../components/Ui/Avatar/Index";

function Details() {
  return (
    <div className="container py-20 min-h-screen flex flex-col justify-start items-center gap-8">
      <div className="flex justify-between items-center py-5 px-8 rounded-lg w-full bg-white">
        <h4 className="text-xl font-normal text-center">Archive page</h4>
      </div>
      <div className="h-full w-full min-h-fit  flex flex-col justify-start items-start gap-4 rounded-lg py-8 px-8 bg-white">
        <div className="flex w-full justify-start items-center gap-6">
          <Avatar size="lg" className=" w-40 h-40 rounded-full" />
          <h4 className="text-2xl font-semibold">Xo</h4>
        </div>
        <div className="flex w-full flex-col justify-start items-start gap-4">
          <h4 className="text-xl font-semibold">project idea</h4>
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
    </div>
  );
}

export default Details;

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
      // {
      //   header: "",
      //   accessorKey: "controls",
      //   cell: (props) => {
      //     return (
      //       <TableControls value={props?.original} isView baseUrl="/projects" />
      //     );
      //   },
      // },
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
