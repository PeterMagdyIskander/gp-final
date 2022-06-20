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
  const [addressError, setAddressError] = React.useState(false);
  const [loc, setLoc] = useState("");
  const [helperTextId, setHelperTextId] = useState("");
  const [helperTextPhone, setHelperTextPhone] = useState("");
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
        try {
          let res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coor.coords.latitude},${coor.coords.longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
          );
          res = await res.json();
          setLoc(res.results[1].formatted_address);
        } catch (err) {
          setLoc("Tahrir Square. Cairo, Egypt");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
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
          if (values.id === "") {
            setIdError(true);
            setHelperTextId("Please Enter A Value");
            return;
          }

          switch (selected) {
            case "wallet":
              if (
                !/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/.test(
                  values.id
                )
              ) {
                setHelperTextId("Invalid Id Format");
                return;
              }
              break;
            case "elec":
              break;
            case "car":
              break;
          }
          setIdError(false);
          if (values.reporterPhone === "") {
            setNumberError(true);
            setHelperTextPhone("Please Enter Your Phone Number");
            return;
          }
          if (!/^(010|011|012|015)[0-9]{8}$/.test(`0${values.reporterPhone}`)) {
            setNumberError(true);
            setHelperTextPhone("Please Enter A Valid Phone Number");
            return;
          }
          setNumberError(false);
          if (values.address === "") {
            setAddressError(true);
            return;
          }

          setAddressError(false);

          setData({
            address: values.address,
            id: values.id.toString(),
            type: selected,
            reporterPhone: `0${values.reporterPhone}`,
            lat: coordinates.lat.toString(),
            lng: coordinates.lng.toString(),
          });
          onSubmit(true);
        }}
      >
        <Form>
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
              helperText={helperTextId}
              error={idError}
              component={MyField}
            />
            <Field
              name="reporterPhone"
              label="Phone Number"
              type="number"
              id="reporterPhone"
              required={false}
              helperText={helperTextPhone}
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
              helperText="Please Enter An Address"
              error={addressError}
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
        </Form>
      </Formik>
    </Container>
  );
}
