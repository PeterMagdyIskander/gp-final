import { FiInfo } from "react-icons/fi";
import CardContent from "@mui/material/CardContent";
const MatchedCard = (props) => {
  let { img } = props;
  console.log("props", props);
  return (
    <CardContent
      variant="outlined"
      sx={{
        display: "flex",
        gap: "25px",
        margin: "5%",
        boxShadow: 10,
        borderRadius: "30px",
        bgcolor: "#fafafa",
        justifyContent: "space-around",
        width: "15vw",
        alignItems: "center",
      }}
    >
      <img className="matched-child-img" alt="Matched child" src={img} />
      <div className="options-container">
        <FiInfo
          size={24}
          style={{ cursor: "pointer" }}
          color={props.index === props.selectedIndex ? "red" : ""}
          onClick={() => props.setSelectedMatch(props.match, props.index)}
        />
        <h4 className={props.index === props.selectedIndex ?"options-title important":"options-title"}>
          {props.index === props.selectedIndex ? "Selected" : "Select"}
        </h4>
      </div>
    </CardContent>
  );
};
export default MatchedCard;
