import { FiCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
const StatusCard = (props) => {
  const color = props.status ? "green" : "red";
  return (
    <div className="status-card-grid">
      <div>
        <img className="lost-child-img" src={props.picture} />
      </div>
      <div className="flex">
        <FiCircle color={color} />
        <p>{props.status ? "Matched" : "Not Matched"}</p>
      </div>
      {!props.status ? (
        <div className="flex">
          <FiEdit />
          <Link to="/report">edit</Link>
        </div>
      ) : null}
    </div>
  );
};

export default StatusCard;
