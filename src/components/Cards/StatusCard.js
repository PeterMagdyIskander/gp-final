import React, { useEffect } from "react";
import { FiInfo, FiEdit } from "react-icons/fi";
import { useState } from "react";
import { Box, Input } from "@mui/material";
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
import { FiMapPin, FiUser } from "react-icons/fi";
import { connect } from "react-redux";
import { Deleteobjects } from "../../AWS/s3logic";
import SelectedImg from "./SelectedImg";
import MatchedDetailsMenu from "./MatchedDetailsMenu";
const StatusCard = (props) => {
  let iconSize = 24;
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfoModal = () => setOpenInfo(true);
  const handleCloseInfoModal = () => setOpenInfo(false);

  const [openMatches, setOpenMatches] = useState(false);
  const handleOpenMatchesModal = () => setOpenMatches(true);
  const handleCloseMatchesModal = () => setOpenMatches(false);

  const [editing, setEditing] = useState(false);
  const [imgs, setImages] = useState(props.child.imgs);
  const [uploadImgs, setUploadImgs] = useState([]);

  const styleInfo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "750px",
    height: "70%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const styleMatch = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
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
      handleCloseInfoModal();
      props.refresh(refresh);
      props.loading(refresh);
    }
  };

  const handleEditing = () => {
    console.log(props.child.imgs);
    setEditing(!editing);
  };

  const handleRemove = () => {
    let toBeDeleted = imgs.filter((img) => img.selected);
    console.log(toBeDeleted);
    //to be deleted is the images to be deleted uri
    //call the delete api here
    let success = true;
    if (success) {
      let notDeleted = imgs.filter((img) => !img.selected);

      console.log("not deleted", notDeleted);
      setImages(notDeleted);
    }
  };

  const onFileUpload = (e) => {
    if (e.target.files.length > 10 - imgs.length) {
      alert(`please upload ${10 - imgs.length} images only`);
      return;
    }
    setUploadImgs(e.target.files);
    //call the upload function here on the new images -> uploadImgs
    //any use data is in -> props.authedUser
    let success = true;
    if (success) {
      let addedImgs = Object.keys(e.target.files).map((img) => {
        if (e.target.files && e.target.files[img]) {
          return URL.createObjectURL(e.target.files[img]);
        }
        return "";
      });
      console.log(addedImgs);
      let selectedImages = addedImgs.map((img) => {
        return { img, selected: false };
      });
      setImages([...imgs, ...selectedImages]);
    }
  };

  return (
    <>
      <CardContent
        variant="outlined"
        sx={{
          // display: "grid",
          // gridTemplateColumns: "200px 300px",
          // gap: "10px",
          mt: "5%",
          mb: "5%",
          boxShadow: 10,
          borderRadius: "30px",
          bgcolor: "#fafafa",
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          className="lost-child-img"
          alt={props.child.nameOfChild}
          src={props.child.imgs[0].img}
        />
        <div className="flex big-gap">
          <div className="options-container">
            <h4 className="options-title">Matches</h4>
            <FiInfo
              size={iconSize}
              style={{ cursor: "pointer" }}
              onClick={handleOpenMatchesModal}
            />
          </div>
          <div className="options-container">
            <h4 className="options-title">Edit</h4>
            <FiEdit
              size={iconSize}
              style={{ cursor: "pointer" }}
              onClick={handleOpenInfoModal}
            />
          </div>
        </div>
      </CardContent>
      <Modal
        open={openInfo}
        onClose={handleCloseInfoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInfo}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Child Info
          </Typography>
          <ImageList sx={{ width: 620, height: 405 }} cols={3} rowHeight={200}>
            {imgs.map((img, index) => (
              <ImageListItem key={index}>
                <SelectedImg key={index} img={img} editable={editing} />
              </ImageListItem>
            ))}
          </ImageList>

          <div className="flex flex-space-between">
            <Button component="label" disabled={imgs.length === 10 || !editing}>
              Add Images
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileUpload(e)}
                multiple
                required
                hidden
              />
            </Button>
            <Button onClick={handleRemove} disabled={!editing}>
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
                      {props.child.nameOfChild}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {!editing && <Divider variant="inset" component="li" />}

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <FiMapPin size={28} />
              </ListItemAvatar>

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
                      {props.child.location}
                    </Typography>
                  </React.Fragment>
                }
              />
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

      <Modal
        open={openMatches}
        onClose={handleCloseMatchesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMatch}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {props.child.matches.length} Matches
          </Typography>
          <MatchedDetailsMenu matches={props.child.matches} />
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
