import { toast } from "react-toastify";

export const displaySuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  });
};
export const displayWorrningToast = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  });
};

export const displayErrorToast = (error) => {
  let errorMessage;
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.message) {
        if (error.response.data.message[0]) {
          errorMessage = error.response.data.message[0];
        } else {
          errorMessage = "An error occurred";
        }
      } else {
        errorMessage = "An error occurred";
      }
    } else {
      errorMessage = "An error occurred";
    }
  } else {
    errorMessage = "An error occurred";
  }

  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  });
};
