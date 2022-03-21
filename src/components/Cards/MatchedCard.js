import { FiInfo } from "react-icons/fi";
const MatchedCard = (props) => {
  let { img,name } = props;
  let iconSize = 20;
  return (
    <div className="status-card-grid">
      <div>
        <img
          className="found-child-img"
          src={img}
          alt={name}
        />
      </div>
      <div className="flex flex-space-between">
        <p>{name}</p>
        <FiInfo
          size={iconSize}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
export default MatchedCard;
