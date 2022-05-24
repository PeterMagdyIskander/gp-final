import { connect } from "react-redux";
import MainMenuCard from "../Cards/MainMenuCard";
const MainMenu = () => {
  return (
    <div className="found-options-container">
      <MainMenuCard type="Found" message={"Found a Child/Object"}/>
      <MainMenuCard type="Report"  message={"Report a Child/Object"}/>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
