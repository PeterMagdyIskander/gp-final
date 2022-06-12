import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SignIn from "./Authentication/signIn";
import SignUp from "./Authentication/signUp";
import NavBar from "./Navigation/navBar";
import MainMenu from "./MainMenu/MainMenu";
import ReportMenu from "./Parents/ReportMenu";
import StatusMenu from "./Parents/StatusMenu";
import Found from "./User/Found";
import ProfileMenu from "./Parents/ProfileMenu";
import RequireAuth from "./Navigation/RequireAuth";

function App() {
  return (
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
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Fragment>
  );
}
export default App;

/**
 * <div class="innerYellow">

      </div>
      <div class="triangle-up">

      </div>
 */
