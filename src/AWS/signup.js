import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  fromCognitoIdentityPool,
  FromCognitoIdentity,
} from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

export async function Signup(username, password, email, phone, name, lastname) {
  const client = new CognitoIdentityProviderClient({
    region: process.env.REACT_APP_REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: process.env.REACT_APP_REGION,
      }),
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    }),
  });
  const input = {
    ClientId: process.env.REACT_APP_CLIENT_ID,
    Password: password,
    Username: username,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "family_name", Value: lastname },
      { Name: "name", Value: name },
      { Name: "phone_number", Value: phone },
    ],
  };
  const command = new SignUpCommand(input);
  const response = await client.send(command);
  console.log(response);
}

export async function conSignup(username, con) {
  const client = new CognitoIdentityProviderClient({
    region: process.env.REACT_APP_REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({
        region: process.env.REACT_APP_REGION,
      }),
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    }),
  });
  const input = {
    ClientId: process.env.REACT_APP_CLIENT_ID,
    ConfirmationCode: con,
    Username: username,
  };
  const command = new ConfirmSignUpCommand(input);
  const response = await client.send(command);
  console.log(response);
}
