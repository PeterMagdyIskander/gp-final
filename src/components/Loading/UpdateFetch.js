import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import CircularComponent from "./CircularComponent";

function UpdateFetch(props) {
  /*start of circular comp 1 */
  const [success1, setSuccess1] = useState("false");

  /*end1 */

  /*start of circular comp 2 */
  const [loading2, setLoading2] = useState(false);
  const [success2, setSuccess2] = useState("false");
  /*end2 */

  const [progress, setProgress] = useState(0);

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
  const setProgressTwo = (s3g) => {
    setSuccess2(true);
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
      return;
    }
    setSuccess1("true");
    setProgressOne();

    const s3g = await props.reqFunctions.getreports.reqFunction(
      ...props.reqFunctions.getreports.params
    );
    //if failure
    if (s3g.length === 0) {
      setSuccess2("failure");
      setLoading2(false);
      setTimeout(() => {
        props.setMatches([]);
        props.setDone(true);
      }, 1500);
    } else {
      setProgressTwo(s3g);
    }
  }, []);

  return (
    <Box
      sx={{
        padding: "15px",
        alignItems: "center",
        boxShadow: 10,
        borderRadius: "30px",
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
          justifyContent:"space-around"
        }}
      >
        <CircularComponent
          loading={true}
          success={success1}
          number={1}
          message={{
            success: "Success",
            fail: "Failed",
            pending: "Sending",
          }}
        />
        <LinearProgress
          color="success"
          variant="determinate"
          sx={{ width: "65%" }}
          value={progress}
        />
        <CircularComponent
          loading={loading2}
          success={success2}
          number={2}
          message={{
            success: "Matched",
            fail: "No Matches",
            pending: "Analyzing",
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
export default connect(mapStateToProps)(UpdateFetch);
