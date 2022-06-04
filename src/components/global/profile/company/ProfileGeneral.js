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
import { updateCompany } from "../../../store/slices/CompanySlice";
import {
  getCitiesAssociatedToCountry,
  getCountries,
} from "../../../store/slices/CountrySlice";
import CorrectUpdateOrDeletejs from "../../alert/CorrectUpdateOrDelete";

const validationSchema = yup.object({
  compName: yup
    .string("Ingrese el nombre de la empresa ")
    .required("Campo obligatorio"),
  compNit: yup
    .string("Ingrese el Nit de la compañia ")
    .required("Campo obligatorio"),

  compEmail: yup
    .string("Ingrese el correo electrónico de la compañia")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),
  compAddress: yup
    .string("Ingrese la dirección de la compañia ")
    .required("Campo obligatorio"),
  compTelephone: yup
    .string("Ingrese el teléfono de la compañia ")
    .required("Campo obligatorio"),
  compEcoActiv: yup
    .string("Ingrese la actividad económica de la compañia ")
    .required("Campo obligatorio"),
  compType: yup
    .string("Ingrese el tipo de compañia ")
    .required("Campo obligatorio"),
  compUrlAddress: yup
    .string("Ingrese la dirección de la página web de la compañia ")
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
  const companyStore = useSelector((state) => state.CompanySlice.company);

  const [getCompCountry, setCompCountry] = useState({});
  const [getCompCity, setCompCity] = useState("");

  const formik = useFormik({
    initialValues: {
      compId: companyStore.compId,
      compAddress: companyStore.compAddress,
      compEcoActiv: companyStore.compEcoActiv,
      compEmail: companyStore.compEmail,
      compIcesiStud: companyStore.compIcesiStud,
      compName: companyStore.compName,
      compNit: companyStore.compNit,
      compTelephone: companyStore.compTelephone,
      compType: companyStore.compType,
      compUrlAddress: companyStore.compUrlAddress,
      compCityName: companyStore.compCityName,
      compCountryName: companyStore.compCountryName,
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const profile = values;
      profile.compCountryName =
        Object.keys(getCompCountry).length === 0
          ? companyStore.compCountryName
          : getCompCountry.name;
      profile.compCityName =
        getCompCity === undefined ? companyStore.compCityName : getCompCity;
      //alert(JSON.stringify(values, null, 2));
      dispatch(updateCompany(ACCESS_TOKEN, profile.compId, profile));
    },
  });

  /**
   * This used effect allow display the list of countries associated a country particular
   */
  useEffect(() => {
    if (listCountries.length > 0) {
      dispatch(getCitiesAssociatedToCountry(getCompCountry.name));
    }
  }, [getCompCountry]);

  /**
   * This used effect allow load the default list of countries and cities
   */
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCitiesAssociatedToCountry(companyStore.compCountryName));
    console.log(companyStore !== undefined);
    setCompCity(companyStore.compCityName);
  }, [companyStore !== undefined]);

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
              {formik.values.compName}
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
      </Paper>{" "}
      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2} mx={1}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Nombre compañÍa"
                name="compName"
                value={formik.values.compName}
                onChange={formik.handleChange}
                error={
                  formik.touched.compName && Boolean(formik.errors.compName)
                }
                helperText={formik.touched.compName && formik.errors.compName}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Nit de la  compañÍa"
                sx={{ width: "85%" }}
                name="compNit"
                value={formik.values.compNit}
                onChange={formik.handleChange}
                error={formik.touched.compNit && Boolean(formik.errors.compNit)}
                helperText={formik.touched.compNit && formik.errors.compNit}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                type="email"
                label="Correo electrónico"
                name="compEmail"
                value={formik.values.compEmail}
                onChange={formik.handleChange}
                error={
                  formik.touched.compEmail && Boolean(formik.errors.compEmail)
                }
                helperText={formik.touched.compEmail && formik.errors.compEmail}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Dirección"
                name="compAddress"
                value={formik.values.compAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.compAddress &&
                  Boolean(formik.errors.compAddress)
                }
                helperText={
                  formik.touched.compAddress && formik.errors.compAddress
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                type="tel"
                label="Teléfono"
                name="compTelephone"
                value={formik.values.compTelephone}
                onChange={formik.handleChange}
                error={
                  formik.touched.compTelephone &&
                  Boolean(formik.errors.compTelephone)
                }
                helperText={
                  formik.touched.compTelephone && formik.errors.compTelephone
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Dirección URL"
                type="url"
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
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                sx={{ width: "85%" }}
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                defaultValue={{ name: companyStore.compCountryName }}
                // List of countries
                options={listCountries}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setCompCountry(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su país"
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
                id="free-solo-2-demo"
                //List of cities
                options={listCities}
                defaultValue={companyStore.compCityName}
                /**
                 * This property allows to show in the user's view the property that we want to take from the object.
                 * Such as: If we need show the name of the country then we ask the property of the object that correspond the name
                 */
                getOptionLabel={(option) => option}
                /**
                 * Allows send the select object to variable CompCity that correspond the element select
                 */
                onChange={(event, value) => setCompCity(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione su ciudad"
                    required
                    error={getCompCity === ""}
                    helperText={getCompCity === "" ? "Elemento requerido" : " "}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    onChange={(e) => setCompCity(e.target.value)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                label="Actividad económica de la compañía"
                multiline
                rows={2}
                name="compEcoActiv"
                value={formik.values.compEcoActiv}
                onChange={formik.handleChange}
                error={
                  formik.touched.compEcoActiv &&
                  Boolean(formik.errors.compEcoActiv)
                }
                helperText={
                  formik.touched.compEcoActiv && formik.errors.compEcoActiv
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ width: "85%" }}
                type="tel"
                label="Tipo de compañía"
                multiline
                rows={2}
                name="compType"
                value={formik.values.compType}
                onChange={formik.handleChange}
                error={
                  formik.touched.compType && Boolean(formik.errors.compType)
                }
                helperText={formik.touched.compType && formik.errors.compType}
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
