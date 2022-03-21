import { useState } from "react";
import { connect } from "react-redux";
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
// import { S3Client} from "@aws-sdk/client-s3";

import { gets3file, uploadtos3 } from "../../AWS/s3logic";
import {searchforsim} from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
const ReportMenu = (props) => {
  // const region = "us-east-1";
  // const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
  const albumBucketName = "lostpictures";
  const [imgs, setImgs] = useState([]);
  // const s3 = new S3Client({
  //   region: region,
  //   credentials: fromCognitoIdentityPool({
  //     client: new CognitoIdentityClient({ region: region }),
  //     identityPoolId: identitypoolid,
  //     logins: {
  //       "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5":
  //         props.authedUser.jwtToken,
  //     },
  //   }),
  // });

  async function onPicUpload(file) {
    const s3c=await uploadtos3(
      props.authedUser.jwtToken,
      file,
      "props.authedUser.payload.email",
      "asd.jpg",
      file[0].name, //take the name of first file and inceremenet numebrs after it
      albumBucketName
    );
    const rek=await searchforsim("lostchildren","lostpictures","0asd.jpg",props.authedUser.jwtToken);
    const s3g=await gets3file(props.authedUser.jwtToken,rek,"lostpictures");
    console.log(s3g);//turn to 


  }

  return (
    <div>
      <ReportForm
        onSubmit={(file) => {
          onPicUpload(file);
        }}
      />
      
       
      
    </div>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ReportMenu);
