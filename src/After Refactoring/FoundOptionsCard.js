// import React from "react";
// import { FiUser } from "react-icons/fi";

// import CardContent from "@mui/material/CardContent";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Container } from "@mui/material";
// import { MdOutlineDevicesOther } from "react-icons/md";
// const theme = createTheme();
// export default function FoundOptionsCard(props) {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CardContent
//           variant="outlined"
//           sx={{
//             m: "5% auto",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "space-around",
//             boxShadow: 10,
//             borderRadius: "30px",
//             bgcolor: "#fafafa",
//             width: "20vw",
//             height: "35vh",
//           }}
//         >
//           {props.type === "child" ? (
//             <FiUser size={"7vw"} />
//           ) : (
//             <MdOutlineDevicesOther size={"7vw"} />
//           )}

//           <p onClick={() => props.select(props.type)}>
//             {props.report ? "Report" : "Found"}{" "}
//             {props.type === "child" ? "A Child" : "An Object"}
//           </p>
//         </CardContent>
//       </Container>
//     </ThemeProvider>
//   );
// }
