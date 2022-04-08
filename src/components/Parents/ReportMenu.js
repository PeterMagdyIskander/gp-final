import { useState } from "react";
import { connect } from "react-redux";
import { gets3file, uploadtos3 } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
import { ToastContainer, toast } from "react-toastify";
import MatchedCard from "../Cards/MatchedCard";
import CircularIntegration from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
const ReportMenu = (props) => {
  
  const albumBucketName = "lostpictures";
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  const [ids, setIds] = useState(null);
  var id;
  function loadingToast() {
    id = toast.loading("Please wait...");
  }
  // async function onPicUpload(file) {
  //   toast.promise(
  //     uploadtos3(
  //       props.authedUser.jwtToken,
  //       file,
  //       "props.authedUser.payload.email",
  //       "asd.jpg",
  //       file[0].name, //take the name of first file and inceremenet numebrs after it
  //       albumBucketName
  //     ),
  //     {
  //       pending: "Uploading your imgs...",
  //       success: "Image uploaded successfuly 👌",
  //       error: "Promise rejected 🤯",
  //     },
  //     { autoClose: 2000 }
  //   );
  //   loadingToast();
  //   const ids = await searchforsim(
  //     "lostchildren",
  //     "lostpictures",
  //     file[0].name,
  //     props.authedUser.jwtToken
  //   );
  //   const s3g = await gets3file(props.authedUser.jwtToken, ids, "lostpictures");
  //   toast.update(id, {
  //     render: "Found him",
  //     type: "success",
  //     isLoading: false,
  //     autoClose: 2000,
  //   });
  //   console.log(s3g);
  //   setImgs(s3g);
  // }

  return (
    <>
      {!sendReq && <ReportForm setFiles={setFile} onSubmit={setSendReq} />}
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
              reqFunctionOne: uploadtos3,
              reqFunctionTwo: searchforsim,      
              reqFunctionThree: gets3file,
            }}
          />
        </Container>
        </ThemeProvider>
      )}
    </>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ReportMenu);
