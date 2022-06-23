import React from "react";
import SelectedImg from "./SelectedImg";

export default function ImageContainer({ imgs, selectable, editing }) {
  return (
    <div className="face-img-container">
      {imgs.map((img, index) =>
        selectable ? (
          <SelectedImg key={index} img={img} editable={editing} />
        ) : (
          <img src={img} alt="child face image" className="face-img" />
        )
      )}
    </div>
  );
}
