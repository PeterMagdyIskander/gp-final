import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MainMenu = (props) => {
  return (
    <div className="container-centered">
      <div className="found-child">do the shazam thing</div>
      <br />
        <div className="report-missing-child">
            <Link  className="redColor" to={props.authedUSer ? "report" : "signin"}>
            Report Missing Child
            </Link>
        </div>

      <Link className="redColor" to='items'>
        <div className="missing-items underline">
            Missing Items?
        </div>
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
