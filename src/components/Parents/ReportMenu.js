import { useState } from "react";
import { connect } from "react-redux";
import { gets3file, uploadarrtos3, getreportsparent } from "../../AWS/s3logic";
import { searchforsim } from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
import { FaCar, FaWallet } from "react-icons/fa";
import MatchedCard from "../Cards/MatchedCard";
import UpdateRekoFetch from "../Loading/UpdateRekoFetch";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReportItemForm from "../Forms/ReportItemForm";
import MatchedDetailsMenu from "../Cards/MatchedDetailsMenu";
import UpdateFetch from "../Loading/UpdateFetch";
import { additemdb, getfromdynamodb } from "../../AWS/dynamodblogic";
import { FiUser } from "react-icons/fi";
import { MdOutlineDevicesOther } from "react-icons/md";
import ItemsCard from "../Cards/ItemsCard";
import IconTextCard from "../Cards/IconTextCard";

import { FiXCircle } from "react-icons/fi";

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
  console.log("items form data", data);
  console.log("matches", matches);
  return (
    <>
      {selecting === "" && (
        <div className="found-options-container">
          <IconTextCard
            component={<FiUser size={"7vw"} />}
            message="Report a Child"
            function={() => handleSelect("child")}
          />
          <IconTextCard
            component={<MdOutlineDevicesOther size={"7vw"} />}
            message="Report an Item"
            function={() => handleSelect("items")}
          />
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
          <IconTextCard
            component={<FiXCircle size={"7vw"} color="red" />}
            message="No Matches Found"
            function={null}
          />
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
                  <IconTextCard
                    message={item.id}
                    component={
                      item.type === "car" ? (
                        <FaCar size="7vw" />
                      ) : props.type === "wallet" ? (
                        <FaWallet size="7vw" />
                      ) : (
                        <MdOutlineDevicesOther size="7vw" />
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
                    reqFunction: additemdb, //add function here
                    params: [
                      data.type,
                      data.id,
                      props.authedUser.phoneNumber,
                      props.authedUser.email,
                      props.authedUser.jwtToken,
                    ],
                  },
                  getreports: {
                    reqFunction: getfromdynamodb, //add function here
                    params: [
                      "itemsfound",
                      data.type,
                      data.id,
                      props.authedUser.jwtToken,
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
