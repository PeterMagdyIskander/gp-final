import React from "react";

import { RiUserSearchFill } from "react-icons/ri";

import { FiFlag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function MainMenuCard(props) {
  const navigate = useNavigate();
  return (
    <div className="found-options bg-main-menu-card">
      <div className="request-loader">
        <span
          onClick={() => {
            navigate(`/${props.type}`);
          }}
          style={{ cursor: "pointer" }}
        >
          {props.type === "Found" ? <RiUserSearchFill /> : <FiFlag />}
        </span>
      </div>
      <h3
        onClick={() => {
          navigate(`/${props.type}`);
        }}
        style={{ cursor: "pointer" }}
      >
        {" "}
        {props.message}
      </h3>
    </div>
  );
}
