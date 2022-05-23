import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FiInfo } from "react-icons/fi";
import { Container } from "@mui/material";

import CardContent from "@mui/material/CardContent";
// import { FiInfo } from "react-icons/fi";
const theme = createTheme();
const MatchedCard = (props) => {
  let { img } = props;
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
          <img className="matched-child-img" alt="Matched child" src={img.img} />
          <div className="flex flex-space-between">
          more info
          <FiInfo size={24} style={{cursor:"pointer"}} onClick={props.selectMatch(props.match)}/>
          </div>
        </CardContent>
      </Container>
    </ThemeProvider>

  );
};
export default MatchedCard;
