import { NavLink } from "react-router-dom";
import "../../styles/app.css";
const UserNavbar = (props) => {
  return (
    <ul className="flex sub-navbar">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-li active" : "nav-li")}
        >
          <h1>Home</h1>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Found"
          className={({ isActive }) => (isActive ? "nav-li active" : "nav-li")}
        >
          <h1>Found</h1>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Login"
          className={({ isActive }) => (isActive ? "nav-li active" : "nav-li")}
        >
          <h1>Login</h1>
        </NavLink>
      </li>
    </ul>
  );
};
export default UserNavbar;
