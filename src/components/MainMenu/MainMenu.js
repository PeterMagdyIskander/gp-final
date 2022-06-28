import { connect } from "react-redux";
import IconTextCard from "../Cards/IconTextCard";
import { useNavigate } from "react-router";
import { FiFlag } from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";
import LogoCard from "../Cards/LogoCard";
import ImageContainer from "../Cards/ImageContainer";
import CircularComponent from "../Loading/CircularComponent";
const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <IconTextCard
        component={<FiFlag className="icon" color="#39a2db" />}
        onClickFunction={() => navigate("Found")}
        message="Found"
        subMessage={
          "If you found a child or an Item, we can help you return them to their respectful owner"
        }
      />
      <LogoCard />
      <IconTextCard
        component={<RiUserSearchFill className="icon" color="#39a2db" />}
        onClickFunction={() => navigate("Report")}
        message="Lost"
        subMessage={
          "If you have a missing Child or an Item, we can help you get them back"
        }
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
