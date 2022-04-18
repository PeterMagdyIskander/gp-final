import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  LoadScript,
  InfoBox,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { FiMapPin } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
const GoogleMaps = (props) => {
  const [coordinates, setCoordinates] = useState({});
  const [address, setAddress] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDLCaL4NEybKGfsw_SYedrBpiClAFIej9I",
  });
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    console.log(bounds);
  }, []);
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoordinates(latLng);
        props.setCoordinates(latLng);
      })
      .catch((error) => console.error("Error", error));
  };
  const containerStyle = {
    width: "600px",
    height: "350px",
  };
  const createMapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  };
  useEffect(() => {
    setCoordinates({ lat: 30.068513, lng: 31.243771 });
  }, []);
  console.log(coordinates);
  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            initialCenter={coordinates}
            center={coordinates}
            zoom={19} //minimum zoom & max zoom
            onLoad={onLoad}
            options={createMapOptions}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        ) : (
          <></>
        )}
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
              {/* <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              /> */}
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
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <Box
                      sx={{ height: "25px", padding: "5px", gap: "5px" }}
                      key={suggestion.description}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <FiMapPin />
                      <span>{suggestion.formattedSuggestion.mainText}</span>
                    </Box>
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
