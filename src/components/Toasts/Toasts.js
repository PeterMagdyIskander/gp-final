import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (props) => {
  if(!props.success)return <></>
  
  else if (props.success)
    toast.success("Uploaded Successfully!", {
      position: props.position,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  else
    toast.error("Upload unsuccessful!", {
      position: props.position,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  return <ToastContainer limit={1}/>;
};
export default Toast;
