import React, { useState, useCallback } from "react";
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
const GoogleMaps = () => {
  const [coordinates, setCoordinates] = useState({
    lat: 30.068513,
    lng: 31.243771,
  });
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
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoordinates(latLng))
      .catch((error) => console.error("Error", error));
  };
  const handleChange = (address) => {
    setAddress(address);
  };
  const containerStyle = {
    width: "800px",
    height: "400px",
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  function createMapOptions(map) {
    return {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    };
  }
  return (
    <Box sx={{ position: "relative" }}>
      <Box>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            initialCenter={coordinates}
            center={center}
            zoom={17} //minimum zoom & max zoom
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
            </Box>
          )}
        </PlacesAutocomplete>
      </Box>
    </Box>
  );
};
export default GoogleMaps;
