import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import { getchildids } from "../../AWS/dynamodblogic";


import { toast } from "react-toastify";
import ImageContainer from "../Cards/ImageContainer";

export default function ReportForm({ onSubmit, setData, setFiles,authedUser }) {
  const [file, setFile] = useState([]);
  const [open, setOpen] = useState(false);
  const [NameError, setNameError] = useState(false);
  const [AgeError, setAgeError] = useState(false);
  const [nameerrortext, setnameerrortext] = useState("");
  const [LocationError, setLocationError] = useState(false);
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
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          childName: "",
          childAge: "",
          location: "",
        }}
        onSubmit={async (values) =>  {
          
          
          const childids=await getchildids(authedUser.email,authedUser.jwtToken);
          
          if(childids.has(values['childName']))
          {
            setnameerrortext('This child is already Reported \nyou can edit it from status page')
            setNameError(true);
            return;
          }

          
          
         
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
            return;
          }
          if (values.childName === "") {
            values.childName="child "+childids.size;
          }
          setNameError(false);

          // if (values.childAge === "" || values.childAge === 0) {
          //   setAgeError(true);
          //   return;
          // }
          setAgeError(false);
          if (values.location === "") {
            setLocationError(true);
            return;
          }
          setLocationError(false);
          setData(values);
          onSubmit(true);
        }}
      >
        <Form>
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
              required={false}
              component={MyField}
              error={NameError}
              helperText={nameerrortext}
            />
            <Field
              name="location"
              label="Location"
              type="text"
              id="location"
              required={false}
              component={MyField}
              error={LocationError}
              helperText="Please enter the Location Value "
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
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <ImageList sx={{ width: 620, height: 405 }} cols={3} rowHeight={200}>
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
          <ImageContainer imgs={file} selectable={false} />
        </Box>
      </Modal>
    </Container>
  );
}
