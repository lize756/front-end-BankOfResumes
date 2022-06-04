import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import banner_cedep from "../../../assets/img_login.png";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  sendToken,
} from "../../../components/store/slices/SignIn/LoginSlice";
import { LoadingLogin } from "./LoadingLogin";
// Formik
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteAlert from "../../global/alert/DeleteAlert";
import CorrectUpdateOrDeletejs from "../../global/alert/CorrectUpdateOrDelete";
import { setShowAlert } from "../../store/slices/AlertSlice";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const validationSchema = yup.object({
  userName: yup
    .string("Digita tu correo electrónico")
    .email("Ingresa un correo electrónico válido")
    .required("El correo electrónico es requerido"),
  userPassword: yup
    .string("Por favor ingresé su contraseña")
    .required("La contraseña es requerida"),
  // .matches(
  //   /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //   "Debe contener al menos 8 caracteres, una mayúscula, una minúscula, y un número"
  // ),
});

const theme = createTheme();

export default function SignInSide() {
  // Allow to send the elements of store
  const dispatch = useDispatch();

  // This element allow change between the original component of login to the circular progress
  const [isChangeViewLoading, setIsChangeViewLoading] = React.useState(false);

  const isLogin = useSelector((state) => state.userLogin.isLogin);

  // Verified if the user to deploy a alert.
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);
  // Correspond to type of alert
  const typeAlert = useSelector((state) => state.AlertSlice.typeAlert);

  const loginUser = {
    userName: "",
    userPassword: "",
  };

  //------------Handlechange functions-------------------------------

  const formik = useFormik({
    initialValues: loginUser,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user = values;
      dispatch(sendToken(user));
    },
  });

  React.useEffect(() => {
    if (isShowAlert) {
      
    }
  }, [isShowAlert]);

  React.useEffect(() => {
    if (isLogin) {
      setIsChangeViewLoading(true);
    } else {
      setTimeout(() => {
        setIsChangeViewLoading(false);
      }, [2000]);
    }
  }, [isLogin]);

  function viewLogin() {
    return (
      <>
        <TextField
          autoFocus
          margin="normal"
          required
          fullWidth
          id="userName"
          name="userName"
          autocomplete
          type="email"
          label="Dirección de correo electrónico"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="userPassword"
          label="Contraseña"
          type="password"
          id="userPassword"
          autoComplete="current-password"
          value={formik.values.userPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.userPassword && Boolean(formik.errors.userPassword)
          }
          helperText={formik.touched.userPassword && formik.errors.userPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </Button>
      </>
    );
  }

  /**
   * This method allows an alert to be displayed on the screen according to the type of alert specified.
   * If the alert is to accept or reach, the type is '0',
   * otherwise it is just a notification message, the type is '1'
   * @returns
   */
  const displayAlert = () => {
    let componentToDisplay = <></>;
    if (isShowAlert) {
      //Display alert dialog or snackbark
      componentToDisplay =
        typeAlert === "0" ? (
          <DeleteAlert />
        ) : typeAlert === "1" ? (
          <CorrectUpdateOrDeletejs />
        ) : (
          <></>
        );
    }
    return componentToDisplay;
  };

  return (
    <>
      {displayAlert()}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(" + banner_cedep + ")",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ borderRadius: "0%" }}
          >
            <Box
              sx={{
                my: 20,
                mx: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "Blue" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ m: 2 }}>
                Iniciar sesión
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                {/**isChangeViewLoading ? viewLoading() : viewLogin()*/}
                {isChangeViewLoading ? <LoadingLogin /> : viewLogin()}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {"¿Olvidó su contraseña?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signIn/typeRegister" variant="body2">
                      {"¿No tienes una cuenta?  Cree una."}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
