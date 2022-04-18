import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { quaryfromdynamodb } from "../../AWS/dynamodblogic";
import StatusCard from "../Cards/StatusCard";
import Skeleton from "@mui/material/Skeleton";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gets3file } from "../../AWS/s3logic";
const theme = createTheme();
const StatusMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count,setCount]=useState(0);
  useEffect(() => {
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then((res) => {
      setChildren(res);
      setLoading(false)
    });
  }, []);
  useEffect(() => {
    console.log(count)
  }, [count]);
  return (
    <Container sx={{ mt: "64px" }} component="main" maxWidth="sm">
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={234}
          sx={{ borderRadius: "30px" }}
          animation="wave"
        />
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
