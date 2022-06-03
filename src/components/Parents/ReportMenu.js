import { useState } from "react";
import { connect } from "react-redux";
import { gets3file, uploadarrtos3, getreportsparent } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
//import { ToastContainer, toast } from "react-toastify";
import MatchedCard from "../Cards/MatchedCard";
import UpdateRekoFetch from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FoundOptionsCard from "../Cards/FoundOptionsCard";
import ReportItemForm from "../Forms/ReportItemForm";
import MatchedDetailsMenu from "../Cards/MatchedDetailsMenu";
import UpdateFetch from "../Loading/UpdateFetch";

import ItemsCard from "../Cards/ItemsCard";
const theme = createTheme();
const ReportMenu = (props) => {
  const [matches, setMatches] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState({});
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  const [selecting, setSelecting] = useState("");
  const handleSelect = (selecting) => {
    setSelecting(selecting);
  };

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
        <ReportItemForm setData={setData} onSubmit={setSendReq} />
      )}

      <div>
        {matches.length === 0 && done && (
          <MatchedCard img={"/assets/x-circle.png"} name="Not Found" />
        )}
        {matches.length !== 0 &&
          done &&
          (selecting === "child" ? (
            <MatchedDetailsMenu matches={matches} />
          ) : (
            <Container
              sx={{
                mt: "64px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
              component="main"
            >
              {matches.map((item) => {
                return (
                  <ItemsCard id={item.id} type={item.type} key={item.id} />
                );
              })}
            </Container>
          ))}
      </div>
      {sendReq && !done && (
        <ThemeProvider theme={theme}>
          <Container component="main">
            {selecting === "child" ? (
              <UpdateRekoFetch
                setMatches={setMatches}
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
            ) : (
              <UpdateFetch
                setMatches={setMatches}
                setDone={setDone}
                reqFunctions={{
                  uploadToS3: {
                    reqFunction: searchforsim, //add function here
                    params: [
                      //add params here
                    ],
                  },
                  getreports: {
                    reqFunction: searchforsim, //add function here
                    params: [
                      //add params here
                    ],
                  },
                }}
              />
            )}
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

/*

      */
