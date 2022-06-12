import { SET_CHILDREN } from "../actions/children.js";

export default function children(state = null, action) {
  switch (action.type) {
    case SET_CHILDREN:
      return action.children;
    default:
      return state;
  }
}
