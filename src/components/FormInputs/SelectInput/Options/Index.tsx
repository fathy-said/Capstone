import {components} from "react-select";
import {Spinner} from "../../../Spinner/Index";

export const ReactSelectCustomNoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span className="text-gray-400">لا يوجد ..</span>
    </components.NoOptionsMessage>
  );
};

export const LoadingMessage = (props) => {
  return (
    <div {...props.innerProps} className="py-2 flex justify-center">
      <Spinner size="xs" />
    </div>
  );
};
