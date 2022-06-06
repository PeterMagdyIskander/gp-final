import { connect } from "react-redux";
import IconTextCard from "../Cards/IconTextCard";
import { useNavigate } from "react-router";
import { FiFlag } from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="found-options-container">
      <IconTextCard
        component={<FiFlag size="7vw" />}
        function={() => navigate("Found")}
        message={"Found a Child/Object"}
      />
      <IconTextCard
        component={<RiUserSearchFill size="7vw" />}
        function={() => navigate("Report")}
        message={"Report a Child/Object"}
      />
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(MainMenu);
