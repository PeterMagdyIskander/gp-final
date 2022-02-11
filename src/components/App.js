import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import SignIn from "./Authentication/signIn";
import SignUp from "./Authentication/signUp";
import NavBar from "./Navigation/navBar";
import MainMenu from "./MainMenu/MainMenu";
import ReportMenu from "./Parents/ReportMenu";
import StatusMenu from "./Parents/StatusMenu";
function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Routes>

          <Route path="/" exact element={<MainMenu />} />
          <Route path="/Report" element={<ReportMenu />} />
          <Route path="/Status" element={<StatusMenu />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
         
        </Routes>
      </Fragment>
    </Router>
  );
}

export default connect()(App);
