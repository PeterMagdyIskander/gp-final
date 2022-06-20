import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Authentication/signIn";
import SignUp from "./Authentication/signUp";
import NavBar from "./Navigation/navBar";
import MainMenu from "./MainMenu/MainMenu";
import ReportMenu from "./Parents/ReportMenu";
import StatusMenu from "./Parents/StatusMenu";
import Found from "./User/Found";
import RequireAuth from "./Navigation/RequireAuth";
import { ToastContainer } from "react-toastify";
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
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <ToastContainer />
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
