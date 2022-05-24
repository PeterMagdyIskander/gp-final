import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { FiPhone, FiMapPin, FiMap } from "react-icons/fi";
import MatchedCard from "./MatchedCard";
export default function MatchedDetailsMenu(props) {
  console.log(props)
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ width: "45%" }}>
        {props.imgs.map((match, index) => {
          return (
            <MatchedCard
              key={index}
              img={match}
              match={match}
              selectMatch={props.setSelectedMatch}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: "30px",
          padding: "10px",
          height: "80%",
          width: "70%",
          margin: "15px",
        }}
      >
        <ImageList
          sx={{
            width: "90%",
            height: 405,
            margin: "10px auto",
            padding: "10px",
            boxShadow: 1,
            borderRadius: "30px",
          }}
          cols={3}
          rowHeight={200}
        >
          {props.matches.map((img, index) => (
            <ImageListItem key={index}>
              <img
                src={img.img}
                srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={index}
                id="status-card-img"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography
          sx={{ m: "10px" }}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <FiPhone /> Phone Numebr {"Selected Match Number"}
        </Typography>{" "}
        <Typography
          sx={{ m: "10px" }}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <FiMap /> Written Address {"Selected Match Number"}
        </Typography>{" "}
        <Typography
          sx={{ m: "10px" }}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <FiMapPin /> Location {"Selected Match Location"}
        </Typography>
      </Box>
    </Box>
  );
}
