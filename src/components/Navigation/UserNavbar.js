import { Link } from "react-router-dom";
import "../../styles/app.css";
const UserNavbar = () => {
  return (
    <ul className="flex sub-navbar">
     <li className="nav-li">
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </li>
      <li className="nav-li">
        <Link to="/Found">
          <h1>Found</h1>
        </Link>
      </li>
      <li className="nav-li">
        <Link to="/Login">
          <h1>Login</h1>
        </Link>
      </li>
    </ul>
  );
};
export default UserNavbar
