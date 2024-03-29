import {
  RekognitionClient,
  SearchFacesByImageCommand,
} from "@aws-sdk/client-rekognition";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { convertstringtoascii } from "../AWS/s3logic";
const identitypoolid = process.env.REACT_APP_IDENTITY_POOL_ID;
const reg = process.env.REACT_APP_REGION;
const COGNITO_IDP = process.env.REACT_APP_COGNITO_IDP;

export async function searchforsim(
  searchcollection,
  targetfacebucket,
  targetfaceimagename,
  signintoken
) {
  
  const client = new RekognitionClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const searchinput = {
    CollectionId: searchcollection,
    Image: {
      S3Object: {
        Bucket: targetfacebucket,
        Name: targetfaceimagename,
      },
    },
  };
  var photoidarray = [];
  const command = new SearchFacesByImageCommand(searchinput);
  const response = await client.send(command);
  for (const element of response["FaceMatches"]) {
    photoidarray.push(element["Face"]["ExternalImageId"]);
  }

  return photoidarray;
}
export async function searchforsimpasserby(i,
  searchcollection,
  targetfacebucket,
  targetfaceimagename
) {
  
  targetfaceimagename=convertstringtoascii(targetfaceimagename)+i
  const client = new RekognitionClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
    }),
  });
  const searchinput = {
    CollectionId: searchcollection,
    Image: {
      S3Object: {
        Bucket: targetfacebucket,
        Name: targetfaceimagename,
      },
    },
  };
  var photoidarray = [];
  try {
    const command = new SearchFacesByImageCommand(searchinput);
    const response = await client.send(command);
    
    for (const element of response["FaceMatches"]) {
    photoidarray.push(element["Face"]["ExternalImageId"]);
    }
    return photoidarray;
    
  } catch (error) {
    
    if (error.toString().includes("no faces"))
    {
        return "NOFACE"

    }
    return false;
    
  }
  
}

export async function searchforsimasciihandeled(i,
  searchcollection,
  targetfacebucket,
  targetfaceimagename,
  signintoken
) {
  targetfaceimagename=convertstringtoascii(targetfaceimagename)+i
 
  const client = new RekognitionClient({
    region: reg,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: reg }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const searchinput = {
    CollectionId: searchcollection,
    Image: {
      S3Object: {
        Bucket: targetfacebucket,
        Name: targetfaceimagename,
      },
    },
  };
  try {
    var photoidarray = [];
    const command = new SearchFacesByImageCommand(searchinput);
    const response = await client.send(command);
    for (const element of response["FaceMatches"]) {
      photoidarray.push(element["Face"]["ExternalImageId"]);
    }

    return photoidarray;
    
  } catch (error) {
    
    if (error.toString().includes("no faces"))
    {
        return "NOFACE"

    }
    return false;
    
  }
  
}
