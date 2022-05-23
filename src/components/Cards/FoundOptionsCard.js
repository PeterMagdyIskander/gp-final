import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

import { BiDevices } from "react-icons/bi";
export default function FoundOptionsCard(props) {
  return (
    <div className="found-options">
      {props.type === "child" ? <FiUser size={78} /> : <BiDevices size={78} />}
      <button className="found-button" onClick={() => props.select(props.type)}>
        Found {props.type === "child" ? "A Child" : "An Object"}
      </button>
    </div>
  );
}
