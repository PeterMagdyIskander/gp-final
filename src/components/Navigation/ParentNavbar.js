// import { Link } from "react-router-dom";
// import { setAuthedUser } from "../../ReduxStore/actions/authedUser";
// import { connect } from "react-redux";
// import '../../styles/app.css';
// const OwnerNavbar = (props) => {
//   const {dispatch}=props;
//   const signOut = () => {
//     console.log("Successufully Signed out");
//     dispatch(setAuthedUser(null));
//   };
//   return (
//     <div>
//       <nav>
//         <ul>
//         <li className="nav-li">
//             <Link to="/found">Found</Link>
//           </li>
//           <li className="nav-li">
//             <Link to="/Profile">Profile</Link>
//           </li>
//           <li className="nav-li">
//             <Link to="/Status">Status</Link>
//           </li>
//           <li className="nav-li">
//           <Link to="/Report" >Report</Link>
//           </li>
//          <li className="nav-li">
//          <div className="separator"></div>
//          </li>
//          <li className="nav-li">
//           <Link to="/" onClick={signOut}>Sign out</Link>
//           </li>
          
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default connect()(OwnerNavbar);
