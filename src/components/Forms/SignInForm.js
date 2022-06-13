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
import { connect } from "react-redux";
import {
  setAuthedUser,
  runLogoutTimer,
} from "../../ReduxStore/actions/authedUser";
import { useLocation, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../AWS/UserPool";
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

      <Redirect to="/">Lost&Found</Redirect>

      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignInForm(props) {
  const { dispatch } = props;
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/Report";

  const [loading, setLoading] = React.useState(false);
  const [signedUpEmailError, setSignedUpEmailError] = React.useState(false);
  const [signedUpPasswordError, setSignedUpPasswordError] = React.useState(false);
  const [confirmederror, setconfirmederror] = React.useState("");

  const Login = (email, password) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        
        dispatch(setAuthedUser(data.getIdToken()));
        runLogoutTimer(
          dispatch,
          new Date(data.getIdToken().payload.exp * 1000).getTime() -
            new Date().getTime()
        );
        console.log("from", from);
        navigate(from, { replace: true });
      },
      onFailure: (err) => {
        if(err.toString().includes("confirmed"))
        {
          
          setconfirmederror("PLease vist your mail and confirm your account");

        }
        else
        {
          setSignedUpPasswordError(true);
          setSignedUpEmailError(true);
        }
        setLoading(false);
        
        console.error("onFailure: ", err);
        
         
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      },
    });
  };

  return (
    <Formik
      initialValues={{ email: "PeterMagdyIskander@gmail.com", password: "Peter123" }}
      onSubmit={(values) => {
        setconfirmederror("")
        Login(values.email, values.password);
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
                helperText="Incorrect username or password"
                error={signedUpEmailError}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                component={MyField}
                error={signedUpPasswordError}
                helperText="Incorrect username or password"
              />
              <text>
                {confirmederror}
                </text>
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
export default connect()(SignInForm);
