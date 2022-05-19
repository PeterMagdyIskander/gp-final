import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Authentication/signIn";
import SignUp from "./Authentication/signUp";
import NavBar from "./Navigation/navBar";
import MainMenu from "./MainMenu/MainMenu";
import ReportMenu from "./Parents/ReportMenu";
import StatusMenu from "./Parents/StatusMenu";
import Found from "./User/Found";
import ProfileMenu from "./Parents/ProfileMenu";
import { useEffect } from "react";
import { checkAutoLogin } from "../ReduxStore/actions/authedUser";
import RequireAuth from "./Navigation/RequireAuth";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch);
  }, []);

  return (
    <Router>
      <Fragment>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route
              path="/Report"
              element={
                <RequireAuth>
                  <ReportMenu />
                </RequireAuth>
              }
            />
            <Route
              path="/Status"
              element={
                <RequireAuth>
                  <StatusMenu />
                </RequireAuth>
              }
            />
            <Route path="/Found" element={<Found />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfileMenu />
                </RequireAuth>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}
export default App;
