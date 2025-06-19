import { useState } from "react";
// Import will be used when integrating with API
// import { useParams } from "react-router-dom";

function MeetingDetail() {
  // These params will be used when integrating with API
  // const { teamId, meetingId } = useParams();
  const [attendanceData] = useState([
    { num: 1, name: "Mohamed Ahmed", attend: true, comment: "---" },
    { num: 2, name: "Ali Hassan", attend: false, comment: "Sick Leave" },
    { num: 3, name: "Fatma Mohamed", attend: true, comment: "Participated" },
    {
      num: 4,
      name: "Noha Ibrahim",
      attend: false,
      comment: "Family Emergency",
    },
    { num: 5, name: "Khaled Mahmoud", attend: true, comment: "Late Entrance" },
  ]);

  return (
    <div className="container py-10 min-h-screen flex flex-col justify-start items-center">
      <div className="w-full bg-white rounded-lg shadow-sm p-8">
        {/* Header Section */}
        <div className="border-b pb-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <span className="font-semibold">Title of project :</span>
                <span>Archive System</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <span className="font-semibold">Meeting Date :</span>
                <span>3/4/2025</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Supervisors</span>
                <span className="border-b border-gray-400">Ahmed Abdullah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Discussed Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            Topics Discussed in the meeting:
          </h3>
          <div className="bg-gray-100 p-4 text-gray-600 min-h-[100px] rounded">
            {/* Content will be added here */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            non adipisci sapiente, sint neque inventore in, at omnis error
            quidem architecto nisi consequuntur aperiam veniam blanditiis
            libero, sunt quas minima.
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Tasks given to the students :</h3>
          <div className="bg-gray-100 p-4 text-gray-600 min-h-[100px] rounded">
            {/* Content will be added here */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            non adipisci sapiente, sint neque inventore in, at omnis error
            quidem architecto nisi consequuntur aperiam veniam blanditiis
            libero, sunt quas minima.
          </div>
        </div>

        {/* Attendance Section */}
        <div>
          <h3 className="font-semibold mb-2">Attendance</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left w-12">Num</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-center w-24">Attend</th>
                  <th className="border p-2 text-left">Comment</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{item.num}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={item.attend}
                        className="h-4 w-4"
                      />
                    </td>
                    <td className="border p-2">{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingDetail;
