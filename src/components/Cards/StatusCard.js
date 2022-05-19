import React, { useEffect } from "react";
import { FiInfo, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { Box, Container, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
import { gets3file } from "../../AWS/s3logic";
import { connect } from "react-redux";
import { Deleteobjects } from "../../AWS/s3logic";
import Toast from "../Toasts/Toasts";
import { ToastContainer, toast } from "react-toastify";
import SelectedImg from "./SelectedImg";
const theme = createTheme();
const StatusCard = (props) => {
  const color = props.child.status ? "green" : "red";
  let iconSize = 20;
  const [open, setOpen] = useState(false);
  const [selectedImgs, setSelectedIms] = useState([]);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [editing, setEditing] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "70%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

 

  const handleRemoveChild = async () => {
    let refresh = await Deleteobjects(
      props.authedUser.jwtToken,
      props.child.imgs,
      "lostchildrenbucket"
    );
    if (refresh) {
      handleCloseModal();
      props.refresh(refresh);
      props.loading(refresh);
    }
  };
  const handleEditing = () => {
    if (editing) {
    }
    setEditing(!editing);
  };
  const [name, setName] = React.useState(props.child.nameOfChild);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [location, setLocation] = React.useState(props.child.location);
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  return (
    <>
      <CardContent
        variant="outlined"
        sx={{
          display: "grid",
          gridTemplateColumns: "200px 300px",
          gap: "10px",
          mt: "5%",
          mb: "5%",
          boxShadow: 10,
          borderRadius: "30px",
          bgcolor: "#fafafa",
        }}
      >
        <img
          className="lost-child-img"
          alt={props.child.nameOfChild}
          src={props.child.imgs[0].img}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <p className="red">Click for more info</p>
          </Box>
          <span>
            <FiInfo
              size={iconSize}
              color={color}
              style={{ cursor: "pointer" }}
              onClick={handleOpenModal}
            />
          </span>
        </Box>
      </CardContent>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Child Info
          </Typography>
          <ImageList sx={{ width: 620, height: 405 }} cols={3} rowHeight={200}>
            {props.child.imgs.map((img, index) => (
              <ImageListItem key={index}>
                <SelectedImg key={index} img={img} editable={editing} />
              </ImageListItem>
            ))}
          </ImageList>

          <div className="flex flex-space-between">
            <Button
              onClick={handleRemoveChild}
              disabled={props.child.imgs.length === 10 || !editing}
            >
              Add Images
            </Button>
            <Button onClick={handleEditing} disabled={!editing}>
              Remove Images
            </Button>
          </div>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <FiUser size={28} />
              </ListItemAvatar>
              {editing ? (
                <TextField
                  id="outlined-basic"
                  label="Name:"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                />
              ) : (
                <ListItemText
                  primary="Name:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {name}
                      </Typography>
                    </React.Fragment>
                  }
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <FiMapPin size={28} />
              </ListItemAvatar>
              {editing ? (
                <TextField
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={handleLocationChange}
                />
              ) : (
                <ListItemText
                  primary="Location:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {location}
                      </Typography>
                    </React.Fragment>
                  }
                />
              )}
            </ListItem>
          </List>
          <div className="flex flex-space-between">
            <Button onClick={handleRemoveChild}>Remove Report</Button>
            <Button onClick={handleEditing}>
              {editing ? "Save Changes" : "Enable Editting"}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(StatusCard);
