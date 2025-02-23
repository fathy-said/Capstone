import { useAsync } from "react-use";
import { $api } from "../client";
import { hasQueryParams } from "../utils/transform";

type OptionsType = {
  url: string;
  label?: string;
  value?: any;
};

export const useAsyncOptions = () => {
  const fetch = async (options: OptionsType, inputValue) => {
    const query = hasQueryParams(options?.url) ? "&" : "?";
    try {
      const {
        data: { records },
      } = await $api.get(
        `${options?.url}${query}${inputValue ? `search=${inputValue}` : ""}`
      );

      return records?.map((item) => {
        return {
          label: item?.[options?.label || "name"],
          value: options?.value ? item?.[options?.value] : item,
        };
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getOptions = (options: OptionsType) => async (inputValue) => {
    try {
      return await fetch(options, inputValue);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getOptions,
  };
};

export const useExcelFile = (url: any) => {
  if (!url) return { value: {}, loading: false };

  const { value, loading } = useAsync(async () => {
    const {
      data: { record },
    } = await $api.get(url);

    return record;
  }, [url]);

  return { value, loading };
};
