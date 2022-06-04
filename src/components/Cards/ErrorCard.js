import React from "react";
import CardContent from "@mui/material/CardContent";
import { FiXCircle } from "react-icons/fi";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
const theme = createTheme();
export default function ErrorCard(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CardContent
          variant="outlined"
          sx={{
            mt: "5%",
            mb: "5%",
            boxShadow: 10,
            borderRadius: "30px",
            bgcolor: "#fafafa",
            width: "232px",
            height: "283.6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            ml: "auto",
            mr: "auto",
          }}
        >
          <FiXCircle size={72} color="red" />
          <h2 style={{ textAlign: "center" }}>{props.message}</h2>
        </CardContent>
      </Container>
    </ThemeProvider>
  );
}
