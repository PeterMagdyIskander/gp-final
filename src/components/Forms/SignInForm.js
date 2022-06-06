import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, Field } from "formik";
import { MyField } from "./MyField";

import { Link as Redirect } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      <Redirect to="/">Lost and Found</Redirect>

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInForm({ onSubmit }) {
  const [loading, setLoading] = React.useState(false);
  return (
    <Formik
      initialValues={{ email: "abadeer@hotmail.com", password: "abadir_2000" }}
      onSubmit={(values) => {
        onSubmit(values);
        setLoading(true);
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
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Field
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                component={MyField}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={MyField}
              />
              <LoadingButton
                type="submit"
                loading={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Redirect to="/signup">Don't have an account?</Redirect>
                </Grid>
              </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Form>
    </Formik>
  );
}
