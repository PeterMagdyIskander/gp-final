import { CognitoIdentityProviderClient, UpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider"; 
import { fromCognitoIdentityPool,FromCognitoIdentity } from "@aws-sdk/credential-provider-cognito-identity";
import{updatedynamodbbphone}from '../AWS/dynamodblogic';
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
const region = "us-east-1";
const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const config={
    region: region,
    credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
           
        }),
    
}

export async function changephonenumber(phone,token,accessToken,mail) {
    console.log("at",accessToken);
    console.log("abadeer",token);
    console.log("ph",phone);
    
    const client = new CognitoIdentityProviderClient(config);
    
    const input ={
        AccessToken:accessToken,
        UserAttributes:[
            
            {Name:"phone_number",Value:phone}
        ]
    
    }
    const command = new UpdateUserAttributesCommand(input);
   

    try {
        
        const response = await client.send(command);
        updatedynamodbbphone(phone,token,mail)
        console.log(response);
        
    } catch (error) {
        console.log("error",error);
        
        
    }
    
}
