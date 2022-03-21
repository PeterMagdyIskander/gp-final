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
const theme = createTheme();

export default function FoundForm({ onSubmit }) {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 30.068513,
    lng: 31.243771,
  });
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = (save) => {
    if(!save){
      setCoordinates({
        lat: 30.068513,
        lng: 31.243771,
      })
    } 
    setOpen(false)
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
    console.log(bounds)
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "850px",
    height: "700px",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  let iconSize = 20;

  const onFileUpload = (e) => {
    setFile(e.target.files);
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
          address: "ads",
          childName: "das",
          reporterPhone: "123",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
            file,
            coordinates,
          });
          console.log(file);
          onSubmit(file);
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
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload(e)}
                    hidden
                  />
                </Button>
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Location
                </Button>
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
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Address
          </Typography>
          <Box>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          key={suggestion.description}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </Box>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              initialCenter={coordinates}
              center={coordinates}
              zoom={17} //minimum zoom & max zoom
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker
                position={coordinates}
              />
            </GoogleMap>
          ) : (
            <></>
          )}

          <FiXCircle
            onClick={()=>handleCloseModal(false)}
            size={iconSize}
            color="red"
            className="close-modal"
          />
          <Button
            onClick={()=>handleCloseModal(true)}
            sx={{ color: "red", position: "absolute", right: 0, bottom: 0 }}
          >
            CONFIRM
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
