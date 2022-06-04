import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Paper,
  TextField,
  Button,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/PersonPin";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";
/**
 * -------------------------------------------------
 * ------------------REDUX -------------------------
 * -------------------------------------------------
 */
import { useDispatch, useSelector } from "react-redux";
import { updatePartiallyPerson} from "../../../store/slices/PersonSlice";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../../store/slices/CountrySlice";
import CorrectUpdateOrDeletejs from "../../alert/CorrectUpdateOrDelete";

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
const ProfileGeneral = () => {
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
  // Verified if the user to deploy a alert.
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);
  // Correspond to type of alert
  const typeAlert = useSelector((state) => state.AlertSlice.typeAlert);
  //Correspond of list of countries saved in the store.
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  //Correspond of list of cities saved in the store.
  const listCities = useSelector((state) => state.CountrySlice.listCities);

  // Get person id of the store
  const personStore = useSelector((state) => state.PersonSlice.person);

  const listGender = ["MASCULINO", "FEMENINO", "OTRO"];

  const [getPersGenre, setPersGenre] = useState("MASCULINO");
  const [getPersonCountry, setPersonCountry] = useState({});
  const [getPersonCity, setPersonCity] = useState("");
  const formik = useFormik({
    initialValues: {
      persId: personStore.persId,
      persFirstName: personStore.persFirstName,
      persLastName: personStore.persLastName,
      persDocument: personStore.persDocument,
      persEmail: personStore.persEmail,
      persAddress: personStore.persAddress,
      persGenre: personStore.persGenre,
      persCountryName: personStore.persCountryName,
      persCityName: personStore.persCityName,
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const personProfile = values;
      personProfile.persGenre= getPersGenre === "" ? personStore.persGenre : getPersGenre;
      personProfile.persCountryName =
        Object.keys(getPersonCountry).length === 0
          ? personStore.persCountryName
          : getPersonCountry.name;
      personProfile.persCityName =
        getPersonCity === undefined ? personStore.persCityName : getPersonCity;

      dispatch(updatePartiallyPerson(ACCESS_TOKEN, personProfile.persId, personProfile));
    },
  });
  /**
   * This used effect allow display the list of countries associated a country particular
   */
  useEffect(() => {
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getPersonCountry.name));
    }
  }, [getPersonCountry]);

  /**
   * This used effect allow load the default list of countries and cities
   */
  useEffect(() => {
    console.log(personStore)
    dispatch(getCountries());
    dispatch(getCitiesAssociatedToCountry(personStore.persCountryName));
    setPersonCity(personStore.compCityName);
  }, [personStore !== undefined]);

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
        typeAlert === "1" ? <CorrectUpdateOrDeletejs /> : <></>;
    }
    return componentToDisplay;
  };

  return (
    <div>
      {displayAlert()}
      <Paper sx={{ mt: 2, ml: 5, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <PersonIcon
            sx={{ color: green[500], width: 65, height: 65, ml: 5, mt: 1 }}
          />

          <Box md={6}>
            <Typography
              mt={2}
              ml={2}
              variant="h6"
              sx={{ fontWeight: "medium", color: "#072079" }}
            >
              {formik.values.persFirstName + " " + formik.values.persLastName}
            </Typography>
            <Typography
              ml={2}
              mb={2}
              variant="subtitle2"
              sx={{ color: "#072079" }}
            >
              Editar Perfil
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2} mx={1}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Nombres"
                name="persFirstName"
                variant="standard"
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
            </Grid>{" "}
            <Grid item xs={6}>
              <TextField
                label="Apellidos"
                sx={{ width: "85%" }}
                name="persLastName"
                variant="standard"
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
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Documento de identidad"
                name="persDocument"
                variant="standard"
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
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                type="email"
                label="Correo electrónico"
                name="persEmail"
                variant="standard"
                value={formik.values.persEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.persEmail && Boolean(formik.errors.persEmail)
                }
                helperText={formik.touched.persEmail && formik.errors.persEmail}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                id="combo-box-persGenre"
                disablePortal
                defaultValue={formik.values.persGenre}
                options={listGender}
                onChange={(event, value) => setPersGenre(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Género"
                    variant="standard"
                    error={getPersGenre === null}
                    helperText={
                      getPersGenre === null ? "Elemento requerido" : ""
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                freeSolo
                disableClearable
                id="autocomplete-persCountry"
                defaultValue={{ name: formik.values.persCountryName }}
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
                    variant="standard"
                    required
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                freeSolo
                disableClearable
                id="autocomplete-persCity"
                //List of cities
                options={listCities}
                defaultValue={formik.values.persCityName}
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
                    variant="standard"
                    required
                    error={getPersonCity === ""}
                    helperText={
                      getPersonCity === "" ? "Elemento requerido" : ""
                    }
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setPersonCity(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ my: 4, ml: 4 }}
            variant="contained"
            startIcon={<SaveIcon />}
            type="submit"
          >
            Guardar
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ProfileGeneral;
