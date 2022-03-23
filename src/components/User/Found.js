import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { Circles } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../Toasts/Toasts";
import { searchforsim } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";

import { /*uploadtos3,*/ singuploadtos3, gets3file } from "../../AWS/s3logic";
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
      {imgs.length != 0 ? (
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

// let FoundChildData={
//     img:'imgPath', //could be bitmap whatever
//     map:'googleMapsApi',
//     address:'address [OPTIONAL]',
//     childName:'name of child [OPTIONAL]',
//     reporterPhone:'reporter phone [OPTIONAL]',
//   }
/*
  when the user opens, the page shows the form
  3 types of submit
  1- wrong input & submit -> error toast
  2- success submit -> remove form -> success toast & 
  show loading (waiting for rekognition) ->
  3- 

*/
{
  /* {!uploadSuccess ? (
          <form className="report-data-entry" onSubmit={formik.handleSubmit}>
            <label htmlFor="img">Lost Child Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFileUpload(e)}
            />

            <label htmlFor="address">Where did you find the child</label>
            <input
              type="text"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <label htmlFor="name">Child Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            <label htmlFor="reporterPhone">Please Enter your phone</label>
            <input
              type="number"
              name="reporterPhone"
              onChange={formik.handleChange}
              value={formik.values.reporterPhone}
            />

            <button type="submit">submit</button>
          </form>
        ) : (
          <div>
            {!match ? (
              <Circles color="#00BFFF" height={80} width={80} />
            ) : match ? (
              "success"
            ) : (
              "failed"
            )}
          </div>
        )} */
}
