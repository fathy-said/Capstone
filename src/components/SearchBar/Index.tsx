import { debounce } from "lodash-es";
import { useSearchParams } from "react-router-dom";
import { SvgIcon } from "../SvgIcon/Index";

import "./main.css";
import { isEmpty } from "../../utils/transform";

type Props = {
  className?: string;
  placeholder?: string;
};

export const SearchBar = ({
  className = "",
  placeholder = "أبحث عن ",
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search key if exist
  const searchValue = searchParams.get("search") || "";

  // On input action using debounce (lodash)
  const onInputAction = debounce((e) => {
    if (isEmpty(e.target.value)) {
      setSearchParams((prevState) => {
        const currentState = prevState;
        currentState.delete("search");
        currentState.set("page", "1");
        return currentState;
      });
    } else {
      setSearchParams((prevState) => {
        const currentState = prevState;
        currentState.set("search", e?.target?.value);
        currentState.set("page", "1");
        return currentState;
      });
    }
  }, 300);

  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        className="search-bar-input"
        defaultValue={searchValue}
        onInput={onInputAction}
        placeholder={placeholder}
      />
      <SvgIcon
        name="search"
        className="stroke-gray-400 w-5 h-5 absolute top-3.5 start-3"
      />
    </div>
  );
};
