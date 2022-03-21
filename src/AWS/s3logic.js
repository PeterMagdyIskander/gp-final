import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const region = "us-east-1";

export async function uploadtos3(
  signintoken,
  file,
  owneremailaddress,
  lostchildid,
  imgid,
  Bucket
) {
  console.log("hi", Object.keys(file), imgid);
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
      },
    }),
  });
  for (let i = 0; i < Object.keys(file).length; i++) {
    console.log(file[i].name);
    const uploadParams = {
      Bucket: Bucket,
      Key: i + imgid, //get alragel mnazel kam sora nkteb emailaddress0
      Body: file[i],
      Metadata: {
        owner: owneremailaddress,
        lostchildid: lostchildid,
        imgid: i + imgid,
      },
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
    }
  }
}
export async function singuploadtos3(
  signintoken,
  file,
  owneremailaddress,
  lostchildid,
  imgid,
  Bucket
) {
  console.log("hi", Object.keys(file), imgid);
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
      },
    }),
  });

  console.log(file[0].name);
  const uploadParams = {
    Bucket: Bucket,
    Key: imgid, //get alragel mnazel kam sora nkteb emailaddress0
    Body: file[0],
    Metadata: {
      owner: owneremailaddress,
      lostchildid: lostchildid,
      imgid: imgid,
    },
  };
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
}
export async function gets3files(signintoken, files, Bucket) {
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
      },
    }),
  });

  const uploadParams = {
    Bucket: Bucket,
    Key: files[0],
  };

  try {
    const data = await s3.send(new GetObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
