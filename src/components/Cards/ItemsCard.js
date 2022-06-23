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
import { toast } from "react-toastify";
import MatchedItemsCard from "./MatchedItemsCard";

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
  const deleteItem = async () => {
    setSentReq(true);
    const response = await toast.promise(
      deleteitem(
        props.id,
        props.authedUser.email,
        props.authedUser.jwtToken,
        props.type
      ),
      {
        pending: "Deleting Item",
        success: "Item Deleted Successfully",
        error: "Deletion Failed",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
    if (response.$metadata.httpStatusCode === 200) {
      let newItemsArr = props.items.filter((item) => item.id !== props.id);
      dispatch(setItems(newItemsArr));
    }
    setSentReq(false);
    props.setRefresh(!props.refresh);
  };
  const editItem = async () => {
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
      return true;
    } else {
      return false;
    }
  };
  const saveChange = async () => {
    setSentReq(true);
    const response = await toast.promise(
      editItem,
      {
        pending: "Editing Item",
        success: "Item Edited Successfully",
        error: "Editing Failed",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
    console.log(response);
    if (response) {
      let newItemsArr = props.items;
      console.log(newItemsArr);
      for (let i = 0; i < newItemsArr.length; i++) {
        if (newItemsArr[i].id === props.id) {
          newItemsArr[i].id = newId;
        }
      }

      dispatch(setItems(newItemsArr));
    }
    setSentReq(false);
    props.setRefresh(!props.refresh);
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
    height: "fit-content",
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
    borderRadius: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "fit-content",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  console.log("matches", props);
  return (
    <>
      <GenericStatusCard
        component={
          props.type === "car" ? (
            <FaCar className="icon" />
          ) : props.type === "wallet" ? (
            <FaWallet className="icon" />
          ) : (
            <MdOutlineDevicesOther className="icon" />
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
          <h1>New ID</h1>
          <TextField
            type="text"
            label="New ID"
            value={newId}
            onChange={(e) => {
              handleChangeId(e);
            }}
          />{" "}
          <Button
            sx={{
              m: "15px 0",
              borderRadius: "15px",
              "&:hover": {
                color: "#1976d2",
                fontWeight: "600",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              },
            }}
            variant="contained"
            onClick={saveChange}
            disabled={sentReq}
          >
            Save Changes
          </Button>
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
            onClick={deleteItem}
            disabled={sentReq}
          >
            Delete Item
          </Button>
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
              component={<FiXCircle className="icon" color="red" />}
              message="No Matches Found"
              onClickFunction={null}
            />
          ) : (
            <>
              {props.matches.map((item) => {
                return (
                  <MatchedItemsCard
                     item={item}
                    found={false}
                      component={
                      item.type === "car" ? (
                        <FaCar className="icon" />
                      ) : props.type === "wallet" ? (
                        <FaWallet className="icon" />
                      ) : (
                        <MdOutlineDevicesOther className="icon" />
                      )
                    }
                    key={item.id}
                    function={null}
                  />
                );
              })}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
function mapStateToProps({ authedUser, items }) {
  return {
    authedUser,
    items,
  };
}
export default connect(mapStateToProps)(ItemsCard);
