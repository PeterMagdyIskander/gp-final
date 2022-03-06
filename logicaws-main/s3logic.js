import { S3Client, AbortMultipartUploadCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";


const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
const region = "us-east-1";

export async function uploadtos3(signintoken, file, callbackfn, owneremailaddress, lostchildid, imgid,Bucket) 
{


    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': signintoken,
            }
        }),

    });

    const uploadParams = {
        Bucket: Bucket,
        Key: imgid,
        Body: file,
        Metadata: {
            owner: owneremailaddress,
            lostchildid: lostchildid,
            imgid: imgid,
        },

        
    }
    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log("Success", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
}
export async function  gets3files(signintoken, files, callbackfn,Bucket) 
{


    const s3 = new S3Client({
        region: region,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: region }),
            identityPoolId: identitypoolid,
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5': signintoken,
            }
        }),

    });

    const uploadParams = {
        Bucket: Bucket,
        Key: files[0],
        

        
    }
    
        try {
            const data = await s3.send(new GetObjectCommand(uploadParams));
            console.log("Success", data);
            return data; // For unit tests.
        } catch (err) {
            console.log("Error", err);
        }
    


    
    
}
