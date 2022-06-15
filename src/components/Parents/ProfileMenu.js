import { FiEdit, FiCheck } from "react-icons/fi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, ButtonBase, Input, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { BsPersonX } from "react-icons/bs";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";
import { setAuthedUser } from "../../ReduxStore/actions/authedUser";

import { setChildren } from "../../ReduxStore/actions/children";
import { setItems } from "../../ReduxStore/actions/items";

const ProfileMenu = ({ authedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sentReq, setSentReq] = useState(false);
  const [newPhone, setNewPhone] = useState(authedUser.phoneNumber.slice(2));
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);

  const signOut = () => {
    console.log("Successufully Signed out");
    dispatch(setAuthedUser(null));
    dispatch(setChildren(null));
    dispatch(setItems(null));
    navigate("/");
  };

  const saveChange = () => {
    if (/^(010|011|012|015)[0-9]{8}$/.test(`${newPhone}`)) {
      setEdit(false);

      setError(false);
    } else {
      setError(true);
      toast.error("Inavlid Number Format", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "25vw",
        height: "65vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "30px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "30%",
          bgcolor: "background.paper",
          bgcolor: "#073944",
          borderRadius: "30px 30px  0 0",
          mb: "70px",
        }}
      >
        <Fab
          aria-label="save"
          sx={{
            bgcolor: "#39A2DB",
            color: "white",
            top: "100%",
            left: "50%",
            width: "6rem",
            height: "6rem",
            border: "5px solid white",
            fontSize: "3rem",
            transform: "translate(-50%, -50%)",
            "&&:hover": {
              color: "#39A2DB",
              bgcolor: "white",
              border: "5px solid #39A2DB",
            },
          }}
        >
          {authedUser.name[0]}
        </Fab>
      </Box>
      <Box
        sx={{
          m: "25px",
        }}
      >
        <p>Name: {authedUser.name}</p>
        <>
          {!edit ? (
            <div className="flex sml-gap">
              <p>Phone Number: {newPhone}</p>
              <FiEdit
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEdit(true);
                }}
              />
            </div>
          ) : (
            <div className="flex flex-space-between">
              <TextField
                label="New phone number"
                variant="standard"
                type="number"
                value={newPhone}
                error={error}
                helperText={error && "Incorrect Number Format"}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <FiCheck
                style={{ cursor: "pointer" }}
                size="2vw"
                onClick={() => {
                  saveChange();
                }}
              />
            </div>
          )}
        </>
        <p>Email: {authedUser.email}</p>
        <Button
          sx={{
            m: "15px 0",
            textTransform: "none",
            fontWeight: "600",
            fontSize: "1.2rem",
            fontFamily: "Quicksand",
            borderRadius: "15px",
            backgroundColor: "white",
            color: "red",
            flaot: "right",
            "&:hover": {
              color: "red",
              backgroundColor: "white",
              color: "red",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            },
          }}
          variant="contained"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ProfileMenu);
