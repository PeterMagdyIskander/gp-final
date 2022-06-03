import React from "react";
import CardContent from "@mui/material/CardContent";
import { MdOutlineDevicesOther } from "react-icons/md";
import { FaCar, FaWallet } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
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
      {props.type === "car" ? (
        <FaCar size={72} />
      ) : props.type === "wallet" ? (
        <FaWallet size={72} />
      ) : props.type === "elec" ? (
        <MdOutlineDevicesOther size={72} />
      ) : (
        <FiXCircle size={72} color= "red" />
      )}

      <h2 style={{ textAlign: "center" }}>{props.id}</h2>
    </CardContent>
  );
}
