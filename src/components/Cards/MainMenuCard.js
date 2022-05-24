import React from "react";

import { Link } from "react-router-dom";
import { RiUserSearchFill } from "react-icons/ri";

import { FiFlag } from "react-icons/fi";
import { PropaneSharp } from "@mui/icons-material";
export default function MainMenuCard(props) {
  return (
    <div className="found-options bg-main-menu-card">
      <div className="request-loader">
        <span>
          {props.type === "found" ? <RiUserSearchFill /> : <FiFlag />}
        </span>
      </div>
      <h3>{props.message}</h3>
      {/* {props.type === "child" ? <FiUser size={78} /> : <BiDevices size={78} />}
      <button className="found-button" onClick={() => props.select(props.type)}>
        {props.report ? "Report" : "Found"}{" "}
        {props.type === "child" ? "A Child" : "An Object"}
      </button> */}
    </div>
  );
}
