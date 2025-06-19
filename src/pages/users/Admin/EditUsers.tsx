import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SvgIcon } from "../../../components/SvgIcon/Index";
import { Button } from "../../../components/Ui/Button/Index";
import { TextInput } from "../../../components/FormInputs/TextInput/Index";
import { SelectInput } from "../../../components/FormInputs/SelectInput/Index";
import { OptionInterface } from "../../../components/FormInputs/SelectInput/Index";

function EditUsers() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "",
      status: "",
    },
  });

  // Role options for select field
  const roleOptions: OptionInterface[] = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Supervisor", value: "supervisor" },
  ];

  // Status options for select field
  const statusOptions: OptionInterface[] = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      setFetchingUser(true);
      try {
        // In a real app, you'd fetch data from your API using the userId
        // For now, we'll simulate an API call with mock data
        console.log(`Fetching user with ID ${userId}`);

        setTimeout(() => {
          // Mock user data
          const userData = {
            id: parseInt(userId),
            fullName: "John Smith",
            email: "john.smith@example.com",
            phone: "123-456-7890",
            role: "admin",
            status: "active",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            dateCreated: "2023-01-15T10:30:00",
          };

          // Reset form with user data
          reset({
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone || "",
            role: userData.role,
            status: userData.status,
          });

          setFetchingUser(false);
        }, 1000); // Simulate API delay
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
        setFetchingUser(false);
      }
    };

    fetchUserData();
  }, [userId, reset]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    setLoading(true);
    // In a real app, you'd update this data to your API
    console.log("Form data to update:", data);
    console.log("User ID:", userId);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // Navigate back to users list after successful update
      navigate("/admin/users");
    }, 1000);
  };

  if (error) {
    return (
      <div className="container pt-10">
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
          <h1 className="text-2xl font-bold">Edit User</h1>
        </div>

        <div className="bg-white rounded-md shadow-sm p-6 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <Button
            text="Try Again"
            className="bg-blue-400 text-white"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {fetchingUser ? (
          <div className="p-6 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full max-w-md bg-gray-200 rounded mb-2.5"></div>
              <div className="h-4 w-full max-w-md bg-gray-200 rounded mb-2.5"></div>
              <div className="h-4 w-3/4 max-w-md bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">User Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <TextInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter full name"
                    control={control}
                    rules={{
                      required: "Full name is required",
                    }}
                    errors={errors}
                  />
                </div>

                {/* Email */}
                <div>
                  <TextInput
                    label="Email"
                    name="email"
                    placeholder="Enter email address"
                    type="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    errors={errors}
                  />
                </div>

                {/* Phone */}
                <div>
                  <TextInput
                    label="Phone (optional)"
                    name="phone"
                    placeholder="Enter phone number"
                    control={control}
                    errors={errors}
                  />
                </div>

                {/* Password */}
                <div>
                  <TextInput
                    control={control}
                    name="password"
                    type="password"
                    label="Password"
                    errors={errors}
                    showEye
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <TextInput
                    control={control}
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    errors={errors}
                    showEye
                    rules={{
                      required: "Please confirm your password",
                      // Would typically add validation to match password field
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form buttons */}
            <div className="p-6  border-t flex justify-end gap-3">
              <Button
                text="Cancel"
                className="bg-gray-200 hover:bg-gray-300"
                type="button"
                onClick={handleGoBack}
              />
              <Button
                text="Update User"
                className="bg-blue-400 text-white"
                type="submit"
                loading={loading}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditUsers;
