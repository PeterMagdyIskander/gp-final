import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import Toast from "../Toasts/Toasts";
import { searchforsimpasserby } from "../../AWS/rekognitionlogic";
import { connect } from "react-redux";
import {
  uploadarrtos3passerby,
  gets3filepasserby,
  getreports,
} from "../../AWS/s3logic";
import {
  additemdbpasserby,
  getfromdynamodbpasserby,
} from "../../AWS/dynamodblogic";
import FoundForm from "../Forms/FoundForm";
import MatchedCard from "../Cards/MatchedCard";
import UpdateRekoFetch from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FoundOptionsCard from "../Cards/FoundOptionsCard";
import FoundItemForm from "../Forms/FoundItemForm";
import MatchedDetailsMenu from "../Cards/MatchedDetailsMenu";
import UpdateFetch from "../Loading/UpdateFetch";

import ItemsCard from "../Cards/ItemsCard";
import ErrorCard from "../Cards/ErrorCard";
const theme = createTheme();
const Found = (props) => {
  const [matches, setMatches] = useState([]);
  const [files, setFile] = useState([]);
  const [sendReq, setSendReq] = useState(false);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);
  const [selecting, setSelecting] = useState("");

  const handleSelect = (selecting) => {
    setSelecting(selecting);
  };
  console.log("items form data", data);
  return (
    <>
      {selecting === "" && (
        <div className="found-options-container">
          <FoundOptionsCard type="child" select={handleSelect} report={false} />
          <FoundOptionsCard type="items" select={handleSelect} report={false} />
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
        <FoundItemForm setData={setData} onSubmit={setSendReq} />
      )}
      <div>
        {matches.length === 0 && done && (
          <ErrorCard message="No Matches Found" />
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
                  getreports: {
                    reqFunction: getreports,
                    params: ["lostchildrenbucket"],
                  },
                }}
              />
            ) : (
              <UpdateFetch
                setMatches={setMatches}
                setDone={setDone}
                reqFunctions={{
                  uploadToS3: {
                    //add function here
                    reqFunction: additemdbpasserby,
                    params: [
                      data.type,
                      data.id,
                      data.reporterPhone.toString(),
                      data.address,
                      "32",
                      "21",
                    ],
                  },
                  getreports: {
                    //add function here
                    reqFunction: getfromdynamodbpasserby,
                    params: ["itemslost", data.type, data.id],
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
export default connect(mapStateToProps)(Found);

/**
  
 */
