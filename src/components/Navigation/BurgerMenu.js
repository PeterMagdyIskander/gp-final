import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { setChildren } from "../../ReduxStore/actions/children";
import { setItems } from "../../ReduxStore/actions/items";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../Parents/ProfileMenu";
import Modal from "@mui/material/Modal";
import { FiX, FiMenu } from "react-icons/fi";
const BurgerMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { dispatch } = props;
  const signOut = () => {
    

    dispatch(setAuthedUser(null));
    dispatch(setChildren(null));
    dispatch(setItems(null));
    closeDrawer();
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = useState(false);


  const sxForIcons = { minWidth: 32 };

  return (
    <>
      <FiMenu
        className="burger-button"
        size="4vh"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenDrawer(true)}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            width: "100vw",
            backgroundColor:"#eff4f7",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FiX
            className="burger-button"
            size="4vh"
            style={{ alignSelf: "flex-end", cursor: "pointer" }}
            onClick={() => closeDrawer()}
          />

          {props.authedUser !== null ? (
            <nav className="burger-menu">
              <h1>Lost&Found</h1>
              <NavLink to="/Status" onClick={() => closeDrawer()}>
                Status
              </NavLink>
              <NavLink to="/Report" onClick={() => closeDrawer()}>
                Report
              </NavLink>
              <p style={{ cursor: "pointer" }} onClick={handleOpenModal}>
                Profile
              </p>
            </nav>
          ) : (
            <nav className="burger-menu">
              <h1>Lost&Found</h1>
              <NavLink to="/" onClick={() => closeDrawer()}>
                Home
              </NavLink>
              <NavLink to="/Found" onClick={() => closeDrawer()}>
                Found
              </NavLink>
              <NavLink to="/Login" onClick={() => closeDrawer()}>
                Login
              </NavLink>
            </nav>
          )}
        </Box>
      </Drawer>
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
export default connect(mapStateToProps)(BurgerMenu);
