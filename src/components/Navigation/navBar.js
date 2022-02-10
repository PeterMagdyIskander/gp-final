import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OwnerNavBar from "./OwnerNavbar";
import UserNavBar from "./UserNavbar";
import "../../styles/app.css";
const NavBar = (props) => {
  return (
    <nav>
      <div className="logo"> HAPPY SHOPPING</div>
      <div className="menu">
        {props.authedUser == null ? (
          <ul>
            <li>
              <Link to="/signin" activeclassname="active" >
                Sign in
              </Link>
            </li>
          </ul>
        ) : props.authedUser.owner ? (
          <OwnerNavBar />
        ) : (
          <UserNavBar />
        )}
      </div>
    </nav>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NavBar);
