import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = process.env.REACT_APP_IDENTITY_POOL_ID;
const reg = process.env.REACT_APP_REGION;
const COGNITO_IDP = process.env.REACT_APP_COGNITO_IDP;
const src = process.env.REACT_APP_SOURCE;
const config = {
  region: reg,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: reg }),
    identityPoolId: identitypoolid,
  }),
};
export async function sendmail(Destination, Message, Source) {
  const client = new SESClient(config);
  const command = new SendEmailCommand({
    Destination: { ToAddresses: [Destination] },
    Message: {
      Body: {
        Text: {
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: src,
  });
  const response = await client.send(command);
}
