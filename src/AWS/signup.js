import { CognitoIdentityProviderClient, SignUpCommand,ConfirmSignUpCommand} from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool,FromCognitoIdentity } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity"; 

const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const region = "us-east-1";
export async function Signup(username,password,email,phone,name,lastname) {
    const client = new CognitoIdentityProviderClient({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
           
        }),
    
    });
    const input ={
        ClientId:"7589rlmdiqj0de3j4aoqj1r4pc",
        Password:password,
        Username:username,
        UserAttributes:[
            {Name:"email",Value:email},
            {Name:"family_name",Value:lastname},
            {Name:"name",Value:name},
            {Name:"phone_number",Value:phone}
        ]
    
    }
    const command = new SignUpCommand(input);
    const response = await client.send(command);
    console.log(response)

}

export async function conSignup(username,con) {
    const client = new CognitoIdentityProviderClient({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
           
        }),
    
    });
    const input ={
        ClientId:"7589rlmdiqj0de3j4aoqj1r4pc",
        ConfirmationCode:con,
        Username:username
    
    }
    const command = new ConfirmSignUpCommand(input);
    const response = await client.send(command);
    console.log(response)

}
