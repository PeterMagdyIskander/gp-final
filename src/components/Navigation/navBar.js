import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { useState } from "react";
import "../../styles/app.css";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  Box,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  FiUser,
  FiSearch,
  FiActivity,
  FiLogOut,
} from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";
import BurgerMenu from "./BurgerMenu";
const NavBar = (props) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const { dispatch } = props;
  const navigate = useNavigate();
  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
    setValue(0)
    navigate("/signin");
  };
  console.log(value)
  const signIn = () => navigate("/signin");
  const signUp = () => navigate("/signup");
  return (
    <AppBar
      sx={{
        background: "#063970",
        paddingRight: "1%",
        paddingLeft: "1%",
        position: "initial",
      }}
    >
      <Toolbar>
        <Typography sx={{ fontSize: "1.7rem" }}>Lost&Found</Typography>
        {isMatch ? (
          <>
            <BurgerMenu />
          </>
        ) : (
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            {props.authedUser !== null ? (
              <Tabs
                indicatorColor="text.primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  label="Report"
                  component={Link}
                  to={"/Report"}
                  icon={<RiUserSearchFill />}
                />
                <Tab
                  label="Found"
                  component={Link}
                  to={"/Found"}
                  icon={<FiSearch />}
                />
                <Tab
                  label="Status"
                  component={Link}
                  to={"/Status"}
                  icon={<FiActivity />}
                />
                <Tab
                  label="Profile"
                  component={Link}
                  to={"/Profile"}
                  icon={<FiUser />}
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ bgcolor: "#abc" }}
                />
                <Tab
                  label="Log Out"
                  component={Button}
                  onClick={signOut}
                  icon={<FiLogOut />}
                />{" "}
              </Tabs>
            ) : (
              <Tabs
                indicatorColor="text.primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  label="Login"
                  component={Button}
                  onClick={signIn}
                  icon={<FiLogOut />}
                />
                <Tab
                  label="Sign up"
                  component={Button}
                  onClick={signUp}
                  icon={<FiLogOut />}
                />{" "}
              </Tabs>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NavBar);
