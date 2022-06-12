import { combineReducers } from "redux";
import authedUser from "./authedUserReducer";
import items from "./itemStatusReducer";
import children from "./childrenStatusReducer";
export default combineReducers({
  authedUser,
  items,
  children,
});
