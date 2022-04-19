import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import CardContent from "@mui/material/CardContent";
// import { FiInfo } from "react-icons/fi";
const theme = createTheme();
const MatchedCard = (props) => {
  let { img, name } = props;
  let iconSize = 20;
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CardContent
          variant="outlined"
          sx={{
            width: "fit-content",
            display: "grid",
            gridTemplateColumns: "200px 150px",
            gap: "25px",
            margin: "5%",
            boxShadow: 1,
            borderRadius: "30px",
            bgcolor: "#fafafa",
            alignItems: "center",
          }}
        >
          <img className="lost-child-img" alt={name} src={img} />
          <p className="matched-name">{name}</p>
        </CardContent>
      </Container>
    </ThemeProvider>

    // <div className="status-card-grid">
    //   <div>
    //     <img
    //       className="found-child-img"
    //       src={img}
    //       alt={name}
    //     />
    //   </div>
    //   <div className="flex flex-space-between">
    //     <p>{name}</p>
    //     <FiInfo
    //       size={iconSize}
    //       style={{ cursor: "pointer" }}
    //     />
    //   </div>
    // </div>
  );
};
export default MatchedCard;
