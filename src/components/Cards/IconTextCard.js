import React from "react";
import CardContent from "@mui/material/CardContent";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";

export default function IconTextCard(props) {
  return (
    <Container component="main" maxWidth="xs">
      <CardContent
        variant="outlined"
        sx={{
          m: "5% auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: 24,
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
              fontSize: "2vw",
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
            {props.component}
            <p className="card-title"> {props.message}</p>
          </>
        )}
      </CardContent>
    </Container>
  );
}
