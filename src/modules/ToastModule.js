import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const ToastCenter = (msg) => {
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

export default ToastCenter;
