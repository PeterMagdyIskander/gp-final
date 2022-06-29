import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; 
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const reg = "us-east-1";

const config={
    region: reg,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: reg }),
        identityPoolId: identitypoolid,
        
    })
}
export async function sendmail(Destination,type,id)
{
    const client = new SESClient(config);
    const command = new SendEmailCommand({
        Destination:{ToAddresses:[Destination]},
        Message:{
           
            Body: {
                Text: {
                   
                    Data: "Your "+type+" "+id+" has been found please sign in to your account to see more information.",
                  }
              
            },
            Subject: {
                
                Data: "Lost & Found Report Update",
              
              
            },
          },
        Source:"findlostgradprojectfcis@outlook.com"
    });
    const response = await client.send(command);

}