import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { SiGooglemaps } from "react-icons/si";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
const GoogleMaps = (props) => {
 
  const [address, setAddress] = useState(props.loc);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    
  }, []);
  useEffect(() => {
    setAddress(props.loc);
  }, [props.loc]);
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
    props.setLoc(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        props.setCoordinates(latLng);
      })
      .catch((error) => console.error("Error", error));
  };
  const containerStyle = {
    width: "100%",
    height: "75vh",
  };
  const createMapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  };
  const arr = ["places"];
  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        <GoogleMap
          mapContainerStyle={containerStyle}
          initialCenter={props.latLng}
          center={props.latLng}
          zoom={16} //minimum zoom & max zoom
          options={createMapOptions}
        >
          <Marker position={props.latLng} />
        </GoogleMap>
      </Box>
      <Box sx={{ top: 0, position: "absolute" }}>
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
            <Box>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  margin: "15px",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={address}
                  placeholder="Search Google Maps"
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Box
                sx={{
                  width: "400px",
                  height: "150px",
                  margin: "15px",
                  mt: "-14px",
                }}
              >
                {loading && <div>Loading...</div>}

                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#eee", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      className="dropdown-options"
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      {/* <FiMapPin /> */}
                      <SiGooglemaps
                        size="22px"
                        color="#70757a"
                        className="suggestion-marker"
                      />
                      <p className="suggestion-main-text">
                        {suggestion.formattedSuggestion.mainText + " "}
                        <span className="suggestion-sec-text">
                          {suggestion.formattedSuggestion.secondaryText}
                        </span>
                      </p>
                      <p className="suggestion-sec-text"></p>
                    </div>
                  );
                })}
              </Box>
            </Box>
          )}
        </PlacesAutocomplete>
      </Box>
    </Box>
  );
};
export default GoogleMaps;
