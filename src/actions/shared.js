
import { getItems } from "../utils/api"
import { showLoading,hideLoading } from "react-redux-loading-bar"
import { receiveItems } from "./items"

export function handleInitialData (info) {
  return (dispatch) => {
    dispatch(showLoading())
    return getItems()
      .then(items => {
          dispatch(receiveItems(items))
          dispatch(hideLoading())
      })
  }
}
