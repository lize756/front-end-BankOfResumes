import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router";

//redux
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { addUserr, addPerson } from "../../store/slices/PersonSlice";
import { Collapse } from "@mui/material";
import { registerUser } from "../../store/slices/UserrSlice";

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
/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CoordUserRegister = () => {
  let navigate = useNavigate();

  const classes = useStyles();
  // Allow to send the elements of store
  const dispatch = useDispatch();
  // Allow to bring the email to one person
  const personStore = useSelector((state) => state.PersonSlice).person;
  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    alertMessages: [],
  });

  /**-------------------------------------------------------------
   * Handling the states of the attributes that make up a register
   * -------------------------------------------------------------
   */
  const [data, setData] = useState({
    userName: personStore.persEmail,
    userPassword: "",
    userPasswordR: "",
  });

  /*
   * ***************************************************
   * **********************Function*********************
   * ***************************************************
  /**
   * This function assigns the information completed by the user with its respective attribute.
   * attributes like: persName, persDocument, persEmail, persPhone,persPassword and persRPassword
   * @param {*} e
   */
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let listALerts = openAlert.alertMessages.map((item, index) => {
    return (
      <Alert severity="error" key={index} align="justify">
        {item}
      </Alert>
    );
  });

  const submit = (e) => {
    e.preventDefault();
    let userr = {};
    // Check if there is another person with the same username
    if (data.userName === "Oscar") {
      openAlert.isOpen = true;
      openAlert.alertMessages.push(
        "Ya hay otra persona que tiene esta dirección de correo electrónico. Prueba de nuevo con otro nombre de usuario"
      );
    } else {
      openAlert.isOpen = false;
    }
    //Check if the passwords were writed correctly
    if (data.userPassword !== data.userPasswordR) {
      openAlert.isOpen = true;
      data.userPassword = "";
      openAlert.alertMessages.push(
        "Las contraseñas no son las mismas. Prueba de nuevo"
      );
    } else {
      openAlert.isOpen = false;
    }

    openAlert.alertMessages.map((text) => console.log(text));
    if (!openAlert.isOpen) {
      console.log(!openAlert.isOpen);
      //setOpenAlert({ isOpen: false });
      openAlert.isOpen = false;
      //Correspond to information of the one userr
      userr = {
        userEmail: data.persEmail,
        userName: data.userName,
        userPassword: data.userPassword,
        person: personStore,
      }
      dispatch(registerUser(userr))
      navigate("/cedep/register/user_register");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={data.persEmail}
                label="Correo electrónico"
                name="userName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userPassword"
                label="Contraseña"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userPasswordR"
                label="Confirmar contraseña"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Aquí va una frase"
              />
            </Grid>
            <Grid item xs={12}>
              <Collapse in={openAlert.isOpen}>{listALerts}</Collapse>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Regresar
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Siguiente
            </Button>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default CoordUserRegister;
