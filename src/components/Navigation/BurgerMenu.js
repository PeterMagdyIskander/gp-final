import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
const BurgerMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { dispatch } = props;
  const signOut = () => {
    console.log("Successufully Signed out");
    setOpenDrawer(false);
    dispatch(setAuthedUser(null));
    navigate("/signin");
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
        onClick={() => setOpenDrawer(!openDrawer)}
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
            onClick={() => setOpenDrawer(!openDrawer)}
          />

          {props.authedUser !== null ? (
            <nav className="burger-menu">
              <h1>Lost&Found</h1>
              <NavLink to="/Status">Status</NavLink>
              <NavLink to="/Report">Report</NavLink>
              <NavLink to="/" onClick={signOut}>
                Sign out
              </NavLink>
            </nav>
          ) : (
            <nav className="burger-menu">
              <h1>Lost&Found</h1>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Found">Found</NavLink>
              <NavLink to="/Login">Login</NavLink>
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
