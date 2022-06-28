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
import { Button, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FoundItemForm from "../Forms/FoundItemForm";
import MatchedDetailsMenu from "../Cards/MatchedDetailsMenu";
import UpdateFetch from "../Loading/UpdateFetch";
import IconTextCard from "../Cards/IconTextCard";

import { FaCar, FaWallet } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import ItemsCard from "../Cards/ItemsCard";
import { FiUser } from "react-icons/fi";
import { MdOutlineDevicesOther } from "react-icons/md";
import MatchedItemsCard from "../Cards/MatchedItemsCard";
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
  const reset = () => {
    setMatches([]);
    setFile([]);
    setData({});
    setSendReq(false);
    setDone(false);
    setSelecting("");
  };
  console.log("items form item form", data);
  return (
    <>
      {sendReq && done && (
        <div className="found-options-container">
          <Button
            sx={{
              textTransform: "none",
              fontWeight: "100",
              fontSize: "1.2rem",
              fontFamily: "Quicksand",
              borderRadius: "15px",
              backgroundColor: "red",
              "&:hover": {
                color: "red",
                fontWeight: "600",
                backgroundColor: "white",
                padding: "5px 15px",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              },
            }}
            variant="contained"
            onClick={reset}
          >
            Make Another Report
          </Button>
        </div>
      )}
      {selecting === "" && (
        <div className="found-options-container">
          <IconTextCard
            component={<FiUser className="icon" />}
            message="Found a Child"
            subMessage="Suspecting a missing Child? Your report will definitely help."
            onClickFunction={() => handleSelect("child")}
          />
          <IconTextCard
            component={<MdOutlineDevicesOther className="icon" />}
            message="Found an Item"
            subMessage="Suspecting a missing Item? Your report will definitely help."
            onClickFunction={() => handleSelect("items")}
          />
        </div>
      )}
      {!sendReq && selecting === "child" && (
        <FoundForm
          setFiles={setFile}
          setData={setData}
          setFileName={setFileName}
          setSendReq={setSendReq}
        />
      )}
      {!sendReq && selecting === "items" && (
        <FoundItemForm setData={setData} onSubmit={setSendReq} />
      )}

      <div>
        {matches.length === 0 && done && (
          <div className="found-options-container">
            <IconTextCard
              component={<FiXCircle className="icon" color="red" />}
              message="No Matches Found"
              onClickFunction={null}
            />
          </div>
        )}

        {/* IF THERE ARE MATCHES */}
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
                  <MatchedItemsCard
                    item={item}
                    found={true}
                    component={
                      item.type === "car" ? (
                        <FaCar className="icon" />
                      ) : props.type === "wallet" ? (
                        <FaWallet className="icon" />
                      ) : (
                        <MdOutlineDevicesOther className="icon" />
                      )
                    }
                    key={item.id}
                    function={null}
                  />
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
                      files,
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
                      data.lat,
                      data.lng,
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
