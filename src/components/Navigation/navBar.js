import { connect } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
import { useEffect, useState } from "react";
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
import { FiUser, FiSearch, FiActivity, FiLogOut, FiHome } from "react-icons/fi";
import { RiUserSearchFill } from "react-icons/ri";
import BurgerMenu from "./BurgerMenu";
const NavBar = (props) => {
  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const { dispatch,authedUser } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
    setValue("/login");
    navigate("/login");
  };
  console.log(value);
  const signIn = () => navigate("/login");
  const signUp = () => navigate("/signup");
  useEffect(() => {
    console.log("sadasdas");

    setValue(location.pathname);
  }, [authedUser]);
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
        <Typography
          sx={{ fontSize: "1.7rem", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Lost&Found
        </Typography>
        {isMatch ? (
          <>
            <BurgerMenu />
          </>
        ) : (
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            {props.authedUser !== null ? (
              <Tabs
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  label="Home"
                  component={Link}
                  to={"/"}
                  icon={<FiHome />}
                  value="/"
                />
                <Tab
                  label="Report"
                  component={Link}
                  to={"/Report"}
                  icon={<RiUserSearchFill />}
                  value="/Report"
                />
                <Tab
                  label="Status"
                  component={Link}
                  to={"/Status"}
                  icon={<FiActivity />}
                  value="/Status"
                />
                <Tab
                  label="Profile"
                  component={Link}
                  to={"/Profile"}
                  icon={<FiUser />}
                  value="/Profile"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ bgcolor: "#abc" }}
                  value="/divider"
                />
                <Tab
                  label="Log Out"
                  component={Button}
                  onClick={signOut}
                  icon={<FiLogOut />}
                  value="/logout"
                />{" "}
              </Tabs>
            ) : (
              <Tabs
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  label="Home"
                  component={Link}
                  to={"/"}
                  icon={<FiHome />}
                  value="/"
                />
                <Tab
                  label="Found"
                  component={Link}
                  to={"/Found"}
                  icon={<FiSearch />}
                  value="/Found"
                />
                <Tab
                  label="Login"
                  component={Button}
                  onClick={signIn}
                  icon={<FiLogOut />}
                  value="/login"
                />
                <Tab
                  label="Sign up"
                  component={Button}
                  onClick={signUp}
                  icon={<FiLogOut />}
                  value="/logout"
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
