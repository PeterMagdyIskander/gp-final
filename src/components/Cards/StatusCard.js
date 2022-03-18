import { FiInfo, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
const StatusCard = (props) => {
  const color = props.child.status ? "green" : "red";
  let iconSize = 20;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "700px",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="status-card-grid">
      <div>
        <img className="lost-child-img" src={props.child.imgs[0]} />
      </div>
      <div className="flex flex-space-between">
        <div className="flex">
          {props.child.status ? (
            <>
              <FiCheckCircle size={iconSize} color={color} />
              <p>Matched</p>
            </>
          ) : (
            <>
              <FiXCircle size={iconSize} color={color} />
              <p>Not Matched</p>
            </>
          )}
        </div>
        <FiInfo
          size={iconSize}
          color={color}
          style={{ cursor: "pointer" }}
          onClick={handleOpenModal}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Child Info
          </Typography>
          <ImageList sx={{ width: 620, height: 405 }} cols={3} rowHeight={200}>
            {props.child.imgs.map((img) => (
              <ImageListItem key={img.name}>
                <img
                  src={`${img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={img.name}
                  loading="lazy"
                  id="status-card-img"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Typography
            id="modal-modal-title"
            gutterBottom={true}
            variant="body1"
          >
            Name: {props.child.nameOfChild}
          </Typography>
          <Typography
            id="modal-modal-title"
            gutterBottom={true}
            variant="body1"
          >
            Age: {props.child.ageOfChild}
          </Typography>
          <Typography
            id="modal-modal-title"
            gutterBottom={true}
            variant="body1"
          >
            Who to call: {props.child.parentPhoneNumber}
          </Typography>
          <Button
            sx={{ color: "red", position: "absolute", right: 0, bottom: 0 }}
          >
            Remove Report
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StatusCard;
