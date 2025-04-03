import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {TextInput} from "../../components/FormInputs/TextInput/Index";
import {Button} from "../../components/Ui/Button/Index";
import * as yup from "yup";
import {useAuthHook} from "../../hooks/auth";
import {Link} from "react-router-dom";

export default () => {
  // Yup schema
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("This field is required"),
      password: yup.string().required("This field is required"),
    })
    .required();

  // Use form
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {loading, login} = useAuthHook();

  // on submit CTA
  const onSubmit = async (inputs) => {
    await login(inputs);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        Login
      </h3>
      <p className="text-gray-450 text-center mt-4 text-sm md:text-base">
        Welcome! Please enter your credentials
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <TextInput
          label="Email"
          name="email"
          errors={errors}
          control={control}
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          className="mt-4"
          errors={errors}
          control={control}
        />

        <div className="flex justify-end mt-2">
          <Link to="/forget-password" className="text-blue-500 hover:text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          text="Login"
          className="w-full mt-6"
          loading={loading}
        />
      </form>
    </div>
  );
};
