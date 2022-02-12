import { connect } from "react-redux";
import { useState } from "react";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ReportMenu = (props) => {
  const [file, setFile] = useState(null);
  const [valid,setValid] = useState(false)
  const [res, setRes] = useState("");
  const email = "abadeer@hotmail.com";
  const password = "abadir_2000";
  const region = "us-east-1";
  const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
  const albumBucketName = "lostpictures";

  const onFileUpload = (e) => {
    setFile(e.target.files);
    if(e.target.files.length!=1){
      setFile(null);
      return
    }
    setValid(true);
    return
  };


  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5": props.authedUser.jwtToken,
      },
    }),
  });

  async function onPicUpload() {
    console.log(props.authedUser.jwtToken);
    const uploadParams = {
      Bucket: albumBucketName,
      Key: "peterUploaded",
      Body: file,
    };
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      setRes(JSON.stringify(data));
      console.log(data);
    } catch (err) {
      setRes(JSON.stringify(err));
      return console.log("There was an error uploading your photo: ", err);
    }
  }

  return <div className="container-centered">
    <div>
      <input type="file" accept="image/*" onChange={(e) => onFileUpload(e)} multiple />
      {file ? file.length : ''}



      <button onClick={() => onPicUpload()}> REPORT CHILD </button>
    </div>
  </div>;
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ReportMenu);
