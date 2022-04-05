import { combineReducers } from 'redux'
import authedUser from './authedUserReducer'
import {loadingBarReducer} from 'react-redux-loading-bar'
export default combineReducers({
    authedUser,
    loadingBar: loadingBarReducer,
  })