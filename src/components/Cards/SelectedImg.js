import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
const SelectedImg = (props) => {
  const [selected, setSelected] = useState(props.img.selected);

  return (
    <div
      className="container"
      onClick={() => {
        if (props.editable) {
          props.img.selected = !props.img.selected
          setSelected(!selected);
        }
      }}
    >
      <img
        src={props.img.img}
        srcSet={`${props.img.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={props.img.img}
        loading="lazy"
        id="status-card-img"
        className={selected ? "selected" : ""}
      />
      {selected && <FiCheckCircle className="center" size={68}></FiCheckCircle>}
    </div>
  );
};

export default SelectedImg;
