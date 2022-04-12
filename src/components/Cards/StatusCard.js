import React from "react";
import { FiInfo, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FiMapPin, FiCalendar, FiUser } from "react-icons/fi";
const theme = createTheme();
const StatusCard = (props) => {
  const color = props.child.status ? "green" : "red";
  let iconSize = 20;
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "70%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  function handleRemoveChild() {}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CardContent
          variant="outlined"
          sx={{
            width: "fit-content",
            display: "grid",
            gridTemplateColumns: "200px 300px",
            gap: "10px",
            margin: "5%",
            boxShadow: 1,
            borderRadius: "30px",
            bgcolor: "#fafafa",
          }}
        >
          <img
            className="lost-child-img"
            alt={props.child.nameOfChild}
            src={props.child.imgs[0]}
            z
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
            >
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
            </Box>
            <span>
              <FiInfo
                size={iconSize}
                color={color}
                style={{ cursor: "pointer" }}
                onClick={handleOpenModal}
              />
            </span>
          </Box>
        </CardContent>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Child Info
            </Typography>
            <ImageList
              sx={{ width: 620, height: 405 }}
              cols={3}
              rowHeight={200}
            >
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
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <FiUser size={28} />
                </ListItemAvatar>
                <ListItemText
                  primary="Name:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {props.child.nameOfChild}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <FiCalendar size={28} />
                </ListItemAvatar>
                <ListItemText
                  primary="Age:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {props.child.ageOfChild}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <FiMapPin size={28} />
                </ListItemAvatar>
                <ListItemText
                  primary="Location:"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"location here"}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            <Button onClick={handleRemoveChild}>Remove Report</Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default StatusCard;
