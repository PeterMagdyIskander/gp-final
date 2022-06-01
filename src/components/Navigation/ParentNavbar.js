import { NavLink } from "react-router-dom";
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
  const handleClick = (id) => {
    props.handleCurrentActive(id);
  };
  return (
    <ul className="flex sub-navbar">
      <li>
        <NavLink
          to="/Status"
          className={({ isActive }) => (isActive ? "nav-li active" : "nav-li")}
        >
          <h1>Status</h1>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Report"
          className={({ isActive }) => (isActive ? "nav-li active" : "nav-li")}
        >
          <h1>Report</h1>
        </NavLink>
      </li>
      <li className="nav-li">
        <div className="separator"></div>
      </li>
      <li className="nav-li">
        <NavLink to="/" onClick={signOut}>
          <h1>Sign out</h1>
        </NavLink>
      </li>
    </ul>
  );
};
export default connect()(OwnerNavbar);
