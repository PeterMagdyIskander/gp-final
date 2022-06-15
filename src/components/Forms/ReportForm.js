import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";

import { toast, ToastContainer } from "react-toastify";
const theme = createTheme();

export default function ReportForm({ onSubmit, setData, setFiles }) {
  const [file, setFile] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
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
    width: "fit-content",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Formik
      initialValues={{
        childName: "",
        childAge: "",
        location: "",
      }}
      onSubmit={(values) => {
        console.log({
          ...values,
        });
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
        } else {
          setData(values);
          onSubmit(true);
        }
      }}
    >
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
                Upload Child Images
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
                name="childName"
                label="Child Name"
                type="text"
                id="childName"
                required={true}
                component={MyField}
              />
              <Field
                name="childAge"
                label="Child Age"
                type="number"
                id="childAge"
                required={true}
                component={MyField}
              />
              <Field
                name="location"
                label="Location"
                type="text"
                id="location"
                required={true}
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
                  <ImageList
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
                  </ImageList>
                </Box>
              </Modal>
              <ToastContainer />
            </Box>
          </Container>
        </ThemeProvider>
    </Formik>
  );
}
