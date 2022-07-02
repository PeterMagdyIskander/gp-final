import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import {sendmail} from "../AWS/maillogic"
import {getfromdynamodbphonenumber} from "../AWS/dynamodblogic"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const identitypoolid = process.env.REACT_APP_IDENTITY_POOL_ID;
const region = process.env.REACT_APP_REGION;
const COGNITO_IDP = process.env.REACT_APP_COGNITO_IDP;

export async function uploadarrtos3editreport(
  signintoken,
  file,
  owneremailaddress,
  uid,
  lostchildid,
  address,
  phone,
  Bucket
) {
  const picname = convertstringtoascii(
    uid + lostchildid + "added" + Date.now()
  );
  

  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  var success = true;
  for (let i = 0; i < Object.keys(file).length; i++) {
    
    const uploadParams = {
      Bucket: Bucket,
      Key: picname + i,
      Body: file[i],
      Metadata: {
        owner: owneremailaddress,
        lostchildid: lostchildid,
        imgid: picname + i,
        address: address,
        phonenumber: phone,
      },
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      
    } catch (err) {
      
      success = false;
    }
  }
  return success;
}

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
  
  const picname=convertstringtoascii(uid+lostchildid);

  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  var success = true;
  for (let i = 0; i < Object.keys(file).length; i++) {
    

    const uploadParams = {
      Bucket: Bucket,
      Key: picname + i,
      Body: file[i],
      Metadata: {
        owner: owneremailaddress,
        lostchildid: lostchildid,
        imgid: picname+ i,
        address: address,
        phonenumber: phone,
      },
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      
    } catch (err) {
      
      success = false;
    }
  }
  return success;
}


export async function gets3file(id, signintoken, Bucket) {
 
  const s3 = new S3({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        [COGNITO_IDP]: signintoken,
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

      
    } catch (err) {
      
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
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  const Params = {
    Bucket: Bucket,
    Key: oid,
  };
  try {
    const data = await s3.send(new DeleteObjectCommand(Params));
    
  } catch (err) {
   
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
        [COGNITO_IDP]: signintoken,
      },
    }),
  });
  var success = true;
  for (let i = 0; i < oid.length; i++) {
    const Params = {
      Bucket: Bucket,
      Key: linktoid(oid[i]["img"]),
    };
    try {
      const data = await s3.send(new DeleteObjectCommand(Params));
      
    } catch (err) {
     
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
  var success=true;
  const picname=convertstringtoascii(filename);
  
  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
    }),
  });
  for (let i = 0; i < file.length; i++) 
  {
    const uploadParams = {
      Bucket: Bucket,
      Key: picname+i,
      Body: file[i],
      Metadata: {
        name: name,
        lng: lng.toString(),
        lat: lat.toString(),
        phoneNumber: phoneNumber.toString(),
        writenaddress: address,
      },
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
     
       
    } catch (err) {
      success=false
     
      
    }

  }
  return success;

  
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

      
    } catch (err) {
     
    }
  }
  return uriarr;
}
export async function getreports(id, Bucket) {
  
  var y = await gets3filepasserby(id, "lostchildrenbucket");

  const metadataarr = [];
  const matchesmap = new Map();
  for (let i = 0; i < id.length; i++) {
    const x = await gets3fileheadobject(id[i], "lostchildrenbucket");
    
    const metdata = JSON.stringify({
      owner: x["Metadata"]["owner"],
      address: x["Metadata"]["address"],
      lostchildid: x["Metadata"]["lostchildid"],
      phonenumber: x["Metadata"]["phonenumber"],
    });
   
    if (matchesmap.has(metdata)) {
      const uriarr = matchesmap.get(metdata);
      uriarr.push(y[i]);
      matchesmap.set(metdata, uriarr);
    } else {
      matchesmap.set(metdata, [y[i]]);
    }

    metadataarr.push(x["Metadata"]);
  }
  const outarr = [];
  for (const i of matchesmap.entries()) {
    const out = {
      photosuri: i[1],
      metadata: JSON.parse(i[0]),
    };
    out["metadata"]["phonenumber"]=await getfromdynamodbphonenumber(out["metadata"]["owner"])
    outarr.push(out);
    sendmail(out['metadata']['owner'],"Child",out['metadata']["lostchildid"]);
  }
  
  return outarr;
}
export async function getreportsparent(id, token, Bucket) {
  
  var y = await gets3file(id, token, "passerbybucket");

  const metadataarr = [];
  const matchesmap = new Map();
  for (let i = 0; i < id.length; i++) {
    const x = await gets3fileheadobject(id[i], "passerbybucket");
   
    const metdata = JSON.stringify({
      lat: x["Metadata"]["lat"],
      name: x["Metadata"]["name"],
      lng: x["Metadata"]["lng"],
      writenaddress: x["Metadata"]["writenaddress"],
      phonenumber: x["Metadata"]["phonenumber"],
    });
    
    if (matchesmap.has(metdata)) {
      const uriarr = matchesmap.get(metdata);
      uriarr.push(y[i]);
      matchesmap.set(metdata, uriarr);
    } else {
      matchesmap.set(metdata, [y[i]]);
    }

    metadataarr.push(x["Metadata"]);
  }
  const outarr = [];
  for (const i of matchesmap.entries()) {
    const out = {
      photosuri: i[1],
      metadata: JSON.parse(i[0]),
    };
    
    outarr.push(out);
  }
 
  return outarr;
}

export async function gets3fileheadobject(id, Bucket) {
  const s3 = new S3({
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
   
    return response;

    
  } catch (err) {
   
    return false;
  }
}
export function linktoid(link) {
  var output = link.substring(54, link.indexOf("?"));
  return output;
}
export function convertstringtoascii(s) {
  var output = "";
  for (let index = 0; index < s.length; index++) {
    output = output + s.charCodeAt(index);
  }
  return output;
}
