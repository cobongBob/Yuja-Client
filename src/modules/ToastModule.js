import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const ToastCenter = (msg) => {
  toast(msg, {
    toastId: 'authorize',
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,
    hideProgressBar: true,
    bodyStyle: {
      color: 'black',
      fontSize: '17px',
      fontWeight: 'bold',
      fontFamily: 'scdream4',
    },
    transition: Zoom,
    className: 'alertNoti',
  });
};

export const ToastTopRight = (msg) => {
  toast(msg, {
    toastId: 'authorize',
    autoClose: 2000,
    hideProgressBar: true,
    position: 'bottom-right',
    bodyStyle: {
      color: 'black',
      fontSize: '17px',
      fontFamily: 'scdream5',
    },
    className: 'notify',
  });
};
export const ToastAlert = (msg) => {
  toast(msg, {
    position: 'bottom-right',
    autoClose: 2000,
    closeButton: true,
    closeOnClick: true,
    hideProgressBar: true,
    bodyStyle: {
      display: 'block',
      color: 'black',
      fontSize: '15px',
      fontWeight: 'bold',
      fontFamily: 'scdream4',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    className: 'notify',
  });
};
export const ToastAlertNoDupl = (msg) => {
  toast(msg, {
    position: 'bottom-right',
    toastId: 'preventDuplicate',
    autoClose: false,
    closeButton: true,
    closeOnClick: true,
    hideProgressBar: true,
    bodyStyle: {
      color: 'black',
      fontSize: '17px',
      fontWeight: 'bold',
      fontFamily: 'scdream4',
    },
    className: 'notify',
  });
};

export const ToastPreventAccess = (msg) => {
  toast(msg, {
    toastId: 'preventAccess',
    autoClose: 2000,
    hideProgressBar: true,
    bodyStyle: {
      color: 'black',
      fontSize: '17px',
      fontWeight: 'bold',
      fontFamily: 'scdream4',
    },
    className: 'notify',
  });
};
