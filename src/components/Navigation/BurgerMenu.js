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
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiSearch,
  FiActivity,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";
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
  const redirect = (to) => {
    setOpenDrawer(false);
    navigate(to);
  };
  return (
    <>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {props.authedUser !== null ? (
              <>
                <ListItem button onClick={() => redirect("/Report")}>
                  <ListItemIcon sx={sxForIcons}>
                    <RiUserSearchFill />
                  </ListItemIcon>
                  <ListItemText primary={"Report"} />
                </ListItem>
                <ListItem button onClick={() => redirect("/Found")}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiSearch />
                  </ListItemIcon>
                  <ListItemText primary={"Found"} />
                </ListItem>
                <ListItem button onClick={() => redirect("/Status")}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiActivity />
                  </ListItemIcon>
                  <ListItemText primary={"Status"} />
                </ListItem>
                <ListItem button onClick={() => redirect("/Profile")}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiUser />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItem>
                <Divider />
                <ListItem button onClick={signOut}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiLogOut />
                  </ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={signIn}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiLogIn />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItem>
                <ListItem button onClick={signUp}>
                  <ListItemIcon sx={sxForIcons}>
                    <FiUserPlus />
                  </ListItemIcon>
                  <ListItemText>Sign Up</ListItemText>
                </ListItem>
              </>
            )}
          </List>
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
