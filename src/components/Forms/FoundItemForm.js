import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import GoogleMaps from "../Google/GoogleMaps";
export default function FoundItemForm({ setData, onSubmit }) {
  const [selected, setSelected] = React.useState("car");
  const [numberError, setNumberError] = React.useState(false);
  const [idError, setIdError] = React.useState(false);
  const [loc, setLoc] = useState("");
  //initialy set to midan el tahrir
  const [coordinates, setCoordinates] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (coor) => {
        setCoordinates({
          lat: coor.coords.latitude,
          lng: coor.coords.longitude,
        });
        let res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coor.coords.latitude},${coor.coords.longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        );
        res = await res.json();
        setLoc(res.results[1].formatted_address);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        address: loc,
        id: "",
        reporterPhone: "",
      }}
      onSubmit={(values) => {
        console.log({
          ...values,
          coordinates,
        });

        if (/^(010|011|012|015)[0-9]{8}$/.test(`0${values.reporterPhone}`)) {
          if (numberError) setNumberError(false);
          let passed = false;
          switch (selected) {
            case "wallet":
              if (
                /^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/.test(
                  values.id
                )
              ) {
                passed = true;
              }
              break;
            case "elec":
              if (/^([0-9a-fA-F]){8}$/.test(values.id)) {
                passed = true;
              }
              break;
            case "car":
              passed = true;
              break;
            default:
              console.error("invalid params");
          }
          if (passed) {
            setData({
              address: values.address,
              id: values.id.toString(),
              type: selected,
              reporterPhone: `0${values.reporterPhone}`,
              lat: coordinates.lat,
              lng: coordinates.lng,
            });
            onSubmit(true);
          } else {
            setIdError(true);
          }
        } else {
          console.log("faas");
          setNumberError(true);
        }
      }}
    >
      <Container
        sx={{ display: "flex", justifyContent: "space-between" }}
        maxWidth="xl"
      >
        <Box sx={{ width: "65vw", mr: "20px" }}>
          <GoogleMaps
            setCoordinates={setCoordinates}
            setLoc={setLoc}
            latLng={coordinates}
            loc={loc}
          />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30vw",
          }}
        >
          <Typography
            sx={{
              mb: 3,
            }}
          >
            Type of Item Found
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Item</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Item"
              onChange={handleChange}
            >
              <MenuItem value={"car"} selected>
                Car
              </MenuItem>
              <MenuItem value={"elec"}>Electronics</MenuItem>
              <MenuItem value={"wallet"}>Wallet</MenuItem>
            </Select>
          </FormControl>

          <Field
            name="id"
            label={
              selected === "car"
                ? "Car Numbers"
                : selected === "elec"
                ? "Serial Number"
                : "ID"
            }
            type={
              selected === "car"
                ? "text"
                : selected === "elec"
                ? "text"
                : "number"
            }
            id="id"
            required={false}
            helperText="Invalid id Format"
            error={idError}
            component={MyField}
          />
          <Field
            name="reporterPhone"
            label="Phone Number"
            type="number"
            id="reporterPhone"
            required={false}
            helperText="Invalid Number Format"
            error={numberError}
            component={MyField}
          />
          <Field
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            required={false}
            component={MyField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Found Report
          </Button>
        </Box>
      </Container>
    </Formik>
  );
}
