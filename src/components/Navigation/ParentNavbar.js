import { Link } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/app.css";
const OwnerNavbar = (props) => {
  const { dispatch } = props;
  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
  };
  return (
        <ul className="flex sub-navbar">
          {/* <li className="nav-li">
            <Link to="/Profile">
              <h1>Profile</h1>
            </Link>
          </li> */}
          <li className="nav-li">
            <Link to="/Status">
              <h1>Status</h1>
            </Link>
          </li>
          <li className="nav-li">
            <Link to="/Report">
              <h1>Report</h1>
            </Link>
          </li>
          <li className="nav-li">
            <div className="separator"></div>
          </li>
          <li className="nav-li">
            <Link to="/" onClick={signOut}>
              <h1>Sign out</h1>
            </Link>
          </li>
        </ul>
  );
};
export default connect()(OwnerNavbar);
