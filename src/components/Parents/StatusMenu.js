import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getReportedChildById } from "../../utils/api";
import StatusCard from "../Cards/StatusCard";

const StatusMenu=(props)=>{
    const [children,setChildren]=useState([]);
    useEffect(()=>{
        getReportedChildById(props.authedUser.reportedChildrenID).then(res=>setChildren(res))
    })
    return <div className="status">
        
        {
            children.map(c=>{
                
                return <StatusCard child={c}/>
            })
        }
        </div>
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser,
    };
  }
  export default connect(mapStateToProps)(StatusMenu);