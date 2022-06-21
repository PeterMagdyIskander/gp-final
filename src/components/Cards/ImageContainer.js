import React from "react";

export default function ImageContainer({ imgs }) {
  return (
    <div className="face-img-container">
      {imgs.map((img) => (
        <img src={img} alt="child face image" className="face-img" />
      ))}
    </div>
  );
}
