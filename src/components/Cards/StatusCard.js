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
import { toast } from "react-toastify";
import ImageContainer from "./ImageContainer";
const StatusCard = (props) => {
 
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfoModal = () => setOpenInfo(true);
  const handleCloseInfoModal = () => {
    setEditing(false);
    setOpenInfo(false);
  };

  const [openMatches, setOpenMatches] = useState(false);
  const handleOpenMatchesModal = () => setOpenMatches(true);
  const handleCloseMatchesModal = () => setOpenMatches(false);

  const [editing, setEditing] = useState(false);
  const [imgs, setImages] = useState(props.child.photos);

  const [sentReq, setSentReq] = useState(false);
  const styleInfo = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
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
  const handleEditing = () => {
    
    setEditing(!editing);
  };

  const removeChildImages = async (child) => {
    
    let toBeDeleted = child.photos.filter((img) => img.selected);
    if (toBeDeleted.length === child.photos.length) {
      toast.error("Can't Remove All Pictures", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (toBeDeleted.length === 0) {
      toast.error("Please select images to remove", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let success = await toast.promise(
        Deleteobjects(
          props.authedUser.jwtToken,
          toBeDeleted,
          "lostchildrenbucket"
        ),
        {
          pending: "Removing Pictures",
          success: "Pictures Deleted Successfully",
          error: "Removal Failed",
        },
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      if (success) {
        let newChildArr = props.children;

        let notDeletedImgs = child.photos.filter((img) => !img.selected);

        for (let i = 0; i < newChildArr.length; i++) {
          if (newChildArr[i].name === child.name) {
            newChildArr[i].photos = notDeletedImgs;
            setImages(notDeletedImgs);
            break;
          }
        }
        dispatch(setChildren(newChildArr));
      }
    }
  };
  const onFileUpload = async (e) => {
    if (e.target.files.length > 10 - imgs.length) {
      toast.error(`Please upload ${10 - imgs.length} images only`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else if (e.target.files.length === 0) {
      toast.error(`Please select images first`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let success = await toast.promise(
      uploadarrtos3editreport(
        props.authedUser.jwtToken,
        e.target.files,
        props.authedUser.email,
        props.authedUser.cognitoUserId,
        props.child.name,
        props.child.location,
        props.authedUser.phoneNumber,
        "lostchildrenbucket"
      ),
      {
        pending: "Adding Pictures",
        success: "Pictures Added Successfully",
        error: "Adding Pictures Failed",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
    if (success) {
      let addedImgs = Object.keys(e.target.files).map((img) => {
        if (e.target.files && e.target.files[img]) {
          return URL.createObjectURL(e.target.files[img]);
        }
        return "";
      });
     
      let selectedImages = addedImgs.map((img) => {
        return { img, selected: false };
      });
      setImages([...imgs, ...selectedImages]);
    }
  };
  const removeChildReport = async (childImgs, childName, childLocation) => {
    let success = await toast.promise(
      Deleteobjects(props.authedUser.jwtToken, childImgs, "lostchildrenbucket"),
      {
        pending: "Deleting Report",
        success: "Report Deleted Successfully",
        error: "Deletion Failed",
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
    if (success) {
      let newChildArr = props.children.filter(
        (child) => childName + childLocation !== child.name + child.Location
      );
     
      dispatch(setChildren(newChildArr));
    }
    handleCloseInfoModal();
    props.setRefresh(!props.refresh);
  };
  return (
    <>
      <GenericStatusCard
        component={
          <img
            className="lost-child-img"
            alt={props.child.name}
            src={props.child.photos[0].img}
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
        <div className="edit-container">
          {/* <ImageList sx={{ width: 620, height: 405 }} cols={3} rowHeight={200}>
            {imgs.map((img, index) => (
              <ImageListItem key={index}>
                <SelectedImg key={index} img={img} editable={editing} />
              </ImageListItem>
            ))}
          </ImageList> */}
          <ImageContainer imgs={imgs} selectable={true} editing={editing} />
          <div className="status-controls-container">
            <Button onClick={handleEditing} disabled={sentReq}>
              {editing ? "Save Changes" : "Enable Editting"}
            </Button>
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
            <Button
              onClick={() => removeChildImages(props.child)}
              disabled={!editing}
            >
              Remove Images
            </Button>
          </div>
          <div className="flex">
            <FiUser size={28} />
            <p className="card-message">Name {props.child.name}</p>
          </div>
          <div className="flex ">
            <FiMapPin size={28} />
            <p className="card-message">Last seen at {props.child.location}</p>
          </div>{" "}
          <div className="status-controls-container">
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "100",
                fontSize: "1.2rem",
                fontFamily: "Quicksand",
                borderRadius: "15px",
                color: "red",
                fontWeight: "600",
                backgroundColor: "white",
               }}
              variant="contained"
              onClick={() => {
                removeChildReport(
                  props.child.photos,
                  props.child.name,
                  props.child.location
                );
              }}
              disabled={sentReq}
            >
              Remove Report
            </Button>
            <Button onClick={() => handleCloseInfoModal()} disabled={sentReq}>
              Close
            </Button>
          </div>
        </div>
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
              component={<FiXCircle className="icon" color="red" />}
              message="No Matches Found"
              onClickFunction={() => handleCloseMatchesModal()}
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
