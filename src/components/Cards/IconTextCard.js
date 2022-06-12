import React from "react";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function IconTextCard(props) {
  return (
      <CardContent
        variant="outlined"
        sx={{
          m: "5% 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: 10,
          borderRadius: "30px",
          bgcolor: "#fafafa",
          width: "20vw",
          height: "40vh",
          position: "relative",
        }}
      >
        {props.component}
        {props.function != null ? (
          <Button
            sx={{
              textTransform: "none",
              fontWeight: "100",
              fontSize: "1.2rem",
              fontFamily: "Quicksand",
              borderRadius: "15px",
              backgroundColor: "#171717",
              "&:hover": {
                color: "#171717",
                fontWeight: "600",
                backgroundColor: "white",
                padding: "5px 15px",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              },
            }}
            variant="contained"
            onClick={props.function}
          >
            {props.message}
          </Button>
        ) : (
          <>
            <p className="card-title"> {props.message}</p>
          </>
        )}
      </CardContent>
  );
}
