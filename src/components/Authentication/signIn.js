import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../utils/api";
import { setAuthedUser } from "../../actions/authedUser";
import { Route, Navigate, Routes } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../AWS/UserPool";


const SignIn = (props) => {
  const { dispatch } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [idToken, setIdToken] = useState(null);
 
  const [authed, setAuthed] = useState(false);

const Login = (event) => {
  event.preventDefault();
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
      setIdToken(JSON.stringify(data.getIdToken()));
      setAuthed(true);
        dispatch(setAuthedUser(data.getIdToken()));
    },
    onFailure: (err) => {
      console.error("onFailure: ", err);
      setInvalidPassword(true)
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
        <div className="sign-in-page">
          <div style={{ paddingTop: "50px" }}>
            <input
              type="input"
              className="sign-in-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Username"
            />
            <br />
            <br />
            <input
              type="password"
              className="sign-in-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <br />
            <br />
            <p hidden={!invalidPassword || authed} style={{ color: "red" }}>
              invalid username or password
            </p>
            <button
              className="login-btn"
              onClick={(e) => {
                Login(e);
              }}
            >
              Login
            </button>

            <br />
            <br />

            <Link to="/signup">Don't Have an account?</Link>
          </div>
        </div>
      )}
    </>
  );
};
export default connect()(SignIn);
