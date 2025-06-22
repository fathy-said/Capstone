import { $api } from "../client";
import { useAsyncRetry } from "react-use";

// Custom hook for fetching notifications

export const useNotifications = () => {
  const { value, loading, retry } = useAsyncRetry(async () => {
    const { data } = await $api.get(`/notifications/all`);
    console.log("useNotifications", data);
    return data;
  }, []);

  return { value, loading, retry };
};
