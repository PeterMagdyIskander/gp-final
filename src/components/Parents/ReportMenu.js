import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { gets3file, uploadarrtos3, getreportsparent } from "../../AWS/s3logic";
import {
  searchforsim,
  searchforsimasciihandeled,
} from "../../AWS/rekognitionlogic";
import ReportForm from "../Forms/ReportForm";
import { FaCar, FaWallet } from "react-icons/fa";
import MatchedCard from "../Cards/MatchedCard";
import UpdateRekoFetch from "../Loading/UpdateRekoFetch";
import { Button, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReportItemForm from "../Forms/ReportItemForm";
import MatchedDetailsMenu from "../Cards/MatchedDetailsMenu";
import UpdateFetch from "../Loading/UpdateFetch";
import {
  additemdb,
  getfromdynamodb,
  quaryfromdynamodb,
  quaryfromdynamodbgetitem,
} from "../../AWS/dynamodblogic";
import { FiUser } from "react-icons/fi";
import { MdOutlineDevicesOther } from "react-icons/md";
import IconTextCard from "../Cards/IconTextCard";
import { FiXCircle } from "react-icons/fi";
import { setItems } from "../../ReduxStore/actions/items";
import { setChildren } from "../../ReduxStore/actions/children";
import { Getmatches } from "../../AWS/getmatches";
import MatchedItemsCard from "../Cards/MatchedItemsCard";
const theme = createTheme();
const ReportMenu = (props) => {
  const [matches, setMatches] = useState([]);
  const [files, setFile] = useState([]);
  const [data, setData] = useState({});
  const [sendReq, setSendReq] = useState(false);
  const [done, setDone] = useState(false);
  const [selecting, setSelecting] = useState("");
  const dispatch = useDispatch();
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
            message="Report a Child"
            onClickFunction={() => handleSelect("child")}
          />
          <IconTextCard
            component={<MdOutlineDevicesOther className="icon" />}
            message="Report an Item"
            onClickFunction={() => handleSelect("items")}
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

      <>
        {matches.length === 0 && done && (
          <div className="found-options-container">
            <IconTextCard
              component={<FiXCircle className="icon" color="red" />}
              message="No Matches Found"
              onClickFunction={null}
            />
          </div>
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
                  <MatchedItemsCard
                    item={item}
                    found={false}
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
      </>
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
                    reqFunction: searchforsimasciihandeled,
                    params: [
                      "waitingslistfaces",
                      "lostchildrenbucket",
                      props.authedUser.cognitoUserId + data.childName,
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
