import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import { Route, Navigate, Routes } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../AWS/UserPool";
import { getParent } from "../../utils/api";
import SignInForm from '../Forms/SignInForm'

const SignIn = (props) => {
  const { dispatch } = props;
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [authed, setAuthed] = useState(false);

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
        console.log("onSuccess: ", data.getIdToken());
        getParent().then((res) => {
          dispatch(setAuthedUser({ ...data.getIdToken(), ...res }));
          setAuthed(true);
        });
      },
      onFailure: (err) => {
        console.error("onFailure: ", err);
        setInvalidPassword(true);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };
  return (
    <>
      {authed ? (
        <Routes>
          <Route path="*" element={<Navigate to="/report" />} />
        </Routes>
      ) : (
          <SignInForm onSubmit={({email,password})=>{Login(email,password)}}/>
      )}
    </>
  );
};
export default connect()(SignIn);
