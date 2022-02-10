import { combineReducers } from 'redux'
import items from './itemsReducer'
import authedUser from './authedUserReducer'
import {loadingBarReducer} from 'react-redux-loading-bar'
export default combineReducers({
    authedUser,
    items,
    loadingBar: loadingBarReducer,
  })