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
import { Button, Container } from "@mui/material";
import { gets3file } from "../../AWS/s3logic";
import ItemsCard from "../Cards/ItemsCard";
import { FiXCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import IconTextCard from "../Cards/IconTextCard";
import { setItems } from "../../ReduxStore/actions/items";
import { setChildren } from "../../ReduxStore/actions/children";
import { toast } from "react-toastify";
import { Deleteobjects, uploadarrtos3editreport } from "../../AWS/s3logic";
const StatusMenu = (props) => {
  const dispatch = useDispatch();
  const [children, setChildrenStatus] = useState([]);
  const [items, setItemsStatus] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [childrenLoading, setChildrenLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(async () => {
    
    if (props.items) {
      setItemsStatus(props.items);
      setItemsLoading(false);
    } else {
      getItems();
    }
    if (props.children) {
      setChildrenStatus(props.children);
      setChildrenLoading(false);
    } else {
      getChildren();
    }
  }, [refresh]);

  const getItems = async () => {
    let completeItems = await quaryfromdynamodbgetitem(
      "itemslostuserdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    );
    

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

    dispatch(setItems(completeItems));
    setItemsStatus(completeItems);
    setItemsLoading(false);
  };

  const getChildren = async () => {
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then(async (res) => {
      let completedStatus = [...res];
      
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

      dispatch(setChildren(completedStatus));
      setChildrenStatus(completedStatus);
      setChildrenLoading(false);
    });
  };

  const refreshStatus = async () => {
    setChildrenLoading(true);
    setItemsLoading(true);
    setChildrenStatus([]);
    setItemsStatus([]);
    let x = await getChildren();
    let y = await getItems();
  };

  return (
    <>
      <div className="found-options-container">
        <Button
          sx={{
            textTransform: "none",
            fontWeight: "100",
            fontSize: "1.2rem",
            fontFamily: "Quicksand",
            borderRadius: "15px",
            backgroundColor: "red",
            "&:hover": {
              color: "red",
              fontWeight: "600",
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            },
          }}
          variant="contained"
          onClick={refreshStatus}
          disabled={itemsLoading || childrenLoading}
        >
          Refresh Status
        </Button>
      </div>

      {childrenLoading || itemsLoading ? (
        <div className="status-container">
          <Skeleton
            variant="rectangular"
            height="40vh"
            width="25%"
            sx={{ borderRadius: "30px", minWidth: "250px", m: "25px " }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            height="40vh"
            width="25%"
            sx={{ borderRadius: "30px", minWidth: "250px", m: "25px " }}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            height="40vh"
            width="25%"
            sx={{ borderRadius: "30px", minWidth: "250px", m: "25px " }}
            animation="wave"
          />
        </div>
      ) : (
        <div className="status-container">
          {!childrenLoading &&
            !itemsLoading &&
            items.length === 0 &&
            children.length === 0 && (
              <IconTextCard
                component={<FiXCircle className="icon" color="red" />}
                message="No Reports Found"
                onClickFunction={null}
              />
            )}
          {!childrenLoading &&
            !itemsLoading &&
            children.lenght !== 0 &&
            children.map((child, index) => {
              return (
                <StatusCard
                  key={index}
                  child={{
                    photos: child.photos,
                    name: child.name,
                    age: child.age,
                    location: child.Location,
                    status: child.match,
                    matches: child.matches,
                  }}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              );
            })}
          {!childrenLoading &&
            !itemsLoading &&
            items.lenght !== 0 &&
            items.map((item) => {
              return (
                <ItemsCard
                  id={item.id}
                  type={item.type}
                  key={item.id}
                  matches={item.matches}
                  item={item}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

function mapStateToProps({ authedUser, items, children }) {
  return {
    authedUser,
    items,
    children,
  };
}
export default connect(mapStateToProps)(StatusMenu);
