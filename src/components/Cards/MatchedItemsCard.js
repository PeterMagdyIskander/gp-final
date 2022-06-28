import React from "react";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { BsPinFill } from "react-icons/bs";
import { FiMapPin, FiPhoneCall, FiMail } from "react-icons/fi";
export default function MatchedItemsCard({ component, item, found }) {
  return (
    <CardContent
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        boxShadow: 10,
        borderRadius: "30px",
        bgcolor: "#fafafa",
        width: "50vw",
        height: "40vh",
        position: "relative",
      }}
    >
      {component}
      {found ? (
        <>
          <div className="flex sml-gap">
            <FiPhoneCall />
            <p>Please Call: {item.phone.slice(2)}</p>
          </div>
          <div className="flex sml-gap">
            <FiMail />
            <p>Email: {item.email}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex sml-gap">
            <FiMapPin />
            <p>Location:</p>
            <p
              className="important"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.lng}`
                );
              }}
            >
              Press Here
            </p>
          </div>
          <div className="flex sml-gap">
            <FiPhoneCall />
            <p> Please Call: {item.phone}</p>
          </div>
          <div className="flex sml-gap">
            <BsPinFill />
            <p>
              Written Address:{" "}
              {item.address === ""
                ? "No Written Address Entered"
                : item.address}
            </p>
          </div>
        </>
      )}
    </CardContent>
  );
}
