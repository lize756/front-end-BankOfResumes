import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../../store/slices/CountrySlice";
import { addCompany, setCompany } from "../../../store/slices/CompanySlice";
import { setAccordinRegisterPanelValue } from "../../../store/slices/CompanySlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: theme.spacing(2),

    "& .MuiAutocomplete-root": {
      width: "100%",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
    "&  .MuiFormLabel-root": {
      alignItems: "left",
    },
  },
}));

const validationSchema = yup.object({
  compName: yup
    .string("Ingresa el nombre de la compañía")
    .required("Campo obligatorio"),
  compNit: yup
    .string("Ingresa el NIT de la compañía")
    .required("Campo obligatorio"),
  compEcoActiv: yup
    .string("Ingresa la actividad económica  de la compañía")
    .required("Campo obligatorio"),
  compEmail: yup
    .string("Ingresa el correo electrónico de la compañía")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),
  compTelephone: yup
    .string("Ingresa teléfono de la compañía")
    .required("Campo obligatorio"),
  compType: yup
    .string("Ingresa el tipo de compañía")
    .required("Campo obligatorio"),
  compAddress: yup
    .string("Ingresa la dirección de la compañía")
    .required("Campo obligatorio"),
  compUrlAddress: yup
    .string("Ingresa la URL la página de la compañía")
    .required("Campo obligatorio"),
});

/**
 *
 * @param {*} propsWithAccordion Represent the property that the component called accordion has.
 * @param {*} isRendered Represent
 * @returns
 */
const RegistrationBasicCompanyData = () => {
  /**
   * ---------------------------------------------------------
   * -------------------------REDUX-----------------------
   * ---------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const listCountries = useSelector(
    (state) => state.CountrySlice.listCountries
  );
  const listCities = useSelector((state) => state.CountrySlice.listCities);

  /**
   * ---------------------------------------------------------
   * -------------------------CONSTANTS-----------------------
   * ---------------------------------------------------------
   */
  const classes = useStyles();
  // create state variables for each input

  const [getCompCountry, setCompCountry] = useState("");
  const [getCompCity, setCompCity] = useState("");
  const [getCompIcesiStud, setCompIcesiStud] = useState("F");

  /**
   * ----------------------------------------------------------
   * --------------------------Functions-----------------------
   * ----------------------------------------------------------
   */

  /**
   * Constructor of the company
   * @param {*} compName  Name of the company
   * @param {*} compNit Nit of the company
   * @param {*} compCity  City where the company is
   * @param {*} compAddress Address where the company is
   * @param {*} compEcoActiv  Economy activity where the company is
   * @param {*} compUrlAddress Url Address of the company
   * @param {*} compType Type of company
   * @param {*} compIcesiStud Verify if the company recuitred colleged students
   */
  //================================================= UseEffect ===================================================

  // GET request using axios inside useEffect React hook
  useEffect(() => {
    dispatch(getCountries());
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCompCountry.name));
    }
  }, [getCompCountry]);

  const formik = useFormik({
    initialValues: {
      compAddress: "",
      compEcoActiv: "",
      compEmail: "",
      compName: "",
      compNit: "",
      compTelephone: "",
      compType: "",
      compUrlAddress: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      values.compIcesiStud = getCompIcesiStud;
      values.compCountryName = getCompCountry.name;
      values.compCityName = getCompCity;

      console.log(values);

      //alert(JSON.stringify(values, null, 2));
      dispatch(addCompany(values));
      dispatch(setAccordinRegisterPanelValue("panel2"));
    },
  });

  /**
   * -----------------------------------------------------
   * ---------------Return of the component --------------
   * -----------------------------------------------------
   */
  return (
    <>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
          label="Nombre de la Empresa"
          variant="outlined"
          name="compName"
          value={formik.values.compName}
          onChange={formik.handleChange}
          error={formik.touched.compName && Boolean(formik.errors.compName)}
          helperText={formik.touched.compName && formik.errors.compName}
        />
        <TextField
          label="NIT"
          variant="outlined"
          name="compNit"
          value={formik.values.compNit}
          onChange={formik.handleChange}
          error={formik.touched.compNit && Boolean(formik.errors.compNit)}
          helperText={formik.touched.compNit && formik.errors.compNit}
        />
        <TextField
          label="Dirección de la Empresa"
          variant="outlined"
          name="compAddress"
          value={formik.values.compAddress}
          onChange={formik.handleChange}
          error={
            formik.touched.compAddress && Boolean(formik.errors.compAddress)
          }
          helperText={formik.touched.compAddress && formik.errors.compAddress}
        />

        <TextField
          label="Actividad Económica"
          variant="outlined"
          name="compEcoActiv"
          value={formik.values.compEcoActiv}
          onChange={formik.handleChange}
          error={
            formik.touched.compEcoActiv && Boolean(formik.errors.compEcoActiv)
          }
          helperText={formik.touched.compEcoActiv && formik.errors.compEcoActiv}
        />

        <TextField
          label="Email"
          variant="outlined"
          name="compEmail"
          value={formik.values.compEmail}
          onChange={formik.handleChange}
          error={formik.touched.compEmail && Boolean(formik.errors.compEmail)}
          helperText={formik.touched.compEmail && formik.errors.compEmail}
        />

        <TextField
          label="Tipo de Empresa"
          variant="outlined"
          name="compType"
          value={formik.values.compType}
          onChange={formik.handleChange}
          error={formik.touched.compType && Boolean(formik.errors.compType)}
          helperText={formik.touched.compType && formik.errors.compType}
        />

        <TextField
          label="Número telefonico"
          variant="outlined"
          name="compTelephone"
          value={formik.values.compTelephone}
          onChange={formik.handleChange}
          error={
            formik.touched.compTelephone && Boolean(formik.errors.compTelephone)
          }
          helperText={
            formik.touched.compTelephone && formik.errors.compTelephone
          }
        />
        <TextField
          label="Dirección URL de pagina Web"
          variant="outlined"
          name="compUrlAddress"
          value={formik.values.compUrlAddress}
          onChange={formik.handleChange}
          error={
            formik.touched.compUrlAddress &&
            Boolean(formik.errors.compUrlAddress)
          }
          helperText={
            formik.touched.compUrlAddress && formik.errors.compUrlAddress
          }
        />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
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
          onChange={(event, value) => setCompCountry(value)}
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
              //={(e,value) => setCompCity()}
            />
          )}
        />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
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
           * Allows send the select object to variable CompCity that correspond the element select
           */
          onChange={(event, value) => setCompCity(value)}
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
              onChange={(e) => setCompCity(e.target.value)}
              //={(e,value) => setCompCity()}
            />
          )}
        />
        <FormControl required="true">
          <FormLabel id="demo-row-radio-buttons-group-label">
            {" "}
            ¿La empresa ha vinculado estudiantes en práctica de Icesi?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="T"
              control={<Radio required="true" />}
              label="Si"
              onChange={(e) => setCompIcesiStud(e.target.value)}
            />
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="No"
              onChange={(e) => setCompIcesiStud(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Guardar información.
          </Button>
        </div>
      </form>
    </>
    // Get request.
  );
};

export default RegistrationBasicCompanyData;
