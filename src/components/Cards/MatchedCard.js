import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FiInfo, FiXCircle, FiCheckCircle, FiEdit } from "react-icons/fi";
import { Container } from "@mui/material";

import CardContent from "@mui/material/CardContent";
// import { FiInfo } from "react-icons/fi";
const theme = createTheme();
const MatchedCard = (props) => {
  let { img } = props;
  let iconSize = 20;
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CardContent
          variant="outlined"
          sx={{
            display: "grid",
            gridTemplateColumns: "100px 200px",
            gap: "25px",
            margin: "5%",
            boxShadow: 1,
            borderRadius: "30px",
            bgcolor: "#fafafa",
            alignItems: "center",
          }}
        >
          <img className="matched-child-img"  src={img.img} />
          <div className="flex flex-space-between">
          more info
          <FiInfo size={24} style={{cursor:"pointer"}} onClick={props.selectMatch(props.match)}/>
          </div>
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
