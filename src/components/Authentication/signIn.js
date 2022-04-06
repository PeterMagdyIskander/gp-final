import { connect } from "react-redux";
import {
  setAuthedUser,
  runLogoutTimer,
} from "../../ReduxStore/actions/authedUser";
import { useLocation, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../AWS/UserPool";
import SignInForm from "../Forms/SignInForm";

const SignIn = (props) => {
  const { dispatch } = props;
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const Login = (email, password) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        dispatch(setAuthedUser(data.getIdToken()));
        runLogoutTimer(
          dispatch,
          new Date(data.getIdToken().payload.exp * 1000).getTime() -
            new Date().getTime()
        );
        navigate(from, { replace: true });
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };
  return (
    <SignInForm
      onSubmit={({ email, password }) => {
        Login(email, password);
      }}
    />
  );
};
export default connect()(SignIn);
