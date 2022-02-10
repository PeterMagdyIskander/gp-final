import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="container-centered">
      <div className="found-child">do the shazam thing</div>
      <br />
        <div className="report-missing-child">
            <Link  className="redColor" to="report">
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
export default connect()(MainMenu);
