import { useState, KeyboardEvent } from "react";
// Import will be used when integrating with API
// import { useParams } from "react-router-dom";

function MeetingDetail() {
  // These params will be used when integrating with API
  // const { teamId, meetingId } = useParams();
  const [attendanceData, setAttendanceData] = useState([
    { num: 1, name: "Mohamed Ahmed", attend: true, comment: "---" },
    { num: 2, name: "Ali Hassan", attend: false, comment: "---" },
    { num: 3, name: "Fatma Mohamed", attend: true, comment: "---" },
    { num: 4, name: "Noha Ibrahim", attend: false, comment: "---" },
    { num: 5, name: "Khaled Mahmoud", attend: true, comment: "---" },
  ]);

  // Content for topics and tasks sections
  const [topicsContent, setTopicsContent] = useState("");
  const [tasksContent, setTasksContent] = useState("");

  // State to track which section is being edited
  const [editingSection, setEditingSection] = useState<
    "topics" | "tasks" | null
  >(null);

  // State to track which row is being edited (if any)
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null
  );
  // State to store the current comment being edited
  const [currentEditComment, setCurrentEditComment] = useState("");

  const handleAttendanceChange = (index: number) => {
    const newAttendance = [...attendanceData];
    newAttendance[index] = {
      ...newAttendance[index],
      attend: !newAttendance[index].attend,
    };
    setAttendanceData(newAttendance);
  };

  const startEditingComment = (index: number) => {
    setEditingCommentIndex(index);
    setCurrentEditComment(attendanceData[index].comment);
  };

  const saveComment = () => {
    if (editingCommentIndex !== null) {
      const newAttendance = [...attendanceData];
      newAttendance[editingCommentIndex] = {
        ...newAttendance[editingCommentIndex],
        comment: currentEditComment,
      };
      setAttendanceData(newAttendance);
      setEditingCommentIndex(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      saveComment();
    } else if (e.key === "Escape") {
      setEditingCommentIndex(null);
    }
  };

  const handleSectionKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditingSection(null);
    }
  };

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
          <div
            className="bg-gray-100 p-4 min-h-[100px] rounded cursor-pointer"
            onClick={() =>
              editingSection !== "topics" && setEditingSection("topics")
            }
          >
            {editingSection === "topics" ? (
              <textarea
                value={topicsContent}
                onChange={(e) => setTopicsContent(e.target.value)}
                onBlur={() => setEditingSection(null)}
                onKeyDown={handleSectionKeyDown}
                autoFocus
                className="w-full h-full min-h-[100px] p-2 border border-blue-300 rounded bg-white"
                placeholder="Enter topics discussed in the meeting..."
              />
            ) : topicsContent ? (
              <div className="whitespace-pre-wrap">{topicsContent}</div>
            ) : (
              <div className="text-gray-400 italic">
                Click to add topics discussed...
              </div>
            )}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Tasks given to the students :</h3>
          <div
            className="bg-gray-100 p-4 min-h-[100px] rounded cursor-pointer"
            onClick={() =>
              editingSection !== "tasks" && setEditingSection("tasks")
            }
          >
            {editingSection === "tasks" ? (
              <textarea
                value={tasksContent}
                onChange={(e) => setTasksContent(e.target.value)}
                onBlur={() => setEditingSection(null)}
                onKeyDown={handleSectionKeyDown}
                autoFocus
                className="w-full h-full min-h-[100px] p-2 border border-blue-300 rounded bg-white"
                placeholder="Enter tasks assigned to students..."
              />
            ) : tasksContent ? (
              <div className="whitespace-pre-wrap">{tasksContent}</div>
            ) : (
              <div className="text-gray-400 italic">Click to add tasks...</div>
            )}
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
                        onChange={() => handleAttendanceChange(index)}
                        className="h-4 w-4"
                      />
                    </td>
                    <td
                      className="border p-2 cursor-pointer"
                      onClick={() => startEditingComment(index)}
                    >
                      {editingCommentIndex === index ? (
                        <input
                          type="text"
                          value={currentEditComment}
                          onChange={(e) =>
                            setCurrentEditComment(e.target.value)
                          }
                          onBlur={saveComment}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="w-full p-1 border border-blue-300 rounded"
                        />
                      ) : (
                        item.comment
                      )}
                    </td>
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
