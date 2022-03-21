import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const reg = "us-east-1";

export async function getfromdynamodb(TableName,Key,signintoken)
{
    
    const client = new DynamoDBClient({
        region: reg,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: reg }),
            identityPoolId: identitypoolid,
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': signintoken,
            }
        })
    });
    const params = {
        TableName: TableName, 
        Key: {
            email:{S:Key},
          },
          
      };
      try {
        const data = await client.send(new GetItemCommand(params));
        console.log("Success", data.Item);
        return data
    } catch (err) {
        console.log("Error", err);
    }
     

}

  