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
  persFirstName: yup.string("Escribe tu nombre").required("Campo requerido"),
  persLastName: yup.string("Escribe tus apellidos").required("Campo requerido"),
  persDocument: yup
    .string("Escribe tu número de identificación")
    .required("Campo requerido"),
  persPhone: yup
    .string("Escribe tu teléfono principal")
    .required("Campo requerido"),
  persEmail: yup
    .string("Escribe tu correo electrónico")
    .email("Ingresa un correo electrónico valido")
    .required("Campo requerido"),
  persAge: yup.number("Escribe tu Edad").required("Campo requerido"),
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
  const currentPerson = useSelector((state) => state.PersonSlice.person);

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
    if (currentPerson) {
      setDisability(currentPerson.persIsDisability);
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
      persId: currentPerson.persId,
      persFirstName: currentPerson.persFirstName,
      persLastName: currentPerson.persLastName,
      persDocumentType: currentPerson.persDocumentType,
      persDocument: currentPerson.persDocument,
      persGenre: currentPerson.persGenre,
      persCountryName: currentPerson.persCountryName,
      persCityName: currentPerson.persCityName,
      persMaritalStatus: currentPerson.persMaritalStatus,
      persPhone: currentPerson.persPhone,
      persEmail: currentPerson.persEmail,
      persDateOfBirth: "",
      persAge: currentPerson.persAge,
      persEthnicGroup: currentPerson.persEthnicGroup,
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
      const [year, month, day] = personalInfo.persDateOfBirth.split("-");
      // Verified that date have the size of default
      const formattedStDate =
        personalInfo.persDateOfBirth.length !==
        currentPerson.persDateOfBirth.length
          ? currentPerson.persDateOfBirth
          : day + "/" + month + "/" + year;
      personalInfo.persDocumentType =
        personalInfo.persDocumentType !== ""
          ? personalInfo.persDocumentType
          : getTypeDocument;
      personalInfo.persDateOfBirth = formattedStDate;
      personalInfo.persGenre =
        personalInfo.persGenre !== "" ? personalInfo.persGenre : getGenre;
      personalInfo.persMaritalStatus =
        personalInfo.persMaritalStatus !== ""
          ? personalInfo.persMaritalStatus
          : getCivilStatus;
      personalInfo.persCountryName =
        getCountry.name !== "" ? getCountry.name : personalInfo.persCountryName;
      personalInfo.persCityName =
        getCity !== "" ? getCity : personalInfo.persCityName;
      personalInfo.persIsDisability = getDisability;
      personalInfo.persEthnicGroup =
        getEthnicGroup !== "" ? getEthnicGroup : personalInfo.persEthnicGroup;

      console.log(personalInfo);
      //   alert(JSON.stringify(personalInfo, null, 2));
      // Send the information to the store and send to backend
      dispatch(updateperson(ACCESS_TOKEN, personalInfo.persId, personalInfo));
      // Reset date of birth
      personalInfo.persDateOfBirth = "";
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
    const [day, month, year] = currentPerson.persDateOfBirth.split("/");
    return year + "-" + month + "-" + day;
  };

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mr={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="persFirstName"
              label="Nombres"
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="persLastName"
              label="Apellidos"
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
            <Autocomplete
              fullWidth
              disablePortal
              defaultValue={formik.values.persDocumentType}
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
              name="persDocument"
              label="Número documento"
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
              fullWidth
              required
              name="persDateOfBirth"
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
              defaultValue={formik.values.persGenre}
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
              defaultValue={formik.values.persMaritalStatus}
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
              id="free-solo-persCountryName"
              disableClearable
              defaultValue={{ name: formik.values.persCountryName }}
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
              id="free-solo-persCityName"
              defaultValue={formik.values.persCityName}
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
              name="persPhone"
              label="Número de Teléfono"
              value={formik.values.persPhone}
              onChange={formik.handleChange}
              error={
                formik.touched.persPhone && Boolean(formik.errors.persPhone)
              }
              helperText={formik.touched.persPhone && formik.errors.persPhone}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              name="persAge"
              label="Edad"
              value={formik.values.persAge}
              onChange={formik.handleChange}
              error={formik.touched.persAge && Boolean(formik.errors.persAge)}
              helperText={formik.touched.persAge && formik.errors.persAge}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={ethnicGroup}
              defaultValue={formik.values.persEthnicGroup}
              onChange={(e, value) => setEthnicGroup(value)}
              renderInput={(params) => (
                <TextField {...params} label="Grupo étnico" required />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="persEmail"
              label="Correo Electrónico"
              type="email"
              value={formik.values.persEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.persEmail && Boolean(formik.errors.persEmail)
              }
              helperText={formik.touched.persEmail && formik.errors.persEmail}
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
