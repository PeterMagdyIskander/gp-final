import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
const SelectedImg = (props) => {
  const [selected, setSelected] = useState(props.img.selected);

  return (
    <div
      className="container"
      onClick={() => {
        if (props.editable) {
          setSelected(!selected);
        }
      }}
    >
      <img
        src={props.img.img}
        alt="child face image"
        loading="lazy"
        className={selected ? "face-img selected" : "face-img"}
      />
      {selected && <FiCheckCircle className="center icon"></FiCheckCircle>}
    </div>
  );
};

export default SelectedImg;
