import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { quaryfromdynamodb } from "../../AWS/dynamodblogic";
import StatusCard from "../Cards/StatusCard";

const StatusMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [refresh,setRefresh]=useState(false)
  useEffect(() => {
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then((res) => {
        setChildren(res)
        console.log(res)
    });
  }, [refresh]);
  return (
    <div className="status">
      {children.map((child, index) => {
        return (
          <StatusCard
            key={index}
            child={{
              imgs: child.photos,
              nameOfChild: child.name,
              ageOfChild: child.age,
              location: child.Location,
              status:child.match
            }}
            refresh={setRefresh}
          />
        );
      })}
    </div>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(StatusMenu);
