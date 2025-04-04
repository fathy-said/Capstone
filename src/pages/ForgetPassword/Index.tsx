import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/FormInputs/TextInput/Index";
import { Button } from "../../components/Ui/Button/Index";
import * as yup from "yup";
import { useAuthHook } from "../../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface ForgetPasswordFormInputs {
  academicMail: string;
  academicId: string;
}

export default () => {
  const navigate = useNavigate();
  const { sendPasswordResetCode, loading } = useAuthHook();

  // Yup schema
  const schema = yup
    .object({
      academicMail: yup
        .string()
        .email("Invalid academic email address")
        .required("This field is required"),
      academicId: yup.string().required("This field is required"),
    })
    .required();

  // Use form
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgetPasswordFormInputs>({
    resolver: yupResolver(schema),
  });

  // on submit CTA
  const onSubmit = async (inputs: ForgetPasswordFormInputs) => {
    try {
      const response = await sendPasswordResetCode(inputs);
      // Show success message
      toast.success("Password reset code has been sent to your email");
      // Redirect to reset password page with token
      if (response?.data?.token) {
        navigate(`/reset-password/${response.data.token}`);
      } else {
        toast.error("Failed to receive reset code");
      }
    } catch (error) {
      // Error handling is already done in the hook
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-2xl font-semibold text-center">Forgot Password</h3>
      <div className="border-b border-gray-200 my-4"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mb-6">
          <TextInput
            label="Academic Email"
            name="academicMail"
            errors={errors}
            control={control}
          />
        </div>

        <div className="mb-6">
          <TextInput
            label="Academic ID"
            name="academicId"
            errors={errors}
            control={control}
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            type="submit"
            text="Send Code"
            className=" text-white py-2 px-4 rounded"
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
