import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { quaryfromdynamodb } from "../../AWS/dynamodblogic";
import StatusCard from "../Cards/StatusCard";
import Skeleton from "@mui/material/Skeleton";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gets3file } from "../../AWS/s3logic";
import Toast from "../Toasts/Toasts";
import MatchedCard from "../Cards/MatchedCard";
const theme = createTheme();
const StatusMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    console.log(props.authedUser);
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then(async (res) => {
      let completedStatus = [...res];
      for (let i = 0; i < completedStatus.length; i++) {
        let images= await gets3file(
          completedStatus[i].photos,
          props.authedUser.jwtToken,
          "lostchildrenbucket"
        )
        let selectedImages=images.map(img=>{return{img,selected:false}})
        completedStatus[i].photos=selectedImages;  
      }
     
      setChildren(completedStatus);
      console.log("called", completedStatus);
      setLoading(false);
    });
  }, []);

  return (
    <Container sx={{ mt: "64px" }} component="main" maxWidth="sm">
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={234}
          sx={{ borderRadius: "30px" }}
          animation="wave"
        />
      ) : children.length === 0 ? (
        <MatchedCard img={"/assets/warning.png"} name="No Reports Found" />
      ) : (
        children.map((child, index) => {
          return (
            <StatusCard
              key={index}
              child={{
                imgs: child.photos,
                nameOfChild: child.name,
                ageOfChild: child.age,
                location: child.Location,
                status: child.match,
              }}
              refresh={setRefresh}
              loading={setLoading}
            />
          );
        })
      )}
    </Container>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(StatusMenu);
