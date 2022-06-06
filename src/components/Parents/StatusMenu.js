import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  quaryfromdynamodb,
  quaryfromdynamodbgetitem,
  getfromdynamodb,
} from "../../AWS/dynamodblogic";
import { Getmatches } from "../../AWS/getmatches";

import StatusCard from "../Cards/StatusCard";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "@mui/material";
import { gets3file } from "../../AWS/s3logic";
import MatchedCard from "../Cards/MatchedCard";
import ItemsCard from "../Cards/ItemsCard";
import { FiXCircle } from "react-icons/fi";

import IconTextCard from "../Cards/IconTextCard";
const StatusMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log(props.authedUser);
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then(async (res) => {
      let completedStatus = [...res];
      console.log("abapaaaaaaaa", completedStatus);
      for (let i = 0; i < completedStatus.length; i++) {
        let images = await gets3file(
          completedStatus[i].photos,
          props.authedUser.jwtToken,
          "lostchildrenbucket"
        );
        let selectedImages = images.map((img) => {
          return { img, selected: false };
        });
        completedStatus[i].photos = selectedImages;
        completedStatus[i].matches = await Getmatches(
          completedStatus[i].photos,
          props.authedUser.jwtToken
        );
      }

      setChildren(completedStatus);

      //set items here
      let completeItems = await quaryfromdynamodbgetitem(
        "itemslostuserdata",
        props.authedUser.email,
        props.authedUser.jwtToken
      );
      console.log("abadeer item", completeItems);

      for (let i = 0; i < completeItems.length; i++) {
        //remove the array and add the function to get matches -> if theres a match -> array index of 1
        //no match array of 0
        const match = await getfromdynamodb(
          "itemsfound",
          completeItems[i].type,
          completeItems[i].id,
          props.authedUser.jwtToken
        );

        completeItems[i].matches = match;
      }

      console.log("allITems", completeItems);
      setItems(completeItems);
      setLoading(false);
    });
  }, []);

  return (
    <Container
      sx={{
        mt: "64px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
      component="main"
    >
      {loading && (
        <Skeleton
          variant="rectangular"
          height={234}
          sx={{ borderRadius: "30px" }}
          animation="wave"
        />
      )}

      {children.length === 0 && !loading ? (
        <IconTextCard
          component={<FiXCircle size={"7vw"} color="red" />}
          message="No Child Reports Found"
          function={null}
        />
      ) : (
        <>
          {children.map((child, index) => {
            return (
              <StatusCard
                key={index}
                child={{
                  imgs: child.photos,
                  nameOfChild: child.name,
                  ageOfChild: child.age,
                  location: child.Location,
                  status: child.match,
                  matches: child.matches,
                }}
                refresh={setRefresh}
                loading={setLoading}
              />
            );
          })}
        </>
      )}
      {items.length === 0 && !loading ? (
        <IconTextCard
          component={<FiXCircle size={"7vw"} color="red" />}
          message="No Item Reports Found"
          function={null}
        />
      ) : (
        <>
          {items.map((item) => {
            return (
              <ItemsCard
                id={item.id}
                type={item.type}
                key={item.id}
                matches={item.matches}
              />
            );
          })}
        </>
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
