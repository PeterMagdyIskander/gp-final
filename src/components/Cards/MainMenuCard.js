import React from "react";

import { RiUserSearchFill } from "react-icons/ri";

import { FiFlag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function MainMenuCard(props) {
  const navigate = useNavigate();
  return (
    <div className="found-options bg-main-menu-card">
      <div className="request-loader">
        {props.type === "Found" ? <RiUserSearchFill size={78}/> : <FiFlag size={78}/>}
      </div>
      
      <button className="found-button" onClick={() => {
          navigate(`/${props.type}`);
        }}>
        {props.message}</button>
    </div>
  );
}
