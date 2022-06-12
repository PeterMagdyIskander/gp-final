import { SET_ITEMS } from "../actions/items.js";

export default function items(state = null, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  }
}
