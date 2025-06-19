import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppTable } from "../../../components/AppTable/Index";
import { SvgIcon } from "../../../components/SvgIcon/Index";
import { Button } from "../../../components/Ui/Button/Index";
import { Edit } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  // Columns configuration for the AppTable
  const columns = [
    {
      header: "#",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.role}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-md text-sm ${
            row.original.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/users/user/details/${row.original.id}`}
            className="p-2 bg-blue-50 rounded-md"
          >
            <SvgIcon name="eye" className="fill-blue-500 w-4 h-4" />
          </Link>
          <Link
            to={`/admin/users/user/edit/${row.original.id}`}
            className="p-2 text-blue-500 rounded-md"
          >
            <Edit className=" w-4 h-4" />
          </Link>
          <button className="p-2 bg-red-50 rounded-md">
            <SvgIcon name="trash" className="fill-red-500 w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Mock data for demonstration
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "inactive",
      },
      {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "supervisor",
        status: "active",
      },
      {
        id: 4,
        name: "Bob Brown",
        email: "bob@example.com",
        role: "user",
        status: "inactive",
      },
      {
        id: 5,
        name: "Charlie Davis",
        email: "charlie@example.com",
        role: "admin",
        status: "active",
      },
      {
        id: 6,
        name: "David Wilson",
        email: "david@example.com",
        role: "user",
        status: "inactive",
      },
      {
        id: 7,
        name: "Eve Miller",
        email: "eve@example.com",
        role: "supervisor",
        status: "active",
      },
      {
        id: 8,
        name: "Frank White",
        email: "frank@example.com",
        role: "user",
        status: "inactive",
      },
      {
        id: 9,
        name: "Grace Johnson",
        email: "grace@example.com",
        role: "supervisor",
        status: "active",
      },
      {
        id: 10,
        name: "Hannah Davis",
        email: "hannah@example.com",
        role: "user",
        status: "inactive",
      },
      // Add more mock users as needed
    ];

    setUsers(mockUsers);
    setTotal(mockUsers.length);
  }, []);

  // Handler for pagination
  const handlePagination = (pagination) => {
    // You would typically fetch data here based on pagination
    console.log("Pagination:", pagination);
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you'd fetch users based on pagination
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container pt-10">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Link to="/admin/users/user/create">
          <Button
            text={
              <>
                <SvgIcon name="plus" className="fill-current w-4 h-4" />
                <span>add New Users</span>
              </>
            }
            className="bg-blue-400 text-white "
          />
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-sm p-8">
        <AppTable
          columns={columns}
          data={users}
          total={total}
          loading={loading}
          onPaginate={handlePagination}
          noResult="No users found"
        />
      </div>
    </div>
  );
}

export default Users;
