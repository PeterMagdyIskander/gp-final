import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { connect } from "react-redux";
import { setChildren } from "../../ReduxStore/actions/children";
import { setItems } from "../../ReduxStore/actions/items";
import "../../styles/app.css";
const OwnerNavbar = (props) => {
  const { dispatch } = props;
  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
    
    dispatch(setChildren(null));
    dispatch(setItems(null));
  };

  return (
    <nav className="flex sub-navbar">
      <NavLink to="/Status">Status</NavLink>
      <NavLink to="/Report">Report</NavLink>
      <NavLink to="/Profile">Profile</NavLink>
      <NavLink to="/" onClick={signOut}>
        Sign out
      </NavLink>
    </nav>
  );
};
export default connect()(OwnerNavbar);
