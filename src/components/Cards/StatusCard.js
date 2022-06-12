import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { FiMapPin, FiUser } from "react-icons/fi";
import { useDispatch, connect } from "react-redux";
import { Deleteobjects, uploadarrtos3editreport } from "../../AWS/s3logic";
import SelectedImg from "./SelectedImg";
import MatchedDetailsMenu from "./MatchedDetailsMenu";
import { FiXCircle } from "react-icons/fi";
import GenericStatusCard from "./GenericStatusCard";
import IconTextCard from "../Cards/IconTextCard";
import { setChildren } from "../../ReduxStore/actions/children";
import CircularComponent from "../Loading/CircularComponent";
const StatusCard = (props) => {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfoModal = () => setOpenInfo(true);
  const handleCloseInfoModal = () => setOpenInfo(false);

  const [openMatches, setOpenMatches] = useState(false);
  const handleOpenMatchesModal = () => setOpenMatches(true);
  const handleCloseMatchesModal = () => setOpenMatches(false);

  const [editing, setEditing] = useState(false);
  const [imgs, setImages] = useState(props.child.imgs);

  const [sentReq, setSentReq] = useState(false);
  const [success, setSuccess] = useState("false");
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
  const styleNoMatch = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "50%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleRemoveChild = async () => {
    setSentReq(true);
    let success = await Deleteobjects(
      props.authedUser.jwtToken,
      props.child.imgs,
      "lostchildrenbucket"
    );
    if (success) {
      let newChildArr = props.children.filter(
        (child) =>
          !(
            child.photos.length === props.child.imgs.length &&
            child.photos.every(
              (value, index) => value === props.child.imgs[index]
            )
          )
      );
      setSuccess("true");
      dispatch(setChildren(newChildArr));
      props.setRefresh(!props.refresh);
      setSentReq(false);
    }
    handleCloseInfoModal();
  };
  const handleEditing = () => {
    console.log(props.child.imgs);
    setEditing(!editing);
  };

  const handleRemove = async () => {
    let toBeDeleted = imgs.filter((img) => img.selected);
    console.log(toBeDeleted);
    //to be deleted is the images to be deleted uri
    //call the delete api here
    let success = await Deleteobjects(
      props.authedUser.jwtToken,
      toBeDeleted,
      "lostchildrenbucket"
    );
    if (success) {
      let notDeleted = imgs.filter((img) => !img.selected);

      console.log("not deleted", notDeleted);
      setImages(notDeleted);
    }
  };

  const onFileUpload = async (e) => {
    if (e.target.files.length > 10 - imgs.length) {
      alert(`please upload ${10 - imgs.length} images only`);
      return;
    }
    //call the upload function here on the new images -> uploadImgs
    //any use data is in -> props.authedUser
    let success = await uploadarrtos3editreport(
      props.authedUser.jwtToken,
      e.target.files,
      props.authedUser.email,
      props.authedUser.cognitoUserId,
      props.child.nameOfChild,
      props.child.location,
      props.authedUser.phoneNumber,
      "lostchildrenbucket"
    );
    console.log("abaaa", success);
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
      <GenericStatusCard
        component={
          <img
            className="lost-child-img"
            alt={props.child.nameOfChild}
            src={props.child.imgs[0].img}
          />
        }
        message={""}
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
                pending: "Deleting",
              }}
            />
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Child Info
              </Typography>
              <ImageList
                sx={{ width: 620, height: 405 }}
                cols={3}
                rowHeight={200}
              >
                {imgs.map((img, index) => (
                  <ImageListItem key={index}>
                    <SelectedImg key={index} img={img} editable={editing} />
                  </ImageListItem>
                ))}
              </ImageList>

              <div className="flex flex-space-between">
                <Button
                  component="label"
                  disabled={imgs.length === 10 || !editing}
                >
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
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
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
        <Box sx={props.child.matches.length == 0 ? styleNoMatch : styleMatch}>
          {props.child.matches.length === 0 ? (
            <IconTextCard
              component={<FiXCircle size={"7vw"} color="red" />}
              message="No Matches Found"
              function={() => handleCloseMatchesModal()}
            />
          ) : (
            <MatchedDetailsMenu
              matches={props.child.matches}
              handleClose={handleCloseMatchesModal}
            />
          )}
          <Button
            sx={{ color: "red", float: "right", p: "0 0", mt: "9px" }}
            onClick={() => handleCloseMatchesModal()}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

function mapStateToProps({ authedUser, children }) {
  return {
    authedUser,
    children,
  };
}
export default connect(mapStateToProps)(StatusCard);
