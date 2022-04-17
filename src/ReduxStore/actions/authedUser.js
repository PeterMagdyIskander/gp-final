export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function setAuthedUser(user) {
  saveTokenInLocalStorage(user);
  let authedUser;
  if (user) {
    authedUser = {
      jwtToken: user.jwtToken,
      email: user.payload.email,
      phoneNumber: user.payload.phone_number,
      name: `${user.payload.name} ${user.payload.family_name}`,
      tokenExpiryDate: user.payload.exp * 1000,
      cognitoUserId:user.payload["cognito:username"],
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
  console.log("auto logging off in ", timer);

  setTimeout(() => {
    localStorage.removeItem("userDetails");
    dispatch(setAuthedUser(null));
  }, timer);
}
export function checkAutoLogin(dispatch) {
  const userDetails = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (userDetails === "null" || !userDetails) return false;

  tokenDetails = JSON.parse(userDetails);
  console.log(tokenDetails);
  let expireDate = new Date(tokenDetails.payload.exp * 1000);
  let todaysDate = new Date().getTime();
  console.log(todaysDate, expireDate);
  if (todaysDate > expireDate) return false;

  console.log(tokenDetails);
  dispatch(setAuthedUser(tokenDetails));

  const timer = expireDate.getTime() - todaysDate;
  runLogoutTimer(dispatch, timer);
}

export function isAuthedForRouting(){
  const userDetails = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (userDetails === "null" || !userDetails) return false;

  tokenDetails = JSON.parse(userDetails);
  console.log(tokenDetails);
  let expireDate = new Date(tokenDetails.payload.exp * 1000);
  let todaysDate = new Date().getTime();
  console.log(todaysDate, expireDate);
  if (todaysDate > expireDate) return false;

  return true;
}