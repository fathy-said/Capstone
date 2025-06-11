import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/SearchBar/Index";
import { Avatar } from "../../../components/Ui/Avatar/Index";
import { Button } from "../../../components/Ui/Button/Index";

function SuperVisorTeams() {
  return (
    <div className="container py-20 min-h-screen flex flex-col justify-start items-center gap-8">
      <div className="flex justify-between items-center py-5 px-8 rounded-lg w-full bg-white">
        <h4 className="text-xl font-normal text-center">Teams page</h4>

        <SearchBar />
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <SuperVisorItem key={index} data={index} />
      ))}
    </div>
  );
}

export default SuperVisorTeams;

const SuperVisorItem = ({ data }: { data: any }) => {
  const navigate = useNavigate();
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
      <Button
        onClick={() => navigate(`${data}/details/tasks`)}
        text="See More"
        className="ml-auto"
      />
    </div>
  );
};
