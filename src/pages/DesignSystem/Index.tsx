import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useEffectOnce } from "react-use";
import * as yup from "yup";
import { AppTable } from "../../components/AppTable/Index";
import { TableControls } from "../../components/AppTable/components/Controls/Controls";
import { CheckBoxInput } from "../../components/FormInputs/CheckBoxInput/Index";
import { DateInput } from "../../components/FormInputs/DateInput/Index";
import { RadioInput } from "../../components/FormInputs/RadioInput/Index";
import { SelectInput } from "../../components/FormInputs/SelectInput/Index";
import { TextInput } from "../../components/FormInputs/TextInput/Index";
import { Uploader } from "../../components/FormInputs/Uploader/Index";
import { SvgIcon } from "../../components/SvgIcon/Index";
import { Accordion } from "../../components/Ui/Accordion/Index";
import { Avatar } from "../../components/Ui/Avatar/Index";
import { Badge } from "../../components/Ui/Badge/Index";
import { Button } from "../../components/Ui/Button/Index";

export default () => {
  const [posts, setPosts] = useState([]);

  // Yup schema
  const schema = yup
    .object({
      img: yup.mixed().required("هذا الحقل مطلوب"),
      imgValue: yup.mixed().required("هذا الحقل مطلوب"),
      file: yup.mixed().required("هذا الحقل مطلوب"),
      firstname: yup.string().required("هذا الحقل مطلوب"),
      lastname: yup.string().required("هذا الحقل مطلوب"),
      content: yup.string().required("هذا الحقل مطلوب"),
      type: yup.string().required(),
      isAgree: yup
        .boolean()
        .required()
        .test("is-true", "Value must be true", (value) => value === true),
      status: yup.array().required("هذا الحقل مطلوب").min(1, "هذا الحقل مطلوب"),
      status2: yup.object().required("هذا الحقل مطلوب"),
      status3: yup.object().required("هذا الحقل مطلوب"),
      firstDate: yup.date().required("هذا الحقل مطلوب"),
      dateRange: yup
        .array()
        .required("هذا الحقل مطلوب")
        .length(2, "يجب ان لاتقل على ٢")
        .test(
          "valid-date-range",
          "التاريخ الأول يجب أن يكون قبل التاريخ الثاني",
          (value) => {
            const [startDate, endDate] = value;
            return (
              startDate !== null && endDate !== null && startDate <= endDate
            );
          }
        ),
    })
    .required();

  // Use form
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dateRange = watch("dateRange");
  console.log(dateRange);

  useEffectOnce(() => {
    // setValue("firstname", "ahmed");
    // setValue("lastname", "ahmed");
    // setValue("content", "ahmed");
    // setValue("type", "1");
    // setValue("isAgree", true);
    // setValue("status", [
    //   {
    //     label: "Option 5",
    //     value: 5,
    //   },
    // ]);
    setValue("dateRange", [
      new Date("2024-04-17T22:00:00.000Z"),
      new Date("2024-04-24T22:00:00.000Z"),
    ]);
  });
  useEffect(() => {
    setValue("imgValue", [
      {
        path: "https://images.squarespace-cdn.com/content/v1/5f74ce969da67d6f6075bade/1601665262705-TV2TEQI3JH4NDLPBIUKC/ke17ZwdGBToddI8pDm48kFEo-VzwHLv6xsN4TtBivNZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmJdLpeZW_ttQnjXwTxihzWNNcr3qND5NVbUPIEq7D_isUuuvQKBpL19fqDETYmdtt/38705676_10158540465144616_7004956299586699264_o.jpg",
        type: "PATH",
      },
      {
        path: "https://images.squarespace-cdn.com/content/v1/5f74ce969da67d6f6075bade/1601665262705-TV2TEQI3JH4NDLPBIUKC/ke17ZwdGBToddI8pDm48kFEo-VzwHLv6xsN4TtBivNZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmJdLpeZW_ttQnjXwTxihzWNNcr3qND5NVbUPIEq7D_isUuuvQKBpL19fqDETYmdtt/38705676_10158540465144616_7004956299586699264_o.jpg",
        type: "PATH",
      },
      {
        path: "https://images.squarespace-cdn.com/content/v1/5f74ce969da67d6f6075bade/1601665262705-TV2TEQI3JH4NDLPBIUKC/ke17ZwdGBToddI8pDm48kFEo-VzwHLv6xsN4TtBivNZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmJdLpeZW_ttQnjXwTxihzWNNcr3qND5NVbUPIEq7D_isUuuvQKBpL19fqDETYmdtt/38705676_10158540465144616_7004956299586699264_o.jpg",
        type: "PATH",
      },
    ]);
  }, []);
  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    {
      label: "Option 1",
      value: 1,
    },
    {
      label: "Option 2",
      value: 2,
    },
    {
      label: "Option 3",
      value: 3,
    },
    {
      label: "Option 4",
      value: 4,
    },
    {
      label: "Option 5",
      value: 5,
    },
  ];

  const filterColors = async (inputValue: string = "") => {
    try {
      console.log(inputValue);

      const data = await fetch("https://jsonplaceholder.typicode.com/todos");
      const response = await data.json();

      setPosts(response);

      return response?.map((item) => {
        return { label: item?.title, value: item?.id };
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const promiseOptions = async (inputValue: string) => {
    return await filterColors(inputValue);
  };

  const onResetAction = async () => {
    await reset();
  };

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
      },
      {
        header: "العنوان",
        accessorKey: "title",
      },
      {
        header: "",
        accessorKey: "controls",
        cell: (props) => {
          return <TableControls value={props?.original} baseUrl="/projects" />;
        },
      },
    ],
    []
  );

  return (
    <div className="container py-10 bg-white my-20">
      <h2 className="text-4xl font-bold text-center">Design system</h2>

      <div className="mt-10">
        <div className="flex gap-4 flex-wrap">
          <Button loading={true} />
          <Button />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-10"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <TextInput
              label="إسم المشروع"
              name="firstname"
              errors={errors}
              control={control}
            />

            <TextInput
              label="إسم الأخير"
              name="lastname"
              errors={errors}
              control={control}
            />
          </div>

          <TextInput
            type="textarea"
            label="المحتوى"
            name="content"
            errors={errors}
            control={control}
          />

          <div className="flex flex-col gap-2 mt-6">
            <RadioInput
              defaultValue="0"
              label="Type A"
              name="type"
              control={control}
              errors={errors}
            />

            <RadioInput
              defaultValue="1"
              label="Type B"
              name="type"
              control={control}
              errors={errors}
            />
          </div>

          <CheckBoxInput
            name="isAgree"
            control={control}
            errors={errors}
            className="mt-4"
            defaultValue={false}
            label="أوافق .."
          />

          <SelectInput
            label="اوأفق على ذلك"
            options={options}
            name="status"
            control={control}
            errors={errors}
            isMulti
          />

          <SelectInput
            label="أوافق"
            options={options}
            name="status2"
            control={control}
            errors={errors}
          />

          <SelectInput
            label="أوافق"
            type="ASYNC"
            loadOptions={promiseOptions}
            name="status3"
            control={control}
            errors={errors}
          />

          <DateInput
            label="أوافق"
            name="firstDate"
            control={control}
            errors={errors}
          />

          <DateInput
            label="أوافق"
            name="dateRange"
            control={control}
            errors={errors}
            hasRange={true}
          />
          {/* =====uploadImageDefaultValue========= */}
          <Uploader
            placeholder={` SVG, PNG, JPG or GIF
                        (max. 800x400px)`}
            acceptType={["jpg", "gif", "png", "svg"]}
            targetNameShow={"الملف"}
            multiple={true}
            showCropperModalBox={true}
            UploadType={"IMAGE"}
            errors={errors}
            control={control}
            name={"imgValue"}
          />
          {/* =====uploadImage========= */}
          <Uploader
            placeholder={` SVG, PNG, JPG or GIF
                        (max. 800x400px)`}
            acceptType={["jpg", "gif", "png", "svg"]}
            targetNameShow={"الملف"}
            multiple={true}
            showCropperModalBox={true}
            UploadType={"IMAGE"}
            errors={errors}
            control={control}
            name={"img"}
          />
          {/* =====uploadFile========= */}
          <Uploader
            placeholder={` SVG, PNG, JPG or GIF
                        (max. 800x400px)`}
            acceptType={["pdf"]}
            targetNameShow={"الملف"}
            multiple={true}
            showCropperModalBox={false}
            UploadType={"FILE"}
            errors={errors}
            control={control}
            name={"file"}
          />
          <div className="flex flex-col gap-y-2 mt-6">
            <Button type="submit" />
            <Button
              text="إعادة تعيين"
              onClick={onResetAction}
              className="bg-transparent text-blue-450 border-blue-450"
            />
          </div>
        </form>

        <div className="bg-gray-100/40 rounded-xl p-6 mt-10">
          <h3 className="text-2xl font-bold text-center">
            Svg Icons:
            <p className="text-sm font-normal mt-2">
              Add icon to
              <span className="px-2 py-1 bg-gray-100 rounded-lg mx-2">
                assets / icons
              </span>
              and then using
              <span className="px-2 py-1 bg-gray-100 rounded-lg mx-2">
                SvgIcon
              </span>
              component to retrieve icon by name
            </p>
          </h3>
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <SvgIcon name="check" className="w-10 h-10" />
            <SvgIcon name="cloud" className="w-10 h-10" />
          </div>
        </div>

        <Accordion
          header="title"
          className="border border-gray-100 rounded-lg mt-10"
        >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </Accordion>

        <div className="flex flex-wrap gap-4 mt-10">
          <Badge type="danger" text="متعثر" />
          <Badge type="success" text="مكتمل" />
          <Badge type="info" text="جاري" />
          <Badge type="warning" text="تحت الصرف" />
          <Badge type="infinit" text="نهائية" />
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Avatar size="w-13 h-13" className="rounded-full" />
          <Avatar
            size="w-13 h-13"
            image="/images/avatar-1.png"
            className="rounded-full"
          />
          <Avatar
            size="w-10 h-10"
            image="/images/avatar-1.png"
            className="rounded-full"
          />
        </div>

        <AppTable
          data={posts}
          columns={columns}
          loading={false}
          className="mt-10"
          total={40}
          onPaginate={(e) => console.log(e)}
        />
      </div>
    </div>
  );
};
