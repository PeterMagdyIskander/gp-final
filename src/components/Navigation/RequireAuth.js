import {
  useLocation,
  Navigate,
} from "react-router-dom";
 import { isAuthedForRouting } from "../../ReduxStore/actions/authedUser";
const RequireAuth = ({children }) => {
  let location = useLocation();
  if (!isAuthedForRouting()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default (RequireAuth);
