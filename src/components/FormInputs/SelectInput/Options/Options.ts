import {StylesConfig} from "react-select";

const colors = {
  primary: "#7F56D9",
  secondary: "#E9D7FE",
  bodyColor: "#667085",
  white: "#fff",
  danger: "#ef4444",
  dark: "#000",
  gray: "#D0D5DD",
  gray200: "#D0D5DD",
  gray300: "#6E6E70",
  red200: "#FAA39E",
  red400: "#DC3545",
};

const dimensions = {
  height: "auto",
  minHeight: "52px",
};

const defaultControl = (provided, state) => ({
  ...provided,
  paddingRight: "0.7rem",
  borderColor: state.isFocused ? colors.secondary : colors.gray,
  minHeight: dimensions.minHeight,
  backgroundColor: "transparent",
  borderRadius: "10px",
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: colors.primary,
  },
});

const defaultContainer = (provided, state) => ({
  ...provided,
  borderColor: state.isFocused ? colors.gray : colors.primary,
});

const defaultValueContainer = (provided) => ({
  ...provided,
  color: colors.bodyColor,
  fontSize: "15px",
  marginRight: "0rem",
  paddingRight: "0rem",
});

const defaultOption = (provided, state) => ({
  ...provided,
  color: colors.dark,
  backgroundColor: state.isSelected ? colors.secondary : colors.white,
  fontSize: "15px",
  padding: ".6rem .8rem",
  borderRadius: "8px",
  "&:active": {
    backgroundColor: colors.secondary,
  },
});

const defaultPlaceholder = (provided, state) => ({
  ...provided,
  fontWeight: 400,
  color: colors.gray300,
  fontSize: "16px",
  marginRight: state.isFocused ? ".6rem" : ".2rem",
});

const defaultDropdownIndicator = (provided, state) => {
  return {
    ...provided,
    color: colors.gray300,
    backgroundColor: "transparent",
    padding: "5px",
    borderRadius: "5px",
    transition: "all 0.15s ease-in-out",
    border: "none",
    transform: state.isFocused ? "rotate(180deg)" : "rotate(0deg)",
  };
};

const defaultMenu = (provided) => ({
  ...provided,
  border: `.1rem solid ${colors.primary}`,
  borderRadius: "10px",
  padding: ".5rem",
  zIndex: 10,
});

const defaultIndicatorSeparator = (provided) => ({
  ...provided,
  backgroundColor: "transparent",
});

const defaultAsyncControl = (css, state) => ({
  ...css,
  paddingRight: "0.75rem",
  paddingLeft: "0rem",
  borderColor: state.isFocused ? colors.primary : colors.gray,
  backgroundColor: "transparent",
  minHeight: dimensions.minHeight,
  borderRadius: "10px",
  color: colors.primary,
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: colors.primary,
  },
});

const multiValue = (css) => {
  return {
    ...css,
    backgroundColor: colors.primary,
    padding: ".2rem .5rem",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};

const multiValueLabel = (css) => ({
  ...css,
  color: colors.white,
  marginRight: "3px",
});

const multiValueRemove = (css) => ({
  ...css,
  backgroundColor: colors.white,
  padding: "0rem",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: colors.red400,
  },
});

export const defaultAsyncErrorControl = (css) => ({
  ...css,
  paddingRight: ".75rem",
  borderColor: colors.danger,
  backgroundColor: "transparent",
  borderRadius: "10px",
  minHeight: dimensions.minHeight,
  height: dimensions.height,
  boxShadow: "none",
  "&:hover": {
    borderColor: colors.danger,
  },
  fontWeight: 500,
});

const defaultAsyncMenu = (provided) => ({
  ...provided,
  border: ".1rem solid " + colors.primary,
  borderRadius: "1rem",
  padding: "1rem",
  zIndex: 10,
  marginBottom: "20px",
});

// DEFAULT STYLE
export const reactSelectCustomStyles: StylesConfig<any> = {
  control: defaultControl,
  container: defaultContainer,
  valueContainer: defaultValueContainer,
  option: defaultOption,
  indicatorSeparator: defaultIndicatorSeparator,
  placeholder: defaultPlaceholder,
  dropdownIndicator: defaultDropdownIndicator,
  menu: defaultMenu,
  multiValue,
  multiValueRemove,
  multiValueLabel,
};

export const reactSelectAsyncCustomStyles: StylesConfig<any> = {
  control: defaultAsyncControl,
  container: defaultContainer,
  valueContainer: defaultValueContainer,
  indicatorSeparator: defaultIndicatorSeparator,
  option: defaultOption,
  placeholder: defaultPlaceholder,
  dropdownIndicator: defaultDropdownIndicator,
  menu: defaultAsyncMenu,
  multiValue,
  multiValueRemove,
  multiValueLabel,
};
