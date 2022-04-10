import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
function CircularIntegration(props) {
  /*start of circular comp 1 */
  const [loading1, setLoading1] = useState(true);
  const [success1, setSuccess1] = useState(false);

  /*end1 */

  /*start of circular comp 2 */
  const [loading2, setLoading2] = useState(false);
  const [success2, setSuccess2] = useState(false);
  /*end2 */

  /*start of circular comp 3 */
  const [loading3, setLoading3] = useState(false);
  const [success3, setSuccess3] = useState(false);
  /*end3 */
  const buttonSx1 = {
    ...(success1 && {
      bgcolor: green[500],
      color: "white",
    }),
  };
  const buttonSx2 = {
    ...(success2 && {
      bgcolor: green[500],
      color: "white",
    }),
  };
  const buttonSx3 = {
    ...(success3 && {
      bgcolor: green[500],
      color: "white",
    }),
  };
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const setProgressOne = () => {
    setTimeout(() => {
      setSuccess1(true);
      setLoading1(false);
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 100
      );
    }, 200);

    setTimeout(() => {
      setSuccess2(false);
      setLoading2(true);
    }, 450);
  };
  const setProgressTwo = () => {
    setTimeout(() => {
      setSuccess2(true);
      setLoading2(false);
      setProgress2((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 100
      );
    }, 200);
    setTimeout(() => {
      setSuccess3(false);
      setLoading3(true);
    }, 450);
  };
  const setProgressThree = (s3g) => {
    setTimeout(() => {
      setSuccess3(true);
      setLoading3(false);
      props.setDone(true);
      props.setImgs(s3g);
      console.log("imgs", s3g);
    }, 2500);
  };

  useEffect(() => {
    props.reqFunctions.uploadToS3
      .reqFunction(...props.reqFunctions.uploadToS3.params)
      .then(async (res) => {
        setProgressOne();
        const ids = await props.reqFunctions.searchForSim.reqFunction(
          ...props.reqFunctions.searchForSim.params
        );
        setProgressTwo();

        console.log("finished 2");
        if (ids) {
          const s3g = await props.reqFunctions.getS3files.reqFunction(
            props.reqFunctions.getS3files.params[0],
            ids,
            props.reqFunctions.getS3files.params[1]
          );
          setProgressThree(s3g);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <Box
      sx={{
        padding: "15px",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "25px",
        width: "70%",
        margin: "auto",
        mt: "64px",
      }}
    >
      <Typography sx={{ mb: "50px", ml: "30px" }} variant="h5">
        Processing...
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "grid", justifyItems: "center", margin: "10px" }}>
          <Box sx={{ display: "grid", justifyItems: "center", margin: "10px" }}>
            <Box
              sx={{
                position: "relative",
                mb: "10px",
              }}
            >
              <Fab aria-label="save" sx={buttonSx1}>
                {success1 ? <CheckIcon /> : 1}
              </Fab>
              {loading1 && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </Box>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Uploading Pictures
          </Typography>
        </Box>

        <LinearProgress
          color="success"
          variant="determinate"
          sx={{ width: "30%", top: "-29px" }}
          value={progress}
        />

        <Box sx={{ display: "grid", justifyItems: "center", margin: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                mb: "10px",
              }}
            >
              <Fab aria-label="save" sx={buttonSx2}>
                {success2 ? <CheckIcon /> : 2}
              </Fab>
              {loading2 ? (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Analyzing Faces
          </Typography>
        </Box>

        <LinearProgress
          color="success"
          variant="determinate"
          sx={{ width: "30%", top: "-29px" }}
          value={progress2}
        />

        <Box sx={{ display: "grid", justifyItems: "center", margin: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                mb: "10px",
              }}
            >
              <Fab aria-label="save" sx={buttonSx3}>
                {success3 ? <CheckIcon /> : 3}
              </Fab>
              {loading3 ? (
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Fetching Matches
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(CircularIntegration);
// async function onPicUpload(file) {
//   toast.promise(
//     uploadtos3(
//       props.authedUser.jwtToken,
//       file,
//       "props.authedUser.payload.email",
//       "asd.jpg",
//       file[0].name, //take the name of first file and inceremenet numebrs after it
//       albumBucketName
//     ),
//     {
//       pending: "Uploading your imgs...",
//       success: "Image uploaded successfuly 👌",
//       error: "Promise rejected 🤯",
//     },
//     { autoClose: 2000 }
//   );
//   loadingToast();
//   const ids = await searchforsim(
//     "lostchildren",
//     "lostpictures",
//     file[0].name,
//     props.authedUser.jwtToken
//   );
//   const s3g = await gets3file(props.authedUser.jwtToken, ids, "lostpictures");
//   toast.update(id, {
//     render: "Found him",
//     type: "success",
//     isLoading: false,
//     autoClose: 2000,
//   });
//   console.log(s3g);
//   setImgs(s3g);
// }

// parent:
// upload my sons pic upload to bucket: -> lostchildrenbucket
// reko -> searchCollection -> waitingslistfaces
//      -> targetfacebucket ->  lostchildrenbucket
// gets3 ->getFromBucket ->passerbybucket

//passerby:
// upload my sons pic upload to bucket: -> passerbybucket
// reko -> searchCollection -> lostchildren
//      -> targetfacebucket ->  passerbybucket
// gets3 ->getFromBucket ->lostchildrenbucket
