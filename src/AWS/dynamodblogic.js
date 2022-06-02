import { DynamoDBClient, GetItemCommand,QueryCommand} from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const reg = "us-east-1";


//legacy function
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
            email:{S: Key},
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

//used function
export async function quaryfromdynamodb(TableName,Key,signintoken)
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
        TableName: "userdata",
        ExpressionAttributeValues: {
            ':s': {S: "abadeer@hotmail.com"},
          },
        KeyConditionExpression: 'email = :s', 
        
      };
      try {
       
       
        const data = await client.send(new QueryCommand(params));
        const datareports=new Map();
        const imagesmap=new Map();
        var statusArr=[];   
        for(let i=0;i<data.Items.length;i++)
        {
            
            datareports.set(data.Items[i]["lostchildid"]["S"],data.Items[i]["address"]["S"])
            if (imagesmap.has(data.Items[i]["lostchildid"]["S"]))
            {
               
                
                const imgarm = imagesmap.get(data.Items[i]["lostchildid"]["S"]);
                
               
                imgarm.push(data.Items[i]["imgid"]["S"]);
                
                imagesmap.set(data.Items[i]["lostchildid"]["S"],imgarm)


            }
            else
            {
               
                imagesmap.set(data.Items[i]["lostchildid"]["S"],[data.Items[i]["imgid"]["S"]])
            }
            
        

        }
        
        for (let [key, value] of  datareports.entries()) {
            const x={
                name: key,
                match:false,
                age: 'msh bna8do asln', 
                Location: value,
                photos:imagesmap.get(key)
            }
            statusArr.push(x);
        }
        
        
        
        return statusArr;
    } catch (err) {
        console.log("Error", err);
    }
     

}



//legacy function
export async function updatedynamodb(TableName,Key,signintoken)
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
            primaryKey: "VALUE_1", // For example, 'Season': 2.
            sortKey: "VALUE_2", // For example,  'Episode': 1; (only required if table has sort key).
        },
        UpdateExpression: "set NEW_ATTRIBUTE_NAME_1 = :t, NEW_ATTRIBUTE_NAME_2 = :s", // For example, "'set Title = :t, Subtitle = :s'"
        ExpressionAttributeValues: {
        ":t": "NEW_ATTRIBUTE_VALUE_1", // For example ':t' : 'NEW_TITLE'
        ":s": "NEW_ATTRIBUTE_VALUE_2", // For example ':s' : 'NEW_SUBTITLE'
    },
    ReturnValues: "ALL_NEW"
          
      };
      try {
        const data = await client.send(new GetItemCommand(params));
        console.log("Success", data.Item);
        return data
    } catch (err) {
        console.log("Error", err);
    }
     

}


export async function quaryfromdynamodbgetitem(TableNamee,mail,signintoken)
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
        TableName: TableNamee,
        ExpressionAttributeValues: {
            ':s': {S: mail},
          },
        KeyConditionExpression: 'mail = :s', 
        
      };
      try 
      {
       
       
        const data = await client.send(new QueryCommand(params));
        
        var statusArr=[];   
        console.log("appppppppppppppppppppppppppppppp",data)
        for(let i=0;i<data.Items.length;i++)
        {
            const itemid = data.Items[i]["id"]["S"];
            const type=data.Items[i]["itemtype"]["S"];
            const statobject={
                type:type,
                id:itemid
            }

            statusArr.push(statobject)
        }
        console.log("abadeeeeeeeeeer",statusArr)
        
        
        return statusArr;
    } catch (err) {
        console.log("Error", err);
    }
     

}

  