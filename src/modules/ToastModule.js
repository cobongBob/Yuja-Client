import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback } from 'react';
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

export const ToastPreventAccess = (msg) => {
  toast(msg, {
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
}

