import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button, Grid } from "@mui/material";
import GoogleMaps from "../Google/GoogleMaps";
import { toast } from "react-toastify";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import ImageContainer from "../Cards/ImageContainer";
const theme = createTheme();
export default function FoundForm({
  setFiles,
  setData,
  setFileName,
  setSendReq,
}) {
  const [loc, setLoc] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [helperTextNumber, setHelperTextNumber] = useState(false);
  //initialy set to midan el tahrir
  const [coordinates, setCoordinates] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  useEffect(() => {
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
  const [file, setFile] = useState([]);

  const formatName = (name, address, lat, long) => {
    const filename = (name + address + lat + long + Date.now()).toString();
    const filename1 = filename.replace(/\./g, "d");
    const filename2 = filename1.replace(/ /g, "s");
    return filename2;
  };
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const onFileUpload = (e) => {
    let imgs = Object.keys(e.target.files).map((img) => {
      if (e.target.files && e.target.files[img]) {
        return URL.createObjectURL(e.target.files[img]);
      }
      return "";
    });
    setFile(imgs);
    setFiles(e.target.files);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
          childName: "",
          reporterPhone: "",
        }}
        onSubmit={(values) => {
          

          if (file.length === 0) {
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
          if (values.reporterPhone !== "") {
            if (
              !/^(010|011|012|015)[0-9]{8}$/.test(`0${values.reporterPhone}`)
            ) {
              setNumberError(true);
              setHelperTextNumber("Please Enter A Valid Number or None at all");
              return;
            }
          }
          setNumberError(false);

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
            {file.length > 0 && (
              <Button onClick={handleOpenModal}>View Child Images</Button>
            )}
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
              helperText={helperTextNumber}
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
            <Modal
              open={open}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {/* <ImageList
                  sx={{ width: 620, height: 405 }}
                  cols={3}
                  rowHeight={200}
                >
                  {file.map((img) => (
                    <ImageListItem key={img}>
                      <img
                        src={img}
                        srcSet={img}
                        alt={img.name}
                        loading="lazy"
                        id="status-card-img"
                      />
                    </ImageListItem>
                  ))}
                </ImageList> */}
                <ImageContainer imgs={file} selectable={false}/>
              </Box>
            </Modal>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
}
