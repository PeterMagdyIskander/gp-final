import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../Toasts/Toasts";
import { searchforsim } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";

import {  singuploadtos3, gets3file } from "../../AWS/s3logic";
import FoundForm from "../Forms/FoundForm";
import MatchedCard from "../Cards/MatchedCard";
import CircularIntegration from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
const Found = (props) => {
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  const [ids, setIds] = useState(null);
  // async function rekognitionUpload(file) {
  //   console.log("namef", file[0].name);
  //   var uploaded = await singuploadtos3(
  //     props.authedUser.jwtToken,
  //     file,
  //     "props.authedUser.payload.email",
  //     "asd",
  //     file[0].name,
  //     "lostpictures"
  //   );
  //   setUploadSuccess(uploaded);
  //   const ids = await searchforsim(
  //     "lostchildren",
  //     "lostpictures",
  //     file[0].name,
  //     props.authedUser.jwtToken
  //   );
  //   console.log("nneeeeeeeeeeeeeee", ids);
  //   console.log("uploaded", uploaded);
  //   const x = await gets3file(props.authedUser.jwtToken, ids, "lostpictures");
  //   console.log(x);
  //   setImgs(x);
  // }

  return (
    <div>
    {!sendReq && <FoundForm setFiles={setFile} onSubmit={setSendReq} />}
    {imgs.length !== 0&&<div className="status">
              {imgs.map((img) => {
                return <MatchedCard img={img} name={"evan"} />;
              })}
            </div>}

      {(sendReq&&!done) && (
        <ThemeProvider theme={theme}>
        <Container component="main">
          <CssBaseline />
          <CircularIntegration
            setIds={setIds}
            setImgs={setImgs}
            file={files}
            uploadBucketName="lostpictures"
            searchCollection="lostchildren"
            targetfacebucket="lostpictures"
            getFromBucket="lostpictures"
            setDone={setDone}
            reqFunctions={{
              reqFunctionOne: singuploadtos3,
              reqFunctionTwo: searchforsim,      
              reqFunctionThree: gets3file,
            }}
          />
        </Container>
        </ThemeProvider>
      )}
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
