import { connect } from "react-redux";
import IconTextCard from "../Cards/IconTextCard";
import { useNavigate } from "react-router";
import { FiFlag } from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";
import LogoCard from "../Cards/LogoCard";
const MainMenu = () => {
  const navigate = useNavigate();

  
  return (
    <div className="home">
      <IconTextCard
        component={<FiFlag size="7vw" color="#39a2db" />}
        onClickFunction={() => navigate("Found")}
        message={"Found a Child/Item"}
        subMessage={
          "We can help you return them to the person they belong to using AI"
        }
      />
      <LogoCard />
      <IconTextCard
        component={<RiUserSearchFill size="7vw" color="#39a2db" />}
        onClickFunction={() => navigate("Report")}
        message={"Report a Child/Item"}
        subMessage={
          "We are using the latest AI technologies to macth lost children"
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
