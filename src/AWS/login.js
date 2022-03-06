import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

const region = "us-east-1";
const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
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
