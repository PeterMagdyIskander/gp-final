import {
  RekognitionClient,
  SearchFacesByImageCommand,
} from "@aws-sdk/client-rekognition";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
const reg = "us-east-1";
const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
export async function searchforsim(searchcollection, targetfacebucket, targetfaceimagename,signintoken) {
   
  const client = new RekognitionClient(
      {
          region: reg,
          credentials: fromCognitoIdentityPool({
              client: new CognitoIdentityClient({ region: reg }),
              identityPoolId: identitypoolid,
              logins: {
                  'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': signintoken,
              }
          })
      }
  );
  const searchinput = {
      CollectionId:searchcollection,
      Image: {
          S3Object: {
              Bucket: targetfacebucket,
              Name: targetfaceimagename
          }
      },

  }
  var photoidarray=[];
  const command = new SearchFacesByImageCommand(searchinput);
  const response = await client.send(command);
  for (const element of response["FaceMatches"]) {
      photoidarray.push(element["Face"]["ExternalImageId"]);
     
  }
  return photoidarray;
  
}