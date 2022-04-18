import { useState } from "react";
import { connect } from "react-redux";
import { gets3file, uploadarrtos3 } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
//import { ToastContainer, toast } from "react-toastify";
import MatchedCard from "../Cards/MatchedCard";
import CircularIntegration from "../Loading/UpdateRekoFetch";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
const theme = createTheme();
const ReportMenu = (props) => {
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState({});
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  // var id;
  // function loadingToast() {
  //   id = toast.loading("Please wait...");
  // }

  return (
    <>
      {!sendReq && (
        <ReportForm
          setFiles={setFile}
          setData={setData}
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
            return <MatchedCard img={img} key={img} name={"Peter"} />;
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
                  reqFunction: uploadarrtos3,
                  params: [
                    props.authedUser.jwtToken,
                    files,
                    props.authedUser.email,
                    props.authedUser.cognitoUserId,
                    data.childName,
                    data.location,
                    props.authedUser.phoneNumber,
                    "lostchildrenbucket",
                  ],
                },
                searchForSim: {
                  reqFunction: searchforsim,
                  params: [
                    "waitingslistfaces",
                    "lostchildrenbucket",
                    props.authedUser.cognitoUserId+data.childName+'0',
                    props.authedUser.jwtToken,
                  ],
                },
                getS3files: {
                  reqFunction: gets3file,
                  params: [props.authedUser.jwtToken, "passerbybucket"],
                },
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
