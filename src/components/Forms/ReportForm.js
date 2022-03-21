import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
const theme = createTheme();

export default function ReportForm({ onSubmit }) {
  const [file, setFile] = useState([]);
  const [imgs, setImgs] = useState([]);
  const onFileUpload = (e) => {
    let imgs = Object.keys(e.target.files).map((img) => {
      if (e.target.files && e.target.files[img]) {
        return URL.createObjectURL(e.target.files[img]);
      }
      return ''
    });
    setFile(imgs);
    setImgs(e.target.files);
    console.log(imgs);
  };

  return (
    <div>
      <Formik
        initialValues={{
          childName: "das",
          childAge: "123",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
          });
          console.log(file);
          onSubmit(imgs);
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
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileUpload(e)}
                    multiple
                    hidden
                  />
                </Button>
                {file.length !== 0 ? (
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
                ) : null}
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
    </div>
  );
}
