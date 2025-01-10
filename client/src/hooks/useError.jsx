import { useEffect } from "react";
import { toast } from "react-toastify";

export const useError = (errors = []) => {
  useEffect(() => {
    errors.forEach((error) => {
      if (error?.isError) {
        if (error?.isFallback) {
          error?.fallBack();
        } else {
          console.error(error);
          toast.error(error?.error?.data?.message || "Something went wrong");
        }
      }
    });
  }, [errors]);
};
