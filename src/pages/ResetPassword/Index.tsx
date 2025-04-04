import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/FormInputs/TextInput/Index";
import { Button } from "../../components/Ui/Button/Index";
import * as yup from "yup";
import { useAuthHook } from "../../hooks/auth";
import { Link, useParams, useNavigate } from "react-router-dom";

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

interface UserInfo {
  name: string;
  email: string;
}

export default () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // Use loading state from auth hook
  const { resetPassword, loading } = useAuthHook();

  // Yup schema
  const schema = yup
    .object({
      newPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("This field is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("This field is required"),
    })
    .required();

  // Use form
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  // on submit CTA
  const onSubmit = async (inputs: ResetPasswordFormInputs) => {
    if (!token) {
      console.error("Reset token is missing");
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword: inputs.newPassword,
      });
      // Navigate to login on success
      navigate("/login", {
        state: {
          message:
            "Password reset successfully. Please login with your new password.",
        },
      });
    } catch (error) {
      // Error handling is already done in the hook
      console.error("Error resetting password:", error);
    }
  };

  // Get user info from URL or context
  const userInfo: UserInfo = {
    name: "amaneul",
    email: "amaneul@gmail.com",
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex flex-col items-center mb-4">
        <h3 className="text-2xl font-semibold text-center">Reset Password</h3>
        <Link to="/login" className="text-gray-600 hover:text-gray-800 mt-2">
          Go Back
        </Link>
      </div>

      <div className="border-b border-gray-200 my-4"></div>

      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
          {/* User avatar could be fetched from API */}
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.name}&background=random`}
            alt="User"
          />
        </div>
        <div>
          <p className="font-medium">{userInfo.name}</p>
          <p className="text-sm text-gray-600">{userInfo.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextInput
            label="New Password"
            name="newPassword"
            type="password"
            errors={errors}
            control={control}
          />
        </div>

        <div className="mb-6">
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            errors={errors}
            control={control}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            text="Save Password"
            className="  text-white py-2 px-4 rounded"
            loading={loading}
          />
          <Link to="/login" className="text-gray-500 hover:text-blue-480">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
