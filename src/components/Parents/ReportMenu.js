import { useState } from "react";
import { connect } from "react-redux";
import { gets3file, uploadarrtos3,getreportsparent } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
//import { ToastContainer, toast } from "react-toastify";
import MatchedCard from "../Cards/MatchedCard";
import CircularIntegration from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FoundOptionsCard from "../Cards/FoundOptionsCard";
import ReportItemForm from "../Forms/ReportItemForm";
const theme = createTheme();
const ReportMenu = (props) => {
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState({});
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  const [selecting, setSelecting] = useState("");
  const handleSelect = (selecting) => {
    setSelecting(selecting);
  };
  // var id;
  // function loadingToast() {
  //   id = toast.loading("Please wait...");
  // }

  return (
    <>
      {selecting === "" && (
        <div className="found-options-container">
          <FoundOptionsCard type="child" select={handleSelect} report={true} />
          <FoundOptionsCard type="items" select={handleSelect} report={true} />
        </div>
      )}

      {!sendReq && selecting === "child" && (
        <ReportForm
          setFiles={setFile}
          setData={setData}
          onSubmit={setSendReq}
          setDone={setDone}
        />
      )}
      {!sendReq && selecting === "items" && (
        <ReportItemForm
          setData={setData}
          onSubmit={setSendReq}
        />
      )}

      <div className="status">
        {imgs.length === 0 && done ? (
          <MatchedCard img={"/assets/x-circle.png"} name="Not Found" />
        ) : (
          imgs.map((img, index) => {
            return <MatchedCard img={img.photosuri[0]} key={index} />;
          })
        )}
      </div>
      {sendReq && !done ? (
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
                    props.authedUser.cognitoUserId + data.childName + "0",
                    props.authedUser.jwtToken,
                  ],
                },
                getreports: {
                  reqFunction: getreportsparent,
                  params: [props.authedUser.jwtToken, "passerbybucket"],
                },
              }}
            />
          </Container>
        </ThemeProvider>
      ) : (
        <></>
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

/*

      */
