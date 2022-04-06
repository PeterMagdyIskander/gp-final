import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../Toasts/Toasts";
import { searchforsim } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";

import {  singuploadtos3, gets3file } from "../../AWS/s3logic";
import FoundForm from "../Forms/FoundForm";
import MatchedCard from "../Cards/MatchedCard";
const Found = (props) => {
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [imgs, setImgs] = useState([]);
  async function rekognitionUpload(file) {
    console.log("namef", file[0].name);
    var uploaded = await singuploadtos3(
      props.authedUser.jwtToken,
      file,
      "props.authedUser.payload.email",
      "asd",
      file[0].name,
      "lostpictures"
    );
    setUploadSuccess(uploaded);
    const ids = await searchforsim(
      "lostchildren",
      "lostpictures",
      file[0].name,
      props.authedUser.jwtToken
    );
    console.log("nneeeeeeeeeeeeeee", ids);
    console.log("uploaded", uploaded);
    const x = await gets3file(props.authedUser.jwtToken, ids, "lostpictures");
    console.log(x);
    setImgs(x);
  }

  return (
    <div>
      {imgs.length !== 0 ? (
        <div className="status">
          {imgs.map((img) => {
            return <MatchedCard img={img} name={"evan"} />;
          })}
        </div>
      ) : (
        <FoundForm
          onSubmit={(file) => {
            rekognitionUpload(file);
          }}
        />
      )}
      <Toast success={uploadSuccess} />
    </div>
  );
};
/* <Toast success={uploadSuccess} position="top-center" /> */

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(Found);
