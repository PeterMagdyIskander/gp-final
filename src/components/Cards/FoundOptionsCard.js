import React from "react";
import { FiUser } from "react-icons/fi";

import { MdOutlineDevicesOther } from "react-icons/md";
export default function FoundOptionsCard(props) {
  return (
    <div className="found-options bg-main-menu-card">
      


      <div className="request-loader">
        
        {props.type === "child" ? (
        <FiUser size={78} />
      ) : (
        <MdOutlineDevicesOther size={78} />
      )}
      </div>


      <button className="found-button" onClick={() => props.select(props.type)}>
        {props.report ? "Report" : "Found"}{" "}
        {props.type === "child" ? "A Child" : "An Object"}
      </button>
    </div>
  );
}
