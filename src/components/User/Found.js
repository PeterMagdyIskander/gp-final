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
import FoundOptionsCard from "../Cards/FoundOptionsCard";
import FoundItemForm from "../Forms/FoundItemForm";

const theme = createTheme();
const Found = (props) => {
  const [imgs, setImgs] = useState([]);
  const [files, setFile] = useState([]);
  const [sendReq, setSendReq] = useState(false);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const [selecting, setSelecting] = useState("");
  const handleSelect = (selecting) => {
    setSelecting(selecting);
  };
  return (
    <div>
      {selecting === "" && (
        <div className="found-options-container">
          <FoundOptionsCard type="child" select={handleSelect} />
          <FoundOptionsCard type="items" select={handleSelect} />
        </div>
      )}
      {!sendReq && selecting === "child" && (
        <FoundForm
          setFiles={setFile}
          setData={setData}
          setFileName={setFileName}
          onSubmit={setSendReq}
        />
      )}
      {!sendReq && selecting === "items" && (
        <FoundItemForm
          setData={setData}
          setFileName={setFileName}
          onSubmit={setSendReq}
        />
      )}
      <div className="status">
        {imgs.length === 0 && done ? (
          <MatchedCard img={"/assets/x-circle.png"} name="Not Found" />
        ) : (
          imgs.map((img, index) => {
            return <MatchedCard img={img} key={index} name={"David"} />;
          })
        )}
      </div>
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
                    data.coordinates.lat,
                    data.coordinates.lng,
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

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(Found);

/**
  
 */
