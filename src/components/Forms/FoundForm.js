import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button, Grid } from "@mui/material";
import GoogleMaps from "../Google/GoogleMaps";
import { toast, ToastContainer } from "react-toastify";
const theme = createTheme();
export default function FoundForm({
  setFiles,
  setData,
  setFileName,
  setSendReq,
}) {
  const [loc, setLoc] = useState("Tahrir Square, Egypt");
  const [numberError, setNumberError] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  const [file, setFile] = useState(null);

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

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          address: loc,
          childName: "",
          reporterPhone: "",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
            file,
            coordinates,
          });

          if (file === null) {
            toast.error("Please Add pictures", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (Object.keys(coordinates).length === 0) {
            toast.error("Please add your location", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (/^(010|011|012|015)[0-9]{8}$/.test(`0${values.reporterPhone}`)) {
            if (numberError) setNumberError(false);
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
            setSendReq(true);
          } else {
            setNumberError(true);
          }
        }}
      >
        <Form>
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
              <Button component="label">
                Upload Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileUpload(e)}
                  multiple
                  hidden
                />
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
                helperText="Invalid Number Format"
                error={numberError}
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

              <ToastContainer />
            </Box>
          </Container>
        </Form>
      </Formik>
    </>
  );
}
