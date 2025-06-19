import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SvgIcon } from "../../../components/SvgIcon/Index";
import { Button } from "../../../components/Ui/Button/Index";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  status: string;
  createdAt: string;
  profileImage?: string;
}

function UserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API call to fetch user details
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        // Mock data - in a real app, this would be an API call
        const mockUser: User = {
          id: Number(userId),
          name: "John Doe",
          email: "john.doe@example.com",
          role: "admin",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Anytown, USA",
          status: "active",
          createdAt: "2023-05-15",
        };

        setTimeout(() => {
          setUser(mockUser);
          setLoading(false);
        }, 500); // simulate network delay
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <h2 className="text-xl font-bold">User Not Found</h2>
          <p className="mt-2">The requested user could not be found.</p>
          <Button
            text="Go Back"
            className="mt-4 bg-red-500 text-white hover:bg-red-600"
            onClick={handleGoBack}
          />
        </div>
      </div>
    );
  }

  const userInfoItems = [
    { label: "Full Name", value: user.name },
    { label: "Email Address", value: user.email },
    { label: "Role", value: user.role, type: "badge" },
    { label: "Status", value: user.status, type: "status" },
    { label: "Phone Number", value: user.phone || "Not provided" },
    { label: "Address", value: user.address || "Not provided" },
    {
      label: "Joined Date",
      value: new Date(user.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="container pt-10">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <Button
          text={
            <>
              <SvgIcon name="arrow-left" className="fill-current w-4 h-4" />
              <span className="ml-2">Back</span>
            </>
          }
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 mr-4"
          onClick={handleGoBack}
        />
        <h1 className="text-2xl font-bold">User Details</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {/* User profile header */}
        <div className="bg-blue-300 p-8 text-white relative">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center overflow-hidden">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <SvgIcon name="user" className="fill-current w-12 h-12" />
              )}
            </div>
            <div className="ml-6">
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-blue-100">{user.email}</p>
              <div className="mt-2 flex">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User information */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userInfoItems.map((item, index) => (
              <div key={index} className="border-b pb-3">
                <p className="text-sm text-gray-500">{item.label}</p>
                {item.type === "status" ? (
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-sm ${
                      item.value === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                  </span>
                ) : item.type === "badge" ? (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                    {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                  </span>
                ) : (
                  <p className="font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
      </div>
    </div>
  );
}

export default UserDetail;
