import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Redirect } from "react-router-dom";
import Link from "@mui/material/Link";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Signup } from "../../AWS/signup";
import { useNavigate } from "react-router";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Redirect to="/">Lost&Found</Redirect>

      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpForm() {
  const [signedUpEmailError, setSignedUpEmailError] = React.useState(false);
  const [signedUpPasswordError, setSignedUpPasswordError] =
    React.useState(false);
  const [signedUpNumberError, setSignedUpNumberError] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        verificationCode: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        if (/^(010|011|012|015)[0-9]{8}$/.test(`0${values.phone}`)) {
          setSignedUpNumberError(false);
          try {
            let signUpRes = await Signup(
              values.email,
              values.password,
              values.email,
              `+20${values.phone}`,
              values.firstName,
              values.lastName
            );
            console.log(signUpRes);
            navigate("/login");
          } catch (error) {
            if (error.toString().includes("email")) {
              setSignedUpEmailError(true);
              setSignedUpPasswordError(false);
            } else if (error.toString().includes("Password")) {
              setSignedUpEmailError(false);
              setSignedUpPasswordError(true);
            }
          }
        } else {
          setSignedUpNumberError(true);
        }
      }}
    >
      <Form>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>

              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    component={MyField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    component={MyField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    component={MyField}
                    helperText="Invalid Mail Format"
                    error={signedUpEmailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    type="number"
                    autoComplete="phone"
                    component={MyField}
                    helperText="Invalid Number Format"
                    error={signedUpNumberError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    required
                    fullWidth
                    error={signedUpPasswordError}
                    helperText="Must contain more than 8 characters and has an uppercase and a lowercase character"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    component={MyField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Redirect to="/login">Already have an account?</Redirect>
                </Grid>
              </Grid>
            </Box>

            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </Form>
    </Formik>
  );
}
