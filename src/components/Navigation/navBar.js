import { connect } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "../../styles/app.css";
import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BurgerMenu from "./BurgerMenu";
import ParentNavbar from "./ParentNavbar";
import UserNavbar from "./UserNavbar";
const NavBar = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isBurger = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <nav className="navbar">
      <Link
        to={props.authedUser ? "/Status" : "/"}
        className="logo"
        onClick={() => {
          if (props.authedUser) {
            navigate("/Status");
          } else {
            navigate("/");
          }
        }}
      >
       Lost&Found
      </Link>
      {isBurger ? (
        <BurgerMenu />
      ) : props.authedUser ? (
        <ParentNavbar />
      ) : (
        <UserNavbar />
      )}
    </nav>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NavBar);
/*

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
          <>
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
          </>
        )}
      </Toolbar>
    </AppBar>

*/
