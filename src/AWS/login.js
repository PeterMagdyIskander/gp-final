import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export function login(mail, password) {
  const user = new CognitoUser({
    Username: mail,
    Pool: UserPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: mail,
    Password: password,
  });

  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      return data;
    },
    onFailure: (err) => {
      console.error("onFailure: ", err);
    },
    newPasswordRequired: (data) => {
      console.log("newPasswordRequired: ", data);
    },
  });
}
