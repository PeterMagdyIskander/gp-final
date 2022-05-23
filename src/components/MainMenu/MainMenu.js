import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import CircularComponent from "../Loading/CircularComponent";
import { useState } from "react";
import FoundItemForm from "../Forms/FoundItemForm";
const MainMenu = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("false");

  return (
    <div className="container-centered">
      <div className="request-loader">
        <span>
          <Link to="/found">
            <RiUserSearchFill color="#aaa" />
          </Link>
        </span>
      </div>
      <div className="report-missing-child">
        <Link className="redColor" to="/Report">
          Report Missing Child
        </Link>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
