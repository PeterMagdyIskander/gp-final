import {RECEIVE_ITEMS} from '../actions/items'

export default function items (state = [], action) {
    switch(action.type) {
      case RECEIVE_ITEMS :
        return {
          ...state,
          ...action.items
        }
        default :
      return state
    } 
    
}