import { useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FiXCircle } from "react-icons/fi";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMaps from "../Google/GoogleMaps";
const theme = createTheme();

export default function FoundForm({
  setFiles,
  setData,
  setFileName,
  onSubmit,
}) {
  const [coordinates, setCoordinates] = useState({});
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = (save) => {
    if (!save) {
      setCoordinates({
        lat: 30.068513,
        lng: 31.243771,
      });
    }
    setOpen(false);
  };
  let options = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  const containerStyle = {
    width: "600px",
    height: "600px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDLCaL4NEybKGfsw_SYedrBpiClAFIej9I",
  });
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    console.log(bounds);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "750px",
    height: "70%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let iconSize = 20;
  const formatName = (name, address, lat, long) => {
    const filename = (name + address + lat + long + Date.now()).toString();
    const filename1 = filename.replace(/\./g, "d");
    const filename2 = filename1.replace(/ /g, "s");
    return filename2;
  };
  const onFileUpload = (e) => {
    setFile(e.target.files);
    setFiles(e.target.files);
  };
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoordinates(latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div>
      <Formik
        initialValues={{
          address: "",
          childName: "",
          reporterPhone: "",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
            file,
            coordinates,
          });
          setFileName(
            formatName(
              values.childName,
              values.address,
              coordinates.lat,
              coordinates.lng
            )
          );
          setData({
            address: values.address,
            childName: values.childName,
            reporterPhone: values.reporterPhone,
            coordinates: coordinates,
          });
          onSubmit(true);
        }}
      >
        <Form>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button component="label">
                  Upload Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload(e)}
                    required
                    hidden
                  />
                </Button>
                <Button onClick={handleOpenModal}>Location</Button>
                <Field
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  required={false}
                  component={MyField}
                />
                <Field
                  name="childName"
                  label="Child Name"
                  type="text"
                  id="childName"
                  required={false}
                  component={MyField}
                />
                <Field
                  name="reporterPhone"
                  label="Phone Number"
                  type="number"
                  id="reporterPhone"
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
          </ThemeProvider>
        </Form>
      </Formik>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Address
          </Typography>

          <GoogleMaps setCoordinates={setCoordinates}/>
          <Button
            onClick={() => handleCloseModal(true)}
            sx={{ color: "red", position: "absolute", right: 0, bottom: 0 }}
          >
            CONFIRM
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
