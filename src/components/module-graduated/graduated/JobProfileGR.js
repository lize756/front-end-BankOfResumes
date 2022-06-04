import React, { useState } from "react";
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
/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { addCurriculum, setCurriculum } from "../../store/slices/CurriculumSlice";
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
  currDescription: yup
    .string("Escribe una descripción de tu perfil")
    .required("Campo requerido"),
});

const experience = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

const wage = [
  "Menos de $1",
  "$1,5 a $2",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$5,5 a $6",
  "$6 a $8",
  "$8 a $10",
  "$10 a $12,5",
  "$12,5 a $15",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
];

const JobProfileGR = () => {
  const classes = useStyles();
  const [getYearsExperience, setYearsExperience] = useState("");
  const [getWage, setWage] = useState("");
  const [getLaborMobility, setLaborMobility] = useState(false);
  const [careers, setCareers] = useState("");

  /**
   * -----------------------------------------------------------------
   * ------------------------Redux------------------------------------
   * -----------------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  const list_carreers = useSelector((state) => state.CareerSlice.listCareers);
//Get acces_token of the user that start section
const ACCESS_TOKEN =
"Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  //================================================= Functions ===================================================

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    setCareers(value);
    const listCrs = [];
    for (let i = 0; i < value.length; i++) {
      listCrs.push(value[i]);
      setCareers(listCrs);
    }
  };
  const formik = useFormik({
    initialValues: {
      currDescription: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const jobProfileGraduated = values;
      jobProfileGraduated.currCreateDate = new Date().toLocaleDateString();
      jobProfileGraduated.currSalary = getWage;
      jobProfileGraduated.currExperience = getYearsExperience;
      jobProfileGraduated.careers = careers;
      jobProfileGraduated.currIsLaborMobility = getLaborMobility;

     // alert(JSON.stringify(jobProfileGraduated, null, 2));
      console.log(jobProfileGraduated);
      //Send info of the curriculum to the store
      dispatch(setCurriculum(jobProfileGraduated));
    },
  });

  //================================================= end functions ===================================================

  return (
    <div>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} mr={4}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={list_carreers}
              getOptionLabel={(option) => option.careName}
              onChange={(e, value) => handleSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={careers.length === 0}
                  label="Carrera(s)"
                  placeholder="Seleccione la carrera o carreras que estudio"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="currDescription"
              label="Descripción de tu perfil"
              value={formik.values.currDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.currDescription &&
                Boolean(formik.errors.currDescription)
              }
              helperText={
                formik.touched.currDescription && formik.errors.currDescription
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={experience}
              onChange={(e, value) => setYearsExperience(value)}
              renderInput={(params) => (
                <TextField {...params} label="Años de Experiencia" required />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              fullWidth
              disablePortal
              id="combo-box-demo"
              options={wage}
              onChange={(e, value) => setWage(value)}
              renderInput={(params) => (
                <TextField {...params} label="Aspiración salarial" required />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getLaborMobility}
                  onChange={(event) => {
                    setLaborMobility(event.target.checked);
                  }}
                />
              }
              label="Puede mudarse a otra ciudad o país"
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

export default JobProfileGR;
