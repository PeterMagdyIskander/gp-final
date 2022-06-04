import React from "react";
import CardContent from "@mui/material/CardContent";
import { MdOutlineDevicesOther } from "react-icons/md";
import { FaCar, FaWallet } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { FiInfo, FiEdit } from "react-icons/fi";
import { useState } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import ErrorCard from "./ErrorCard";
import Modal from "@mui/material/Modal";
export default function ItemsCard(props) {
  let iconSize = 24;
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfoModal = () => setOpenInfo(true);
  const handleCloseInfoModal = () => setOpenInfo(false);

  const [openMatches, setOpenMatches] = useState(false);
  const handleOpenMatchesModal = () => setOpenMatches(true);
  const handleCloseMatchesModal = () => setOpenMatches(false);

  const [newId, setNewId] = useState(props.id);
  const saveChange = () => {
    //handle save here
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

  return (
    <CardContent
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
      }}
    >
      {props.type === "car" ? (
        <FaCar size={72} />
      ) : props.type === "wallet" ? (
        <FaWallet size={72} />
      ) : (
        <MdOutlineDevicesOther size={72} />
      )}
      <h2 style={{ textAlign: "center" }}>{props.id}</h2>
      <div className="flex big-gap">
        <div className="options-container">
          {" "}
          <FiInfo
            size={iconSize}
            style={{ cursor: "pointer" }}
            onClick={handleOpenMatchesModal}
          />
          <h4 className="options-title">Matches</h4>
        </div>
        <div className="options-container">
          <FiEdit
            size={iconSize}
            style={{ cursor: "pointer" }}
            onClick={handleOpenInfoModal}
          />
          <h4 className="options-title">Edit</h4>
        </div>
      </div>
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
              setNewId(e);
            }}
          />
          <Button onClick={saveChange}>Save Changes</Button>
        </Box>
      </Modal>
      <Modal
        open={openMatches}
        onClose={handleCloseMatchesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMatch}>
          {props.matches.length === 0 ? (
            <ErrorCard message="No Matches Found" />
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
                      justifyContent: "space-around", ml: "auto",
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
    </CardContent>
  );
}
