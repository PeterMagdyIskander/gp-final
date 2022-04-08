import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
function CircularComponent(props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const buttonSx = {
    ...(success && {
      bgcolor: "info",
    }),
  };
  if (props.start) {
    setSuccess(false);
    setLoading(true);
  }
  if (props.end) {
    setSuccess(true);
    setLoading(false);
  }
  return (
    <Box sx={{ display: "grid", justifyItems: "center", margin: "10px" }}>
      <Box
        sx={{
          position: "relative",
          mb: "10px",
        }}
      >
        <Fab aria-label="save" color="info" sx={buttonSx}>
          {success ? <CheckIcon /> : props.processNumber}
        </Fab>
        {loading && (
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
      <Typography variant="p">{props.message}</Typography>
    </Box>
  );
}

export default CircularComponent;
