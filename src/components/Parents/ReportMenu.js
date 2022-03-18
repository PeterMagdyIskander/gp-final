import { connect } from "react-redux";
import { useState } from "react";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useFormik } from "formik";
import Toast from "../Toasts/Toasts";
import { uploadtos3 } from "../../AWS/s3logic";
import { useLocation } from "react-router";
const ReportMenu = (props) => {
  const location = useLocation();
  const lc = location ? location.state : null;
  console.log(lc);
  const [file, setFile] = useState([]);
  const [valid, setValid] = useState(false);
  const [res, setRes] = useState("");
  const region = "us-east-1";
  const identitypoolid = "us-east-1:2b404e3d-6bdf-404a-8f21-701f364fb12f";
  const albumBucketName = "lostpictures";

  const onFileUpload = (e) => {
    setFile(e.target.files);
    setValid(true);
    return;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
    },
    onSubmit: (values) => {
      console.log("formdata", values);
      onPicUpload();
    },
  });

  const s3 = new S3Client({
    region: region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: region }),
      identityPoolId: identitypoolid,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_nASW5MZW5":
          props.authedUser.jwtToken,
      },
    }),
  });

  async function onPicUpload() {
    //console.log(file)
    uploadtos3(
      props.authedUser.jwtToken,
      file,
      "props.authedUser.payload.email",
      "asd",
      file[0].name,
      albumBucketName
    );
  }

  return (
    <div className="container-centered">
      <form className="report-data-entry" onSubmit={formik.handleSubmit}>
        <label htmlFor="imgs">Child Images</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileUpload(e)}
          multiple
        />
        {file ? file.length : ""}
        <label htmlFor="name">Child Name</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="age">Child Age</label>
        <input
          type="number"
          name="age"
          onChange={formik.handleChange}
          value={formik.values.age}
        />
        <button className="report-missing-child" type="submit">
          {" "}
          REPORT CHILD{" "}
        </button>
      </form>
      {/* <Toast success={false} position="top-center" /> */}
    </div>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ReportMenu);
