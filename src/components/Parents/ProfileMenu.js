import { FiEdit,FiXCircle } from "react-icons/fi";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react"
const ProfileMenu = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "50px",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let iconSize = 20;
  return (
    <div>
      <div className="container">
        <div className="row flex">
          <p className="name">Phone Number</p>
          <p className="value">01273482010</p>
          <FiEdit  style={{ cursor: "pointer" }} onClick={handleOpenModal}/>
        </div>
        <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="p" component="p">
            Phone Number
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p">
            01273482010
          </Typography>
          <FiXCircle onClick={handleCloseModal} size={iconSize} color="red" className="close-modal" />
        </Box>
      </Modal>
      </div>
    </div>
  );
};
export default ProfileMenu;
