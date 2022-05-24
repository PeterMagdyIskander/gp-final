import { connect } from "react-redux";
import MainMenuCard from "../Cards/MainMenuCard";
const MainMenu = () => {
  return (
    <div className="found-options-container">
      <MainMenuCard type="Found" message={"Found a Child"}/>
      <MainMenuCard type="Report"  message={"Report a Child"}/>
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
