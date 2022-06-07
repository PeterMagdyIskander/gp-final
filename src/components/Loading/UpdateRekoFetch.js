import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CircularComponent from "./CircularComponent";
function UpdateRekoFetch(props) {
  /*start of circular comp 1 */
  const [success1, setSuccess1] = useState("false");

  /*end1 */

  /*start of circular comp 2 */
  const [loading2, setLoading2] = useState(false);
  const [success2, setSuccess2] = useState("false");
  /*end2 */

  /*start of circular comp 3 */
  const [loading3, setLoading3] = useState(false);
  const [success3, setSuccess3] = useState("false");
  /*end3 */

  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const setProgressOne = () => {
    setTimeout(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 100
      );
      setTimeout(() => {
        setLoading2(true);
      }, 250);
    }, 200);
  };

  const setProgressTwo = () => {
    setTimeout(() => {
      setProgress2((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 100
      );
      setTimeout(() => {
        setLoading3(true);
      }, 250);
    }, 200);
  };
  const setProgressThree = (s3g) => {
    setSuccess3("true");
    setTimeout(() => {
      props.setMatches(s3g);
      props.setDone(true);
    }, 1500);
  };

  useEffect(async () => {
    let uploadSucces = await props.reqFunctions.uploadToS3.reqFunction(
      ...props.reqFunctions.uploadToS3.params
    );
    if (!uploadSucces) {
      setSuccess1("failure");
      setSuccess2("failure");
      setSuccess3("failure");
      setTimeout(() => {
        props.setMatches([]);
        props.setDone(true);
      }, 1500);
      return;
    }
    setSuccess1("true");
    setProgressOne();

    console.log(uploadSucces);
    const matchesset = new Set();
    for (let i = 0; i < 1; i++) {
      const ids = await props.reqFunctions.searchForSim.reqFunction(
        ...props.reqFunctions.searchForSim.params
      );
      for (let j = 0; j < ids.length; j++) {
        matchesset.add(ids[j]);
      }
    }
    const photoidarr = [];
    matchesset.forEach((v) => photoidarr.push(v));

    console.log(photoidarr);
    if (!photoidarr || photoidarr.length === 0) {
      setLoading2(false);
      setSuccess2("failure");
      setSuccess3("failure");
      setTimeout(() => {
        props.setMatches([]);
        props.setDone(true);
      }, 1500);
      return;
    }

    setSuccess2("true");
    setProgressTwo();

    const s3g = await props.reqFunctions.getreports.reqFunction(
      photoidarr,
      ...props.reqFunctions.getreports.params
    );
    console.log("s3g", s3g);

    if (s3g.lenght === 0) {
      setSuccess3("failure");
      setLoading3(false);
      setTimeout(() => {
        props.setMatches([]);
        props.setDone(true);
      }, 1500);
    } else {
      setProgressThree(s3g);
    }
  }, []);

  return (
    <Box
      sx={{
        padding: "15px",
        alignItems: "center",
        boxShadow: 10,
        borderRadius: "30px",
        width: "70%",
        margin: "auto",
        mt: "64px",
      }}
    >
      <Typography sx={{ mb: "25px", ml: "30px" }} variant="h5">
        Processing...
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CircularComponent
          loading={true}
          success={success1}
          number={1}
          message={{
            success: "Uploaded",
            fail: "Failed",
            pending: "Uploading",
          }}
        />
        <LinearProgress
          color="success"
          variant="determinate"
          sx={{ width: "30%" }}
          value={progress}
        />
        <CircularComponent
          loading={loading2}
          success={success2}
          number={2}
          message={{
            success: "Analyzed",
            fail: "No Matches",
            pending: "Analyzing",
          }}
        />
        <LinearProgress
          color="success"
          variant="determinate"
          sx={{ width: "30%" }}
          value={progress2}
        />
        <CircularComponent
          loading={loading3}
          success={success3}
          number={3}
          message={{
            success: "Found",
            fail: "No Matches",
            pending: "Fetching Matches",
          }}
        />
      </Box>
    </Box>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(UpdateRekoFetch);
