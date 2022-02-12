import { connect } from "react-redux";
import StatusCard from "../Cards/StatusCard";

const StatusMenu=()=>{
    return <div className="status">
        <StatusCard picture='/assets/lost1.png' status={false}/>
        <StatusCard picture='/assets/lost1.png' status={true}/>
        <StatusCard picture='/assets/lost1.png' status={false}/>
        </div>
}

export default connect()(StatusMenu);