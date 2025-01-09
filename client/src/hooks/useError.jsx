import { useEffect } from "react";
import { toast } from "react-toastify";

export const useError = (errors = []) => {
  useEffect(() => {
    errors.forEach((error) => {
      if (error?.isError) {
        if (error?.isFallback) {
          error?.fallBack();
        } else {
          toast.error(error?.data?.message || "Something went wrong");
        }
      }
    });
  }, [errors]);
};
