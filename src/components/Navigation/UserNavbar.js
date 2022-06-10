import { NavLink } from "react-router-dom";
const UserNavbar = () => {
  return (
    <nav className="flex sub-navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Found">Found</NavLink>
      <NavLink to="/Login">Login</NavLink>
    </nav>
  );
};
export default UserNavbar;
