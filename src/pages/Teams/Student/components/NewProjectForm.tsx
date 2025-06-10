import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Ui/Button/Index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../../../../components/FormInputs/TextInput/Index";
import { Uploader } from "../../../../components/FormInputs/Uploader/Index";
import { ModalDialog } from "../../../../components/ModalDialog/Index";

const schema = yup.object({
  title: yup.string().required(),
  type: yup.string().required(),
  leader: yup.string().required(),
  supervisor: yup.string().optional(),
  description: yup.string().optional(),
  file: yup.mixed().required(),
});
interface NewProjectFormProps {
  state: boolean;
  setState: (state: boolean) => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ state, setState }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ModalDialog
      isOpen={state}
      onClose={() => setState(false)}
      title="New Project"
      size="md"
      contentClassName="p-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="flex flex-col  w-full justify-stretch items-start gap-4 mb-8">
          <TextInput
            className="w-full"
            label="Project name"
            name="title"
            control={control}
            errors={errors}
          />

          <TextInput
            className="w-full"
            label="Type"
            name="type"
            control={control}
            errors={errors}
          />
          <TextInput
            className="w-full"
            label="Leader"
            name="leader"
            control={control}
            errors={errors}
          />
          <TextInput
            className="w-full"
            label="supervisor"
            name="supervisor"
            control={control}
            errors={errors}
          />

          <TextInput
            type="textarea"
            className="w-full"
            label="Project description"
            name="description"
            control={control}
            errors={errors}
          />
          <Uploader
            className="w-full"
            placeholder={` PDF, JPG, PNG, GIF or XLSX
                                    `}
            acceptType={["pdf", "jpg", "png", "gif", "xlsx"]}
            targetNameShow={"File"}
            multiple={true}
            showCropperModalBox={false}
            UploadType={"FILE"}
            errors={errors}
            control={control}
            isDelete={true}
            name={"file"}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => setState(false)}
            text="Cancel"
            className="px-4 py-2  bg-white text-blue-400 rounded border-[1px] border-blue-400"
          />
          <Button
            type="submit"
            text="Save Changes"
            className="px-4 py-2   text-white rounded "
          />
        </div>
      </form>
    </ModalDialog>
  );
};

export default NewProjectForm;
