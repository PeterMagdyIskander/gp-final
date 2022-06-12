import { FiEdit, FiXCircle } from "react-icons/fi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
const ProfileMenu = ({ authedUser }) => {
  const [open, setOpen] = useState(false);
  const [sentReq, setSentReq] = useState(false);
  const [newPhone, setNewPhone] = useState(authedUser.phoneNumber.slice(2));
  const [error, setError] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleChangePhone = (e) => {
    setNewPhone(e.target.value);
  };
  const saveChange = () => {
    if (/^(010|011|012|015)[0-9]{8}$/.test(`${newPhone}`)) {
      sentReq(true);
      //call function
      sentReq(false);
      setError(false);
      handleCloseModal();
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
  const cancelChange = () => {
    setNewPhone(authedUser.phoneNumber.slice(2));
    handleCloseModal();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "fit-content",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  let iconSize = 20;
  return (
    <div className="found-options-container col">
      <div className="row">
        <p className="card-title">Name: {authedUser.name}</p>
      </div>
      <div className="row">
        <p className="card-title">Phone Number: {newPhone}</p>
        <FiEdit style={{ cursor: "pointer" }} onClick={handleOpenModal} />
      </div>
      <div className="row">
        <p className="card-title">Email: {authedUser.email}</p>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>New Phone Number</h1>
          <TextField
            type="number"
            label="New Phone Number"
            value={newPhone}
            error={error}
            onChange={(e) => {
              handleChangePhone(e);
            }}
          />{" "}
          <Button
            disable={sentReq}
            sx={{
              m: "15px 0",
              borderRadius: "15px",
              "&:hover": {
                color: "#1976d2",
                fontWeight: "600",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              },
            }}
            variant="contained"
            onClick={saveChange}
            disabled={sentReq}
          >
            Save Changes
          </Button>
          <Button
            disable={sentReq}
            sx={{
              m: "15px 0",
              borderRadius: "15px",
              "&:hover": {
                color: "#1976d2",
                fontWeight: "600",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              },
            }}
            variant="contained"
            onClick={cancelChange}
            disabled={sentReq}
          >
            Cancel Changes
          </Button>
        </Box>
      </Modal>
      <ToastContainer limit={1} />
    </div>
  );
};
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(ProfileMenu);
