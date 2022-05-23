import { useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const theme = createTheme();
export default function ReportItemForm({ setData, onSubmit }) {
  const [selected, setSelected] = React.useState("Car");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Formik
      initialValues={{
        id: "",
      }}
      onSubmit={(values) => {
        console.log({
          ...values,
        });
        setData({
          id: values.id,
        });
        onSubmit(true);
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
              <Typography
                sx={{
                  mb: 3,
                }}
              >
                Type of Item Found
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Item</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selected}
                  label="Item"
                  onChange={handleChange}
                >
                  <MenuItem value={"Car"} selected>
                    Car
                  </MenuItem>
                  <MenuItem value={"Electronics"}>Electronics</MenuItem>
                  <MenuItem value={"Wallet"}>Wallet</MenuItem>
                </Select>
              </FormControl>

              <Field
                name="id"
                label={
                  selected === "Car"
                    ? "Car Numbers"
                    : selected === "Electronics"
                    ? "Serial Number"
                    : "ID"
                }
                type="text"
                id="id"
                required={false}
                component={MyField}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Lost Item
              </Button>
            </Box>
          </Container>
        </ThemeProvider>
      </Form>
    </Formik>
  );
}
