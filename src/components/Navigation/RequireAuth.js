import { useDispatch } from "react-redux";
import {
  useLocation,
  Navigate,
} from "react-router-dom";
 import { isAuthedForRouting } from "../../ReduxStore/actions/authedUser";
const RequireAuth = ({children }) => {
  let location = useLocation();
  const dispatch=useDispatch()
  if (!isAuthedForRouting(dispatch)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default (RequireAuth);
