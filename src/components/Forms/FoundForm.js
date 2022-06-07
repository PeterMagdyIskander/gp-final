import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import GoogleMaps from "../Google/GoogleMaps";
import { toast, ToastContainer } from "react-toastify";
const theme = createTheme();
export default function FoundForm({
  setFiles,
  setData,
  setFileName,
  onSubmit,
}) {
  const [numberError, setNumberError] = useState(false);
  const [coordinates, setCoordinates] = useState({});
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
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
            onSubmit(true);
          } else {
            setNumberError(true);
          }
        }}
      >
        <Form>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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

          <GoogleMaps setCoordinates={setCoordinates} />
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
