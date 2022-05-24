import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";
import { useState } from "react";
import MainMenuCard from "../Cards/MainMenuCard";
const MainMenu = (props) => {
  return (
    <div className="found-options-container">
      {/* <div className="request-loader">
        <span>
          <Link to="/found">
            <RiUserSearchFill color="#aaa" />
          </Link>
        </span>
      </div>

      <div className="request-loader">
        <span>
          <Link to="/found">
            <RiUserSearchFill color="#aaa" />
          </Link>
        </span>
      </div> */}

      <MainMenuCard type="found" message={"Found a Child"}/>
      <MainMenuCard type="report"  message={"Report a Child"}/>
      {/* <Link className="report" to="/Report">
        Report Missing Child
      </Link> */}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
