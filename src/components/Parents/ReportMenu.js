import { useState } from "react";
import { connect } from "react-redux";
// import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
// import { S3Client} from "@aws-sdk/client-s3";

import { gets3file, uploadtos3 } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
import { ToastContainer, toast } from "react-toastify";
import MatchedCard from "../Cards/MatchedCard";
const ReportMenu = (props) => {
  // const region = "us-east-1";
  // const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
  const albumBucketName = "lostpictures";
  const [ids, setIds] = useState(null);
  const [imgs, setImgs] = useState([]);
  var id;
  function loadingToast() {
    id = toast.loading("Please wait...");
  }

  async function onPicUpload(file) {
    toast.promise(
      uploadtos3(
        props.authedUser.jwtToken,
        file,
        "props.authedUser.payload.email",
        "asd.jpg",
        file[0].name, //take the name of first file and inceremenet numebrs after it
        albumBucketName
      ),
      {
        pending: "Uploading your imgs...",
        success: "Image uploaded successfuly 👌",
        error: "Promise rejected 🤯",
      },
      { autoClose: 2000 }
    );
    loadingToast();
    const ids = await searchforsim(
      "lostchildren",
      "lostpictures",
      file[0].name,
      props.authedUser.jwtToken
    );
    const s3g = await gets3file(props.authedUser.jwtToken, ids, "lostpictures");
    toast.update(id, {
      render: "Found him",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    console.log(s3g);
    setImgs(s3g);
  }

  return (
    <div>
      {imgs.length != 0 ? (
        <div className="status">
          {imgs.map((img) => {
            return <MatchedCard img={img} name={"evan"} />;
          })}
        </div>
      ) : (
        <ReportForm
          onSubmit={(file) => {
            onPicUpload(file);
          }}
        />
      )}
      <ToastContainer limit={1} />;
    </div>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ReportMenu);
