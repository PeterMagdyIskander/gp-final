import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { FiPhone, FiMapPin, FiMap } from "react-icons/fi";
import MatchedCard from "./MatchedCard";
import { useState } from "react";
export default function MatchedDetailsMenu(props) {
  console.log(props);

  const [selectedMatch, setSelectedMacth] = useState(props.matches[0]);
  const setSelectedMatch = (match) => {
    console.log(matchMedia);
    setSelectedMacth(match);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ width: "30%" }}>
        {props.matches.map((match, index) => {
          return (
            <MatchedCard
              key={index}
              img={match.photosuri[0]}
              match={match}
              setSelectedMatch={setSelectedMatch}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: "30px",
          padding: "10px",
          height: "90%",
          width: "90%",
          margin: "15px",
        }}
      >
        <ImageList
          sx={{
            height: 405,
            margin: "10px auto",
            padding: "10px",
            boxShadow: 1,
            borderRadius: "30px",
          }}
          cols={5}
          rowHeight={200}
        >
          {selectedMatch.photosuri.map((img, index) => (
            <ImageListItem key={index}>
              <img
                src={img}
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
          <FiPhone /> Phone Numeber {selectedMatch.metadata.phonenumber}
        </Typography>{" "}
        <Typography
          sx={{ m: "10px" }}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <FiMap /> Written Address {selectedMatch.metadata.address}
        </Typography>{" "}
        {/* <Typography
          sx={{ m: "10px" }}
          id="modal-modal-title"
          variant="p"
          component="p"
        >
          <FiMapPin /> Location {selectedMatch.location}
        </Typography> */}
      </Box>
    </Box>
  );
}
