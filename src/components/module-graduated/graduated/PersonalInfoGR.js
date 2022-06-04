import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getCitiesAssociatedToCountry } from "../../store/slices/CountrySlice";
import { updateperson } from "../../store/slices/PersonSlice";
/**
 * Styles of the visual part of the component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },

    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const validationSchema = yup.object({
  firstName: yup.string("Escribe tu nombre").required("Campo requerido"),
  lastName: yup.string("Escribe tus apellidos").required("Campo requerido"),
  documentNumber: yup
    .string("Escribe tu número de identificación")
    .required("Campo requerido"),
  phone: yup
    .string("Escribe tu teléfono principal")
    .required("Campo requerido"),
  email: yup
    .string("Escribe tu correo electrónico")
    .email("Ingresa un correo electrónico valido")
    .required("Campo requerido"),
  age: yup.number("Escribe tu Edad").required("Campo requerido"),
});

/**
 * =============================================== Start of lists===========================================
 * */
const typeDocument = [
  "Cédula",
  "Cédula de Extranjería",
  "Pasaporte",
  "Tarjeta de Identidad",
  "Sin definir",
];

const genre = ["Femenino", "Masculino", "No Binario", "Otro"];
const civilStatus = [
  "Casado(a)",
  "Soltero(a)",
  "Unión Libre",
  "Divorciado(a)",
  "Viudo(a)",
];

const ethnicGroup = [
  "Sin pertenencia étnica",
  "Afrocolombiano",
  "Indígena",
  "Raizal",
  "Palenquero",
  "Gitano",
];

/**
 * =============================================== End lists===========================================
 * */

const PersonalInfoGR = () => {
  const classes = useStyles();
  const [getTypeDocument, setTypeDocument] = useState("");

  const [getGenre, setGenre] = useState("");
  const [getCivilStatus, setCivilStatus] = useState("");
  const [getCountry, setCountry] = useState({});
  const [getCity, setCity] = useState("");

  const [getDisability, setDisability] = useState(false);
  const [getEthnicGroup, setEthnicGroup] = useState("");

  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */

  // Allow to send the elements of store
  const dispatch = useDispatch();

  // Get person saved of the store
  //const currentCurriculum = useSelector((state) => state.PersonSlice.person);
  // Get currentCurriculum o
  const currentCurriculum = useSelector((state) => state.CurriculumSlice.Curriculum);

  //Correspond of list of countries saved in the store.
  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  //Correspond of list of cities saved in the store.
  const listCities = useSelector((state) => state.CountrySlice.listCities);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  /**
   * ==================================================================
   * ===========================useEffect===============================
   * ==================================================================
   */

  useEffect(() => {
    if (currentCurriculum) {
      setDisability(currentCurriculum.persIsDisability);
    }
  }, []);

  /**
   * This used effect allow display the list of countries associated a country particular
   */
   useEffect(() => {
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCountry.name));
    }
  }, [getCountry]);

  /**
   * ---------------------------End useEffect-----------------------------
   */

  /**
   * ==================================================================
   * =========================== Formik ===============================
   * ==================================================================
   */

  const formik = useFormik({
    // Corresponds to the basic information of a person
    initialValues: {
      _id: currentCurriculum._id,
      firstName: currentCurriculum.firstName,
      lastName: currentCurriculum.lastName,
      typeOfDocument: currentCurriculum.typeOfDocument,
      documentNumber: currentCurriculum.documentNumber,
      gender: currentCurriculum.gender,
      countryName: currentCurriculum.countryName,
      cityName: currentCurriculum.cityName,
      maritalStatus: currentCurriculum.maritalStatus,
      phone: currentCurriculum.phone,
      email: currentCurriculum.email,
      birthDate: "",
      age: currentCurriculum.age,
      ethnicGroup: currentCurriculum.ethnicGroup,
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const personalInfo = values;

      /**
       * This line allow formatter of elements that the user write in the user interface
       * for the format to be accepted by the database
       */
      /**
       * Formatted dates
       */
      const [year, month, day] = personalInfo.birthDate.split("-");
      // Verified that date have the size of default
      const formattedStDate =
        personalInfo.birthDate.length !==
        currentCurriculum.birthDate.length
          ? currentCurriculum.birthDate
          : day + "/" + month + "/" + year;
      personalInfo.typeOfDocument =
        personalInfo.typeOfDocument !== ""
          ? personalInfo.typeOfDocument
          : getTypeDocument;
      personalInfo.birthDate = formattedStDate;
      personalInfo.gender =
        personalInfo.gender !== "" ? personalInfo.gender : getGenre;
      personalInfo.maritalStatus =
        personalInfo.maritalStatus !== ""
          ? personalInfo.maritalStatus
          : getCivilStatus;
      personalInfo.countryName =
        getCountry.name !== "" ? getCountry.name : personalInfo.countryName;
      personalInfo.cityName =
        getCity !== "" ? getCity : personalInfo.cityName;
      personalInfo.persIsDisability = getDisability;
      personalInfo.ethnicGroup =
        getEthnicGroup !== "" ? getEthnicGroup : personalInfo.ethnicGroup;

      console.log(personalInfo);
      //   alert(JSON.stringify(personalInfo, null, 2));
      // Send the information to the store and send to backend
      dispatch(updateperson(ACCESS_TOKEN, personalInfo.persId, personalInfo));
      // Reset date of birth
      personalInfo.birthDate = "";
    },
  });

  /**
   * =========================== end Formik ===========================
   */

 

  /**
   * ==================================================================
   * =========================== Functions ============================
   * ==================================================================
   */

  /**
   * This function is responsible for converting the
   * date loaded from the database to the format needed by textfield date
   * @returns  date in correct format
   */
  const getDefaultDate = () => {
  //  const [day, month, year] = currentCurriculum.birthDate;
    return currentCurriculum.birthDat;
  };

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mr={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="firstName"
              label="Nombres"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName &&
                Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName && formik.errors.firstName
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="lastName"
              label="Apellidos"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={
                formik.touched.lastName &&
                Boolean(formik.errors.lastName)
              }
              helperText={
                formik.touched.lastName && formik.errors.lastName
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              defaultValue={formik.values.typeOfDocument}
              id="combo-box-demo"
              options={typeDocument}
              onChange={(e, value) => setTypeDocument(value)}
              renderInput={(params) => (
                <TextField {...params} label="Tipo de Documento" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="documentNumber"
              label="Número documento"
              value={formik.values.documentNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.documentNumber &&
                Boolean(formik.errors.documentNumber)
              }
              helperText={
                formik.touched.documentNumber && formik.errors.documentNumber
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="birthDate"
              type="date"
              label="Fecha de nacimiento"
              defaultValue={getDefaultDate()}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              defaultValue={formik.values.gender}
              id="combo-box-demo"
              options={genre}
              onChange={(e, value) => setGenre(value)}
              renderInput={(params) => (
                <TextField {...params} label="Género" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              defaultValue={formik.values.maritalStatus}
              disablePortal
              id="combo-box-demo"
              options={civilStatus}
              onChange={(e, value) => setCivilStatus(value)}
              renderInput={(params) => (
                <TextField {...params} label="Estado civil" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-countryName"
              disableClearable
              defaultValue={{ name: formik.values.countryName }}
              /**
               * List of cities
               */
              options={listCountries}
              /**
               * This property allows to show in the user's view the property that we want to take from the object.
               * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
               */
              getOptionLabel={(option) => option.name}
              /**
               * Allows send the select object to variable CompCity that correspond the element select
               */
              onChange={(event, value) => setCountry(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccione su país"
                  variant="outlined"
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
              freeSolo
              id="free-solo-cityName"
              defaultValue={formik.values.cityName}
              disableClearable
              /**
               * List of cities
               */
              options={listCities}
              /**
               * This property allows to show in the user's view the property that we want to take from the object.
               * Such as: If we need show the name of the city then we ask the property of the object that correspond the name
               */
              getOptionLabel={(option) => option}
              /**
               * Allows send the select object to variable City that correspond the element select
               */
              onChange={(event, value) => setCity(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccione la ciudad"
                  variant="outlined"
                  required
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                  onChange={(e) => setCity(e.target.value)}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="phone"
              label="Número de Teléfono"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={
                formik.touched.phone && Boolean(formik.errors.phone)
              }
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="age"
              label="Edad"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={ethnicGroup}
              defaultValue={formik.values.ethnicGroup}
              onChange={(e, value) => setEthnicGroup(value)}
              renderInput={(params) => (
                <TextField {...params} label="Grupo étnico" required />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Correo Electrónico"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultValue={true}
                  checked={getDisability}
                  onChange={(event) => {
                    setDisability(event.target.checked);
                  }}
                />
              }
              label="¿Presenta situación de discapacidad?"
            />
          </Grid>
        </Grid>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Siguiente.
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoGR;
