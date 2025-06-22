import { useAsyncRetry } from "react-use";
import { $api2 } from "../client";

export const useArchive = () => {
  const { value, loading, retry } = useAsyncRetry(async () => {
    const { data } = await $api2.get(`archive`);
    return data;
  }, []);

  return { value, loading, retry };
};

export const useArchiveDetails = (id: string) => {
  if (!id) {
    return { value: null, loading: false, retry: () => {} };
  }
  const { value, loading, retry } = useAsyncRetry(async () => {
    const { data } = await $api2.get(`archive/${id}`);
    return data;
  }, [id]);

  return { value, loading, retry };
};
