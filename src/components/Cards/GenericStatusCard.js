import React from "react";
import CardContent from "@mui/material/CardContent";

import { FiInfo, FiEdit } from "react-icons/fi";
export default function GenericStatusCard(props) {
  let iconSize = 24;
  return (
    <CardContent
      variant="outlined"
      sx={{
        m: "5% 0",
        boxShadow: 10,
        borderRadius: "30px",
        bgcolor: "#fafafa",
        width: "20vw",
        height: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {props.component}
      {props.message !== "" && <p className="card-title">{props.message}</p>}
      <div className="flex big-gap">
        <div className="options-container">
          {" "}
          <FiInfo
            size={iconSize}
            style={{ cursor: "pointer" }}
            onClick={props.handleOpenMatchesModal}
          />
          <h4 className="options-title">Matches</h4>
        </div>

        <div className="options-container">
          <FiEdit
            size={iconSize}
            style={{ cursor: "pointer" }}
            onClick={props.handleOpenInfoModal}
          />
          <h4 className="options-title">Edit</h4>
        </div>
      </div>
    </CardContent>
  );
}
