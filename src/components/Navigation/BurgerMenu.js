import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { setChildren } from "../../ReduxStore/actions/children";
import { setItems } from "../../ReduxStore/actions/items";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
const BurgerMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { dispatch } = props;
  const signOut = () => {
    console.log("Successufully Signed out");

    dispatch(setAuthedUser(null));
    dispatch(setChildren(null));
    dispatch(setItems(null));
    closeDrawer();
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const navigate = useNavigate();
  const signIn = () => {
    setOpenDrawer(false);
    navigate("/signin");
  };
  const signUp = () => {
    setOpenDrawer(false);
    navigate("/signup");
  };
  console.log(props);
  const sxForIcons = { minWidth: 32 };

  return (
    <>
      <FiMenu
        className="burger-button"
        size="4vh"
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
            backgroundImage: "linear-gradient(to right, #89b0ae, #c9ada7)",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FiX
            className="burger-button"
            size="4vh"
            style={{ alignSelf: "flex-end" }}
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
              <NavLink to="/Profile" onClick={() => closeDrawer()}>
                Profile
              </NavLink>
              <NavLink to="/" onClick={signOut}>
                Sign out
              </NavLink>
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
    </>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(BurgerMenu);
