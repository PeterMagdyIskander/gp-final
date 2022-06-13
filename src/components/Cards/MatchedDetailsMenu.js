import React from "react";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { FiPhoneCall, FiMapPin, FiMap } from "react-icons/fi";
import { BsPinFill} from "react-icons/bs";
import MatchedCard from "./MatchedCard";
import { useState } from "react";
export default function MatchedDetailsMenu(props) {
  console.log(props);
  const [selectedMatch, setSelectedMacth] = useState(props.matches[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setSelectedMatch = (match, index) => {
    console.log(selectedMatch);
    setSelectedMacth(match);
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ width: "25vw", height: "85vh", overflowY: "scroll" }}>
        {props.matches.map((match, index) => {
          return (
            <MatchedCard
              key={index}
              index={index}
              selectedIndex={selectedIndex}
              img={match.photosuri[0]}
              match={match}
              setSelectedMatch={setSelectedMatch}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          boxShadow: 10,
          borderRadius: "30px",
          height: "85vh",
          width: "75vw",
          p: "0 20px",
          m: "0 10px",
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
        <div className="flex big-gap">
          <FiPhoneCall />
          <p>
            {" "}
            Please Call{" "}
            {selectedMatch.metadata.phonenumber === ""
              ? "Not Entered"
              : selectedMatch.metadata.phonenumber}
          </p>
        </div>
        <div className="flex big-gap">
          <FiMap />
          <p>
            {" "}
            Written Address{" "}
            {selectedMatch.metadata.writenaddress === ""
              ? "Not Written Address Entered"
              : selectedMatch.metadata.writenaddress}
          </p>
        </div>
        <div className="flex big-gap">
          <FiMapPin color="red" />
          <p
            className="important"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${selectedMatch.metadata.lat}%2C${selectedMatch.metadata.lng}`
              );
            }}
          >
            {" "}
            Go to Google Maps
          </p>
        </div>
      </Box>
    </Box>
  );
}
