import React from "react";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
const theme = createTheme();

export default function IconTextCard(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CardContent
          variant="outlined"
          sx={{
            m: "5% auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            boxShadow: 10,
            borderRadius: "30px",
            bgcolor: "#fafafa",
            width: "20vw",
            height: "40vh",
          }}
        >
          {props.function != null ? (
            <>
              <div className="clickable" onClick={props.function}>{props.component}</div>
              <button className="card-title clickable" onClick={props.function}>
                {" "}
                {props.message}
              </button>
            </>
          ) : (
            <>
              {props.component}
              <p className="card-title"> {props.message}</p>
            </>
          )}
        </CardContent>
      </Container>
    </ThemeProvider>
  );
}
