import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const ToastCenter = (msg) => {
  toast(msg, {
    toastId: "authorize",
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
    bodyStyle: {
      color: "black",
      fontSize: "17px",
      fontWeight: "bold",
      fontFamily: "scdream4",
    },
    transition: Zoom,
    className: "alertNoti",
  });
};

export const ToastTopRight = (msg) => {
  toast(msg, {
    toastId: "authorize",
    autoClose: 2000,
    hideProgressBar: true,
    bodyStyle: {
      color: "black",
      fontSize: "17px",
      fontWeight: "bold",
      fontFamily: "scdream4",
    },
    className: "notify",
  });
};
export const ToastAlert = (msg) => {
  toast(msg, {
    autoClose: false,
    closeButton: true,
    closeOnClick: false,
    hideProgressBar: true,
    bodyStyle: {
      color: "black",
      fontSize: "17px",
      fontWeight: "bold",
      fontFamily: "scdream4",
    },
    className: "notify",
  });
};

export const ToastPreventAccess = (msg) => {
  toast(msg, {
    toastId: "preventAccess",
    autoClose: 2000,
    hideProgressBar: true,
    bodyStyle: {
      color: "black",
      fontSize: "17px",
      fontWeight: "bold",
      fontFamily: "scdream4",
    },
    className: "notify",
  });
};
