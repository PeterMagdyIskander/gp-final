import { useState } from "react";
import { connect } from "react-redux";
import { Route, Navigate, Routes } from "react-router-dom"
import SignUpForm from "../Forms/SignUpForm";
const SignUp = (props) => {
  const [authed, setAuthed] = useState(false);
 
  return (
    <>
      {authed ? (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
       <SignUpForm />
      )}
    </>
  );
};
export default connect()(SignUp);
