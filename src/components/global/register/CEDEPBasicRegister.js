import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

/**
 * Import to redux
 */
import { useDispatch, useSelector } from "react-redux";
import { addperson, setPerson } from "../../store/slices/PersonSlice";
import {
  getCountries,
  getCitiesAssociatedToCountry,
} from "../../store/slices/CountrySlice";

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

const validationSchema = yup.object({
  persFirstName: yup.string("Ingresa tu nombre ").required("Campo obligatorio"),
  persLastName: yup
    .string("Ingresa tus apellidos ")
    .required("Campo obligatorio"),
  persDocument: yup
    .string("Ingresa tu número documento de identidad ")
    .required("Campo obligatorio"),
  persEmail: yup
    .string("Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),
  persAddress: yup
    .string("Ingresa tu dirección ")
    .required("Campo obligatorio"),
});

const CoordBasicRegister = () => {
  const classes = useStyles();
  // Allow navigate between roots
  let navigate = useNavigate();
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  //Correspond of list of countries saved in the store.
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  //Correspond of list of cities saved in the store.
  const listCities = useSelector((state) => state.CountrySlice.listCities);

  const [getPersonCountry, setPersonCountry] = useState({});
  const [getPersonCity, setPersonCity] = useState("");
  const [getPersGenre, setPersGenre] = useState("");
  //Correspond to list of gender that a person
  const listGender = ["MASCULINO", "FEMENINO", "OTRO"];

  //================================================= UseEffect ===================================================

  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getPersonCountry.name));
    }
  }, [getPersonCountry]);

  //=================================================FORMIK===================================================

  const formik = useFormik({
    initialValues: {
      persFirstName: "",
      persLastName: "",
      persDocument: "",
      persEmail: "",
      persAddress: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      values.persGenre = getPersGenre;
      values.persCityName = getPersonCity;
      values.persCountryName = getPersonCountry.name;
      //alert(JSON.stringify(values, null, 2));
      //console.log(values);
      dispatch(addperson(values));
      navigate("/cedep/register/user_register");
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="persFirstName"
                variant="outlined"
                fullWidth
                label="Nombres"
                autoFocus
                value={formik.values.persFirstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.persFirstName &&
                  Boolean(formik.errors.persFirstName)
                }
                helperText={
                  formik.touched.persFirstName && formik.errors.persFirstName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Apellidos"
                name="persLastName"
                value={formik.values.persLastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.persLastName &&
                  Boolean(formik.errors.persLastName)
                }
                helperText={
                  formik.touched.persLastName && formik.errors.persLastName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Cédula"
                name="persDocument"
                value={formik.values.persDocument}
                onChange={formik.handleChange}
                error={
                  formik.touched.persDocument &&
                  Boolean(formik.errors.persDocument)
                }
                helperText={
                  formik.touched.persDocument && formik.errors.persDocument
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="combo-box-persGenre"
                disablePortal
                value={getPersGenre}
                options={listGender}
                onChange={(event, value) => setPersGenre(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Género"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                label="Correo electrónico"
                name="persEmail"
                value={formik.values.persEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.persEmail && Boolean(formik.errors.persEmail)
                }
                helperText={formik.touched.persEmail && formik.errors.persEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                // List of countries
                options={listCountries}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setPersonCountry(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su país"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",

                      required: getPersonCountry === {},
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                //List of cities
                options={listCities}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option}
                /**
                 * Allows send the select object to variable CompCity that correspond the element select
                 */
                onChange={(event, value) => setPersonCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
                    variant="outlined"
                    required
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setPersonCity(e.target.value)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Dirección"
                name="persAddress"
                value={formik.values.persAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.persAddress &&
                  Boolean(formik.errors.persAddress)
                }
                helperText={
                  formik.touched.persAddress && formik.errors.persAddress
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Siguiente
          </Button>
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

export default CoordBasicRegister;
