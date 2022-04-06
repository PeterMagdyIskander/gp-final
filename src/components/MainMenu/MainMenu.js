
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
const MainMenu = (props) => {
  return (
    <div className="container-centered">
      <div className="request-loader">
        <span>
          <Link to="/found">
            <RiUserSearchFill color="#aaa"/>
          </Link>
        </span>
      </div>
      <div className="report-missing-child">
        <Link className="redColor" to="/Report">
          Report Missing Child
        </Link>
      </div>

      <Link className="redColor" to="items">
        <div className="missing-items underline">Missing Items?</div>
      </Link>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
