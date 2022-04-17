import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import Toast from "../Toasts/Toasts";
import { searchforsimpasserby } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { uploadarrtos3passerby, gets3filepasserby } from "../../AWS/s3logic";
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
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  
  return (
    <div>
      {!sendReq && (
        <FoundForm
          setFiles={setFile}
          setData={setData}
          setFileName={setFileName}
          onSubmit={setSendReq}
        />
      )}
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
                  reqFunction: uploadarrtos3passerby,
                  params: [
                    files[0],
                    '30',
                    '30',
                    data.address,
                    data.childName,
                    data.reporterPhone,
                    fileName,
                    "passerbybucket",
                  ],
                },
                searchForSim: {
                  reqFunction: searchforsimpasserby,
                  params: ["lostchildren", "passerbybucket", fileName],
                },
                getS3files: {
                  reqFunction: gets3filepasserby,
                  params: ["lostchildrenbucket"],
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
