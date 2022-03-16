import { FiCircle } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
const StatusCard = (props) => {
  const color = props.child.status ? "green" : "red";
  return (
    <div className="status-card-grid">
      <div>
        <img className="lost-child-img" src={props.child.imgs[0]} />
      </div>
      <div className="flex">
        <FiCircle color={color} />
        <p>{props.child.status ? "Matched" : "Not Matched"}</p>
      </div>
      {!props.child.status ? (
        <div className="flex">
          <FiEdit />
          <Link to="/report" state={{child:props.child}}>edit</Link>
        </div>
      ) : null}
      
    </div>
    
  );
};

export default StatusCard;
