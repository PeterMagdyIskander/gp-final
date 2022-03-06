import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Toast = (props) => {
  console.log('hi');
  if (props.success != null && props.success)
    toast.success("Uploaded Successfully!", {
      position: props.position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  else if (props.success != null)
    toast.error("Upload unsuccessful!", {
      position: props.position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return <ToastContainer />;
};
export default Toast;
