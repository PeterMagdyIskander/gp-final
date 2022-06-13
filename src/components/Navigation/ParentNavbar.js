import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import ProfileMenu from "../Parents/ProfileMenu";
const OwnerNavbar = (props) => {
  const { dispatch } = props;
  
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const buttonSx = {
    bgcolor: "#39A2DB",
    color: "white",
    fontSize: "1.5rem",
    "&&:hover": {
      color: "#39A2DB",
      bgcolor: "white",
    },
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "30px",
  };
  return (
    <>
      <nav className="flex sub-navbar">
        <NavLink to="/Status">Status</NavLink>
        <NavLink to="/Report">Report</NavLink>
        <Fab aria-label="save" sx={buttonSx} onClick={handleOpenModal}>
          {props.authedUser.name[0]}
        </Fab>
        {/* <NavLink to="#" onClick={handleOpenModal}>
          Profile
        </NavLink>
        <NavLink to="/" onClick={signOut}>
          Sign out
        </NavLink> */}
      </nav>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProfileMenu />
      </Modal>
    </>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(OwnerNavbar);
