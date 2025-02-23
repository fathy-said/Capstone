import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {TextInput} from "../../components/FormInputs/TextInput/Index";
import {Button} from "../../components/Ui/Button/Index";
import * as yup from "yup";
import {useAuthHook} from "../../hooks/auth";

export default () => {
  // Yup schema
  const schema = yup
    .object({
      email: yup
        .string()
        .email("البريد الإلكتروني غير صحيح")
        .required("هذا الحقل مطلوب"),
      password: yup.string().required("هذا الحقل مطلوب"),
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
    <div>
      <h3 className="text-2xl md:text-3xl font-semibold text-center">
        تسجيل الدخول
      </h3>
      <p className="text-gray-450 text-center mt-4 text-sm md:text-base">
        مرحبا بك ! من فضلك ادخل البيانات التالية
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <TextInput
          label="البريد الإلكتروني"
          name="email"
          errors={errors}
          control={control}
        />

        <TextInput
          label="كلمة المرور"
          name="password"
          type="password"
          className="mt-4"
          errors={errors}
          control={control}
        />

        <Button
          type="submit"
          text="تسجيل الدخول"
          className="w-full mt-6"
          loading={loading}
        />
      </form>
    </div>
  );
};
