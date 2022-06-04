import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  CssBaseline,
  Stack,
  Autocomplete,
} from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";

import { makeStyles } from "@material-ui/core";

import { v4 as uuidv4 } from "uuid";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setAcademicStudies } from "../../store/slices/CurriculumSlice";
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
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },

    "& ..MuiIconButton-root": {
      margin: theme.spacing(2),
    },
  },
}));

/**
 * =============================================================
 * =========================== Lists ========================
 * =============================================================
 */
const status = ["Culminado", "En curso", "Abandonado", "Aplazado"];
const level = [
  "Preescolar",
  "Básica Primaria (1° - 5°)",
  "Básica Secundaria (6° - 9°)",
  "Media (10° - 13°)",
  "Técnico Laboral",
  "Formación Técnica Profesional",
  "Tecnológica",
  "Universitaria",
  "Especialización",
  "Maestría",
  "Doctorado",
];
// =========================== End lists ========================

const AcademicTrainingGR = () => {
  /**
   * =============================================================
   * =========================== Constants ========================
   * =============================================================
   */

  const classes = useStyles();
  const [studies, setStudies] = useState([
    {
      acadStudId: uuidv4(),
      acadStudLevel: "",
      acadStudStatus: "",
      acadStudStartDate: "",
      acadStudEndDate: "",
      acadStudTitule: "",
      acadStudInsti: "",
    },
  ]);

  //============================ End constants=============================

  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */

  // Allow to send the elements of store
  const dispatch = useDispatch();

  // Get person saved of the store
  const currentCurriculum = useSelector(
    (state) => state.CurriculumSlice.curriculum
  );


  /**
   * ==================================================================
   * ===========================useEffect===============================
   * ==================================================================
   */

  /**
   * ---------------------------End useEffect-----------------------------
   */

  //================================================= Functions ===================================================

  /**
   * This method allow print to console the result of the form
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Allows you to make a deep copy of the array
    const temporalStudiesArray = JSON.parse(JSON.stringify(studies));

    //Delete the id of the array
    temporalStudiesArray.map((study) => {
      delete study.acadStudId;
    });

    console.log(temporalStudiesArray);
    //Send the data to the store
    dispatch(setAcademicStudies(temporalStudiesArray));
  };

  /**
   * This function allows to draw a new form
   */
  const handleAddStudy = () => {
    setStudies([
      ...studies,
      {
        acadStudId: uuidv4(),
        acadStudLevel: "",
        acadStudStatus: "",
        acadStudStartDate: "",
        acadStudEndDate: "",
        acadStudTitule: "",
        acadStudInsti: "",
      },
    ]);
  };

  /**
   * This function allows to delete a new form
   * @param {*} acadStudId of study
   */
  const handleRemoveStudy = (acadStudId) => {
    const values = [...studies];
    values.splice(
      values.findIndex((value) => value.acadStudId === acadStudId),
      1
    );
    setStudies(values);
  };

  /**
   * This function allows you to save changes to studies details
   * @param {*} acadStudId of studies
   * @param {*} e is a event
   */
  const handleChange = (acadStudId, e) => {
    const newStudy = studies.map((i) => {
      if (acadStudId === i.acadStudId) {
        i[e.target.name] = e.target.value;

        if (e.target.name === "acadStudStartDate") {
          const [year, month, day] = i.acadStudStartDate.split("-");
          const formattedStDate = day + "/" + month + "/" + year;
          i.acadStudStartDate = formattedStDate;
        }
        if (e.target.name === "acadStudEndDate") {
          const [year, month, day] = i.acadStudEndDate.split("-");
          const formattedStDate = day + "/" + month + "/" + year;
          i.acadStudEndDate = formattedStDate;
        }
      }
      return i;
    });
    //console.log(newStudy);
    setStudies(newStudy);
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#F2F6FE" }} />

        <form className={classes.root} onSubmit={handleSubmit}>
          {studies.map((study) => (
            <div key={study.acadStudId}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={level}
                onChange={(e, value) => {
                  handleChange(study.acadStudId, {
                    target: { value: value, name: "acadStudLevel" },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Nivel del estudio" />
                )}
              />

              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={status}
                onChange={(e, value) => {
                  handleChange(study.acadStudId, {
                    target: { value: value, name: "acadStudStatus" },
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Estado del estudio" />
                )}
              />

              <TextField
                required
                fullWidth
                name="acadStudStartDate"
                label="Fecha de inicio del estudio"
                variant="outlined"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                onChange={(e) => handleChange(study.acadStudId, e)}
              />
              <TextField
                required
                fullWidth
                name="acadStudEndDate"
                label="Fecha de finalización"
                variant="outlined"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                onChange={(e) => handleChange(study.acadStudId, e)}
              />

              <TextField
                name="acadStudTitule"
                label="Título otorgado"
                variant="outlined"
                required
                value={study.acadStudTitule}
                placeholder="Ingeniero de sistemas"
                onChange={(e) => handleChange(study.acadStudId, e)}
              />

              <TextField
                name="acadStudInsti"
                label="Institución en la que estudio"
                variant="outlined"
                required
                value={study.acadStudInsti}
                placeholder="Universidad ICESI"
                onChange={(e) => handleChange(study.acadStudId, e)}
              />

              <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton onClick={handleAddStudy}>
                    <AddIcon color="primary" />
                  </IconButton>
                  <IconButton
                    disabled={studies.length === 1}
                    onClick={() => handleRemoveStudy(study.acadStudId)}
                  >
                    <RemoveIcon color="error" />
                  </IconButton>
                </Stack>
              </div>
            </div>
          ))}
          <div>
            <Button type="submit" variant="contained" color="primary">
              Guardar información.
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AcademicTrainingGR;
