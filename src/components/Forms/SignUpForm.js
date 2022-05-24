import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Redirect } from "react-router-dom";
import Link from "@mui/material/Link";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";
import { Signup, conSignup } from "../../AWS/signup";
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
      <Link>
        <Redirect to="/">Lost and Found</Redirect>
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpForm() {
  const [confirmation, setConfirmation] = React.useState();
  const [signedUp, setSignedUp] = React.useState(false);
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
        if (!signedUp) {
          let signedUp = await Signup(
            values.email,
            values.password,
            values.email,
            `+20${values.phone}`,
            values.firstName,
            values.lastName
          );
        }
        console.log(signedUp);
        setSignedUp(true);
        let confirmation = conSignup(
          "petermiskander@gmail.com",
          values.verificationCode
        );
        console.log(confirmation);
        navigate("/login");
      }}
    >
      <Form>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {!signedUp ? (
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>

                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>

                <Grid container spacing={2}>
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      component={MyField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      fullWidth
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
                    <Link href="#" variant="body2">
                      <Redirect to="/signin">Already have an account?</Redirect>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Field
                    required
                    fullWidth
                    id="verificationCode"
                    label="Verification Code"
                    name="verificationCode"
                    autoComplete="verificationCode"
                    component={MyField}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit Code
                </Button>
              </>
            )}
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </Form>
    </Formik>
  );
}
