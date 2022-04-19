import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const region = "us-east-1";

export async function uploadarrtos3(
  signintoken,
  file,
  owneremailaddress,
  uid,
  lostchildid,
  address,
  phone,
  Bucket
) {
  console.log(uid, address);
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
  var success = true;
  for (let i = 0; i < Object.keys(file).length; i++) {
    console.log(Object.keys(file).length);
    console.log(file[i]);

    const uploadParams = {
      Bucket: Bucket,
      Key: uid + lostchildid + i,
      Body: file[i],
      Metadata: {
        owner: owneremailaddress,
        lostchildid: lostchildid,
        imgid: uid + lostchildid + i,
        address: address,
        phonenumber: phone,
      },
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
      success = false;
    }
  }
  return success;
}

export async function singuploadtos3(
  signintoken,
  file,
  owneremailaddress,
  lostchildid,
  imgid,
  Bucket
) {
  console.log(file);
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
export async function gets3file(id, signintoken, Bucket) {
  console.log(id);
  const s3 = new S3({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": signintoken,
      },
    }),
  });

  var uriarr = [];
  for (let i = 0; i < id.length; i++) {
    try {
      const uploadParams = {
        Bucket: Bucket,
        Key: id[i],
      };
      const command = new GetObjectCommand(uploadParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

      uriarr.push(url);

      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }
  }
  return uriarr;
}
export async function Deleteobject(signintoken, oid, Bucket) {
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
  const Params = {
    Bucket: Bucket,
    Key: oid,
  };
  try {
    const data = await s3.send(new DeleteObjectCommand(Params));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
  return true;
}

export async function Deleteobjects(signintoken, oid, Bucket) {
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
  var success = true;
  for (let i = 0; i < oid.length; i++) {
    const Params = {
      Bucket: Bucket,
      Key: oid[i],
    };
    try {
      const data = await s3.send(new DeleteObjectCommand(Params));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
      success = false;
    }
  }

  return success;
}
export async function uploadarrtos3passerby(
  file,
  lat,
  lng,
  address,
  name,
  phoneNumber,
  filename,
  Bucket
) {
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
    }),
  });

  const uploadParams = {
    Bucket: Bucket,
    Key: filename,
    Body: file,
    Metadata: {
      name: name,
      lng: lng.toString(),
      lat: lat.toString(),
      phoneNumber: phoneNumber.toString(),
      writenaddress: address,
    },
  };
  console.log(uploadParams);
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
export async function gets3filepasserby(id, Bucket) {
  const s3 = new S3({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
    }),
  });

  var uriarr = [];
  for (let i = 0; i < id.length; i++) {
    try {
      const uploadParams = {
        Bucket: Bucket,
        Key: id[i],
      };
      const command = new GetObjectCommand(uploadParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

      uriarr.push(url);

      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }
  }
  return uriarr;
}

export async function gets3fileheadobject(id, Bucket) {
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
    }),
  });

  const Params = {
    Bucket: Bucket,
    Key: id,
  };

  try {
    const command = new HeadObjectCommand(Params);
    const response = await s3.send(command);
    console.log("asdaasdasdasdasdasd", response);
    return response;

    console.log("Success");
  } catch (err) {
    console.log("Error", err);
  }
}
