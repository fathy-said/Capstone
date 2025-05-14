import { useParams } from "react-router-dom";

function StudentTeams() {
  const params = useParams();
  console.log("params", params);
  return <div>StudentTeams</div>;
}

export default StudentTeams;
