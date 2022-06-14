import React from "react";
import Button from "@mui/material/Button";

export default function IconTextCard({
  component,
  message,
  subMessage,
  onClickFunction,
}) {
  return (
    <div className="card-content">
      <div className="icon-border">{component}</div>

      <div className="message-container">
        <p className="card-message">{message}</p>
        <p className="card-sub-message">{subMessage}</p>
      </div>
      {onClickFunction != null ? (
        <Button
          sx={{
            textTransform: "none",
            border: "1px solid #39a2db",
            borderRadius: "50px",
            p: "5px 15px",
            color: "#073944",
            "&:hover": {
              bgcolor: "#39a2db",
              color: "#fff",
              border: "1px solid #073944",
            },
          }}
          onClick={onClickFunction}
        >
          Click for More
        </Button>
      ) : (
        <>
          <p className="card-title"> {message}</p>
        </>
      )}
    </div>
  );
}
