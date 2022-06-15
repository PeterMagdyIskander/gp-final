import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function ReportItemForm({ setData, onSubmit }) {
  const [selected, setSelected] = useState("car");
  const [idError, setIdError] = useState(false);

  const [helperTextId, setHelperTextId] = useState("");
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={{
          id: "",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
          });
          if (values.id === "") {
            setIdError(true);
            setHelperTextId("Please Enter A Value");
            return;
          }
          switch (selected) {
            case "wallet":
              if (
                !/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/.test(
                  values.id
                )
              ) {
                setHelperTextId("Invalid Id Format");
                return;
              }
              break;
            case "elec":
              break;
            case "car":
              break;
          }
          setIdError(false);

          setData({
            id: values.id.toString(),
            type: selected,
          });
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
                <MenuItem value={"car"} selected>
                  Car
                </MenuItem>
                <MenuItem value={"elec"}>Electronics</MenuItem>
                <MenuItem value={"wallet"}>Wallet</MenuItem>
              </Select>
            </FormControl>

            <Field
              name="id"
              label={
                selected === "car"
                  ? "Car Numbers"
                  : selected === "elec"
                  ? "Serial Number"
                  : "ID"
              }
              type={
                selected === "car"
                  ? "text"
                  : selected === "elec"
                  ? "text"
                  : "number"
              }
              id="id"
              required={false}
              component={MyField}
              helperText={helperTextId}
              error={idError}
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
        </Form>
      </Formik>
    </Container>
  );
}
