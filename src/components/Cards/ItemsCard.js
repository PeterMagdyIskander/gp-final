import React from "react";
import CardContent from "@mui/material/CardContent";
import { FaCar, FaWallet } from "react-icons/fa";
import { MdOutlineDevicesOther } from "react-icons/md";
export default function ItemsCard(props) {
  return (
    <CardContent
      variant="outlined"
      sx={{
        mt: "5%",
        mb: "5%",
        boxShadow: 10,
        borderRadius: "30px",
        bgcolor: "#fafafa",
        width: "232px",
        height: "283.6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {props.type === "Car" ? (
        <FaCar size={72} />
      ) : props.type === "Wallet" ? (
        <FaWallet size={72} />
      ) : (
        <MdOutlineDevicesOther size={72} />
      )}

      <h2>{props.id}</h2>
    </CardContent>
  );
}
