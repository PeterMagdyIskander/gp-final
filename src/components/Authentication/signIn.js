import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { setAuthedUser } from "../../actions/authedUser";
import { Route, Navigate, Routes } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../AWS/UserPool";
import { getParent } from "../../utils/api";
const SignIn = (props) => {
  const { dispatch } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [parent, setParent] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      username: "abadeer@hotmail.com",
      password: "abadir_2000",
    },
    onSubmit: (values) => {
      Login(values.username, values.password);
    },
  });

  return (
    <>
      {authed ? (
        <Routes>
          <Route path="*" element={<Navigate to="/report" />} />
        </Routes>
      ) : (
        <div className="sign-in-page">
          <div className="container-centered">
            <form className="report-data-entry" onSubmit={formik.handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button type="submit">Login</button>
            </form>
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
