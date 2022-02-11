import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ParentNavBar from "./ParentNavbar";
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
        ) : props.authedUser? (
          <ParentNavBar />
        ) : (
          null
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
