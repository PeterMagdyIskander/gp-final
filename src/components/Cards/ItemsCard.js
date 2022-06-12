import React from "react";
import CardContent from "@mui/material/CardContent";
import { MdOutlineDevicesOther } from "react-icons/md";
import { FaCar, FaWallet } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { connect, useDispatch } from "react-redux";
import { additemdb, deleteitem } from "../../AWS/dynamodblogic";
import IconTextCard from "../Cards/IconTextCard";
import GenericStatusCard from "./GenericStatusCard";
import {
  quaryfromdynamodb,
  quaryfromdynamodbgetitem,
  getfromdynamodb,
} from "../../AWS/dynamodblogic";
import { setItems } from "../../ReduxStore/actions/items";
import CircularComponent from "../Loading/CircularComponent";
function ItemsCard(props) {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfoModal = () => setOpenInfo(true);
  const handleCloseInfoModal = () => setOpenInfo(false);

  const [openMatches, setOpenMatches] = useState(false);
  const handleOpenMatchesModal = () => setOpenMatches(true);
  const handleCloseMatchesModal = () => setOpenMatches(false);

  const [newId, setNewId] = useState(props.id);
  const [sentReq, setSentReq] = useState(false);
  const [success, setSuccess] = useState("false");
  const deleteItem = async () => {
    setSentReq(true);
    const x = await deleteitem(
      props.id,
      props.authedUser.email,
      props.authedUser.jwtToken,
      props.type
    );
    if (x.$metadata.httpStatusCode === 200) {
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

      setSuccess("true");
      dispatch(setItems(completeItems));
      props.setRefresh(!props.refresh);
      setSentReq(false);
    }
  };
  const saveChange = async () => {
    setSentReq(true);
    //handle save here
    //oldId= props.id;
    //newId = newId
    //jwt = props.authedUser.jwtToken
    const x = await deleteitem(
      props.id,
      props.authedUser.email,
      props.authedUser.jwtToken,
      props.type
    );
    const y = await additemdb(
      props.type,
      newId,
      props.authedUser.phoneNumber,
      props.authedUser.email,
      props.authedUser.jwtToken
    );
    if (x.$metadata.httpStatusCode === 200 && y) {
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

      setSuccess("true");
      dispatch(setItems(completeItems));
      props.setRefresh(!props.refresh);
      setSentReq(false);
    }
    setSuccess("false");
  };
  const handleChangeId = (e) => {
    setNewId(e.target.value);
  };
  const styleInfo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "30%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  const styleMatch = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "60%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log("matches", props);
  return (
    <>
      <GenericStatusCard
        component={
          props.type === "car" ? (
            <FaCar size="7vw" />
          ) : props.type === "wallet" ? (
            <FaWallet size="7vw" />
          ) : (
            <MdOutlineDevicesOther size="7vw" />
          )
        }
        message={props.id}
        handleOpenMatchesModal={handleOpenMatchesModal}
        handleOpenInfoModal={handleOpenInfoModal}
      />
      <Modal
        open={openInfo}
        onClose={handleCloseInfoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInfo}>
          {sentReq ? (
            <CircularComponent
              loading={true}
              success={success}
              number={"!"}
              message={{
                success: "Success",
                fail: "Failed",
                pending: "Editing",
              }}
            />
          ) : (
            <>
              <h1>New ID</h1>
              <TextField
                type="text"
                label="New ID"
                value={newId}
                onChange={(e) => {
                  handleChangeId(e);
                }}
              />
              <Button onClick={deleteItem}>Delete Item</Button>
              <Button onClick={saveChange}>Save Changes</Button>
            </>
          )}
        </Box>
      </Modal>
      <Modal
        open={openMatches}
        onClose={handleCloseMatchesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMatch}>
          {!props.matches.length ? (
            <IconTextCard
              component={<FiXCircle size={"7vw"} color="red" />}
              message="No Matches Found"
              function={null}
            />
          ) : (
            <>
              {props.matches.map((match, index) => {
                return (
                  <CardContent
                    key={index}
                    variant="outlined"
                    sx={{
                      mt: "5%",
                      mb: "5%",
                      boxShadow: 10,
                      borderRadius: "30px",
                      bgcolor: "#fafafa",
                      width: "232px",
                      height: "283.6px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      ml: "auto",
                      mr: "auto",
                    }}
                  >
                    {match.type === "car" ? (
                      <FaCar size={72} />
                    ) : match.type === "wallet" ? (
                      <FaWallet size={72} />
                    ) : (
                      <MdOutlineDevicesOther size={72} />
                    )}
                    <h2 style={{ textAlign: "center" }}>{match.phone}</h2>
                    <h2 style={{ textAlign: "center" }}>{match.address}</h2>
                  </CardContent>
                );
              })}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ItemsCard);
