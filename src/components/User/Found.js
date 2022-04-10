import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import Toast from "../Toasts/Toasts";
import { searchforsim } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { singuploadtos3, gets3file } from "../../AWS/s3logic";
import FoundForm from "../Forms/FoundForm";
import MatchedCard from "../Cards/MatchedCard";
import CircularIntegration from "../Loading/UpdateRekoFetch";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
const Found = (props) => {
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
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
      {imgs.length === 0 && done ? (
        <Box
          sx={{
            padding: "15px",
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "25px",
            width: "70%",
            margin: "auto",
            mt: "150px",
          }}
        >
          <Typography sx={{ ml: "30px" }} variant="h5">
            No Matches Found
          </Typography>
        </Box>
      ) : (
        <div className="status">
          {imgs.map((img) => {
            return <MatchedCard img={img} name={"evan"} />;
          })}
        </div>
      )}

      {sendReq && !done && (
        <ThemeProvider theme={theme}>
          <Container component="main">
            <CssBaseline />
            <CircularIntegration
              setImgs={setImgs}
              file={files}
              setDone={setDone}
              reqFunctions={{
                uploadToS3: {
                  reqFunction: singuploadtos3,
                  params: [
                    props.authedUser.jwtToken,
                    files,
                    props.authedUser.email,
                    "peter",
                    files[0].name,
                    "passerbybucket",
                  ],
                },
                searchForSim: {
                  reqFunction: searchforsim,
                  params: [
                    "lostchildren",
                    "passerbybucket",
                    files[0].name,
                    props.authedUser.jwtToken,
                  ],
                },
                getS3files: {
                  reqFunction: gets3file,
                  params: [
                    props.authedUser.jwtToken,
                    "lostchildrenbucket",
                  ],
                },
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
