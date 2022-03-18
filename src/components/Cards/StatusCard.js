import { FiInfo, FiXCircle, FiCheckCircle } from "react-icons/fi";
const StatusCard = (props) => {
  const color = props.child.status ? "green" : "red";
  let iconSize = 20;
  return (
    <div className="status-card-grid">
      <div>
        <img className="lost-child-img" src={props.child.imgs[0]} />
      </div>
      {props.child.status ? (
        <div className="flex flex-space-between">
          <div className="flex">
            <FiCheckCircle size={iconSize} color={color} />
            <p>Matched</p>
          </div>

          <FiInfo size={iconSize} color={color} />
        </div>
      ) : (
        <div className="flex flex-space-between">
          <div className="flex">
            <FiXCircle size={iconSize} color={color} />
            <p>Not Matched</p>
          </div>

          <FiInfo size={iconSize} color={color} />
        </div>
      )}
    </div>
  );
};

export default StatusCard;
