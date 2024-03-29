import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand
} from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import {sendmail} from "../AWS/maillogic"

const identitypoolid = process.env.REACT_APP_IDENTITY_POOL_ID;
const reg = process.env.REACT_APP_REGION;
const COGNITO_IDP = process.env.REACT_APP_COGNITO_IDP;

export async function getchildids(email,token)
{
    const reports=await quaryfromdynamodb("userdata",email,token);
    const reportsSet = new Set()
    for(let i=0;i<reports.length;i++)
    {
        reportsSet.add(reports[i]['name'])    
        
    }
    return reportsSet


}

//used function
export async function quaryfromdynamodb(TableName, Key, signintoken) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const params = {
    TableName: "userdata",
    ExpressionAttributeValues: {
      ":s": { S: Key },
    },
    KeyConditionExpression: "email = :s",
  };
  try {
    const data = await client.send(new QueryCommand(params));
    const datareports = new Map();
    const imagesmap = new Map();
    var statusArr = [];
    for (let i = 0; i < data.Items.length; i++) {
      datareports.set(
        data.Items[i]["lostchildid"]["S"],
        data.Items[i]["address"]["S"]
      );
      if (imagesmap.has(data.Items[i]["lostchildid"]["S"])) {
        const imgarm = imagesmap.get(data.Items[i]["lostchildid"]["S"]);

        imgarm.push(data.Items[i]["imgid"]["S"]);

        imagesmap.set(data.Items[i]["lostchildid"]["S"], imgarm);
      } else {
        imagesmap.set(data.Items[i]["lostchildid"]["S"], [
          data.Items[i]["imgid"]["S"],
        ]);
      }
    }

    for (let [key, value] of datareports.entries()) {
      const x = {
        name: key,
        match: false,
        age: "msh bna8do asln",
        Location: value,
        photos: imagesmap.get(key),
      };
      statusArr.push(x);
    }

    return statusArr;
  } catch (err) {
    
    
    return false;
  }
}

//legacy function
export async function updatedynamodb(TableName, Key, signintoken) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const params = {
    TableName: TableName,
    Key: {
      primaryKey: "VALUE_1", // For example, 'Season': 2.
      sortKey: "VALUE_2", // For example,  'Episode': 1; (only required if table has sort key).
    },
    UpdateExpression:
      "set NEW_ATTRIBUTE_NAME_1 = :t, NEW_ATTRIBUTE_NAME_2 = :s", // For example, "'set Title = :t, Subtitle = :s'"
    ExpressionAttributeValues: {
      ":t": "NEW_ATTRIBUTE_VALUE_1", // For example ':t' : 'NEW_TITLE'
      ":s": "NEW_ATTRIBUTE_VALUE_2", // For example ':s' : 'NEW_SUBTITLE'
    },
    ReturnValues: "ALL_NEW",
  };
  try {
    const data = await client.send(new GetItemCommand(params));
    
    return data;
  } catch (err) {
   
    return false;
  }
}

export async function quaryfromdynamodbgetitem(TableNamee, mail, signintoken) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const params = {
    TableName: TableNamee,
    ExpressionAttributeValues: {
      ":s": { S: mail },
    },
    KeyConditionExpression: "mail = :s",
  };
  try {
    const data = await client.send(new QueryCommand(params));

    var statusArr = [];
   
    for (let i = 0; i < data.Items.length; i++) {
      const itemid = data.Items[i]["id"]["S"];
      const type = data.Items[i]["itemtype"]["S"];
      const statobject = {
        type: type,
        id: itemid,
      };

      statusArr.push(statobject);
    }
    

    return statusArr;
  } catch (err) {
   
    return false;
  }
}

export async function additemdb(itemtype, uniqid, phone, email, signintoken) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });

  var command = new PutItemCommand({
    Item: {
      itemtype: { S: itemtype },
      id: { S: uniqid },
      phone: { S: phone },
      email: { S: email },
    },
    TableName: "itemslost",
  });
  var response = await client.send(command);
  
  command = new PutItemCommand({
    Item: {
      itemtype: { S: itemtype },
      id: { S: uniqid },
      mail: { S: email },
    },
    TableName: "itemslostuserdata",
  });
  response = await client.send(command);
  
  return true;
}

export async function additemdbpasserby(
  itemtype,
  uniqid,
  phone,
  address,
  lat,
  lng
) {
  
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
    }),
  });

  const command = new PutItemCommand({
    Item: {
      itemtype: { S: itemtype },
      id: { S: uniqid },
      phone: { S: phone },
      address: { S: address },
      lat: { S: lat },
      lng: { S: lng },
    },
    TableName: "itemsfound",
  });
  const response = await client.send(command);
  
  return true;
}
export async function getfromdynamodbpasserby(TableName, itype, unid) {
  
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
    }),
  });
  const params = {
    TableName: TableName,
    Key: {
      itemtype: { S: itype },
      id: { S: unid },
    },
  };
  try {
    const data = await client.send(new GetItemCommand(params));
    
    if (data.Item == null) {
      
      return [];
    }
    const phonee=await getfromdynamodbphonenumber(data.Item["email"]["S"])
    const ret = [
      {
        id: data.Item["id"]["S"],
        type: data.Item["itemtype"]["S"],
        email: data.Item["email"]["S"],
        phone: phonee,
      },
    ];
    sendmail(ret[0]['email'],'Item',ret[0]['id']);

    return ret;
  } catch (err) {
    
  }
}
export async function getfromdynamodb(TableName, itype, unid, signintoken) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const params = {
    TableName: TableName,
    Key: {
      itemtype: { S: itype },
      id: { S: unid },
    },
  };
  try {
    const data = await client.send(new GetItemCommand(params));
    
    if (data.Item == null) {
     
      return [];
    }
    const ret = [
      {
        address: data.Item["address"]["S"],
        id: data.Item["id"]["S"],
        type: data.Item["itemtype"]["S"],
        lat: data.Item["lat"]["S"],
        lng: data.Item["lng"]["S"],
        phone: data.Item["phone"]["S"],
      },
    ];
    return ret;
  } catch (err) {
    
  }
}
export async function deleteitem(itemid, email, signintoken, itemtype) {
  const client = new DynamoDBClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  var params = {
    TableName: "itemslostuserdata",
    Key: {
      mail: { S: email },
      id: { S: itemid },
    },
  };

  try {
    const data = await client.send(new DeleteItemCommand(params));
    
  } catch (err) {
   
  }
  params = {
    TableName: "itemslost",
    Key: {
      itemtype: { S: itemtype },
      id: { S: itemid },
    },
  };
  try {
    const data = await client.send(new DeleteItemCommand(params));
    
    return data;
  } catch (err) {
   
  }
}
export async function updatedynamodbbphone(nephone,token,email)
{
    
    const client = new DynamoDBClient({
        region: reg,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: reg }),
            identityPoolId: identitypoolid,
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': token,
            }
        })
    });
    const params = {
        TableName: "usercontactinfo", 
        Key: {
            emailadress :{S: email},
            

          },
        UpdateExpression: "set phone = :t", // For example, "'set Title = :t, Subtitle = :s'"
        ExpressionAttributeValues: {
        ':t': {S:nephone}, 
    },
    

          
      };
      try {
        const data = await client.send(new UpdateItemCommand(params));
        
        return data
    } catch (err) {
       
    }
     

}
export async function getfromdynamodbphonenumber(email)
{
    
    const client = new DynamoDBClient({
        region: reg,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: reg }),
            identityPoolId: identitypoolid,
            
        })
    });
    const params = {
        TableName: "usercontactinfo", 
        Key: {
            emailadress :{S: email},
            

          },
      };
      try {
        const data = await client.send(new GetItemCommand(params));
        
        return data.Item["phone"]["S"]
    } catch (err) {
        
    }
     

}

  
