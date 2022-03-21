import { useState } from "react";
import { connect } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom";
const SignUp = (props) => {
  const { dispatch } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(false);
  const [invalidPasswordVisible, setInvalidPasswordVisible] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [inavlidParams, setinavlidParams] = useState(false);
  const handleSignUp = () => {
    if (username === "" || name === "" || password === "" || owner === "") {
      setinavlidParams(true);
      return;
    }
  };
  const validateRePassword = (val) => {
    setInvalidPasswordVisible(false);
    setAuthed(dispatch());
    if (val === password) {
      setInvalidPasswordVisible(true);
    }
  };
  return (
    <>
      {authed ? (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="sign-in-page">
          <div style={{ paddingTop: "50px" }}>
            <input
              type="input"
              required
              className="sign-in-input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="username"
            />
            <br />
            <br />
            <input
              className="sign-in-input"
              type="input"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="full name"
            />
            <br />
            <br />
            <input
              type="password"
              required
              className="sign-in-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            <br />
            <br />
            <input
              type="password"
              className="sign-in-input"
              onChange={(e) => {
                validateRePassword(e.target.value);
              }}
              placeholder="re-enter Password"
            />
            <br />
            {inavlidParams ? (
              <p style={{ color: "red" }}>please enter valid data</p>
            ) : !invalidPasswordVisible ? (
              <p style={{ color: "red" }}>
                please enter the same passowrd twice
              </p>
            ) : null}
            <br />
            <div style={{ textAlign: "left", paddingLeft: "22%" }}>
              <input
                type="radio"
                id="owner"
                name="owner"
                value="owner"
                required
                onChange={(e) => {
                  setOwner(true);
                }}
              />
              <label htmlFor="owner">owner</label>
              <br />
              <input
                type="radio"
                id="user"
                name="owner"
                value="user"
                onChange={(e) => {
                  setOwner(false);
                }}
              />
              <label htmlFor="user">normal User</label>
            </div>

            <button className="signup-btn" onClick={() => handleSignUp()}>
              sign up
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default connect()(SignUp);
