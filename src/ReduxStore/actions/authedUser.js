import { setChildren } from "./children";
import { setItems } from "./items";
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export function setAuthedUser(user) {
  saveTokenInLocalStorage(user);
  let authedUser;
  if (user) {
    authedUser = {
      jwtToken: user.idToken.jwtToken,
      email: user.idToken.payload.email,
      phoneNumber: user.idToken.payload.phone_number,
      name: `${user.idToken.payload.name} ${user.idToken.payload.family_name}`,
      tokenExpiryDate: user.idToken.payload.exp * 1000,
      cognitoUserId: user.idToken.payload["cognito:username"],
      accessToken: user.accessToken,
    };
  } else {
    authedUser = user;
  }
  return {
    type: SET_AUTHED_USER,
    user: authedUser,
  };
}

function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer) {
  setTimeout(() => {
    localStorage.removeItem("userDetails");
    dispatch(setAuthedUser(null));
    dispatch(setChildren(null));
    dispatch(setItems(null));
  }, timer);
}

export function isAuthedForRouting(dispatch) {
  const userDetails = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (userDetails === "null" || !userDetails) return false;

  tokenDetails = JSON.parse(userDetails);
  let expireDate = new Date(tokenDetails.idToken.payload.exp * 1000);
  let todaysDate = new Date().getTime();
  if (todaysDate > expireDate) return false;

  dispatch(setAuthedUser(tokenDetails));
  const timer = expireDate.getTime() - todaysDate;
  runLogoutTimer(dispatch, timer);
  return true;
}
