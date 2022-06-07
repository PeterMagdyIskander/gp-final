import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import { FiAlertCircle } from "react-icons/fi";

function CircularComponent(props) {
  const buttonSx = {
    ...(props.success === "true" && {
      bgcolor: green[500],
      color: "white",
    }),
  };
  const [loading, setLoading] = useState(props.loading);
  useEffect(() => {
    if (props.success === "true") setLoading(false);
  }, [props.success,props.loading]);
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "30%",
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
            <Fab aria-label="save" sx={buttonSx}>
              {props.success === "true" ? (
                <CheckIcon />
              ) : props.success === "false" ? (
                props.number
              ) : (
                <FiAlertCircle color="red" size={28} />
              )}
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
        </Box>
        <Typography variant="p" sx={{ textAlign: "center" }}>
          {props.success === "true"
            ? props.message.success
            : props.success === "false"
            ? props.message.pending
            : props.message.fail}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularComponent;
