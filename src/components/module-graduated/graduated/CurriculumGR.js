import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonalInfoGR from "./PersonalInfoGR";
import JobProfileGR from "./JobProfileGR";
import AcademicTrainingGR from "./AcademicTrainingGR";
import LanguagesGR from "./LanguagesGR";

import { styled } from "@mui/material/styles";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addLanguages,
  addAcademicStudies,
  addCurriculum,
  setIsRenderCurriculum,
} from "../../store/slices/CurriculumSlice";
import { addperson, updateperson } from "../../store/slices/PersonSlice";
import { useNavigate } from "react-router";

const Input = styled("input")({
  display: "none",
});

const CurriculumGR = () => {
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */

  // Allow to send the elements of store
  const dispatch = useDispatch();

  const currentCurriculum = useSelector(
    (state) => state.CurriculumSlice.Curriculum
  );

  const currentAcademicStudies = useSelector(
    (state) => state.CurriculumSlice.academicStudies
  );
  const currentLanguages = useSelector(
    (state) => state.CurriculumSlice.languageStudies
  );

  const currentPerson = useSelector((state) => state.PersonSlice.person);

  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  const isRenderCurriculum = useSelector(
    (state) => state.CurriculumSlice.isRenderCurriculum
  );

  let navigate = useNavigate();

  const [fileName, setFileName] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
  };

  const sendData = (event) => {
    event.preventDefault();
    // // And this functions sends the data to the server
    // // and then to the redux store
    // //Send the data to the store
    // dispatch(addAcademicStudies(ACCESS_TOKEN, currentAcademicStudies));
    // Add new curriculum to the database
    dispatch(addCurriculum(ACCESS_TOKEN, currentCurriculum));
    dispatch(addAcademicStudies(ACCESS_TOKEN, currentAcademicStudies));

  };

  useEffect(() => {
    if (isRenderCurriculum === true) {
      console.log("currentCurriculum", currentCurriculum);
      /**
       * ----------------------------------------------------
       * Add academic studies to the curriculum and then send it to the server and then to the redux store
       * ----------------------------------------------------
       */

      const  temporalAcademicStudies = currentAcademicStudies.map(a => {return {...a}})

      //const temporalAcademicStudies = JSON.parse(  JSON.stringify(currentAcademicStudies)
      temporalAcademicStudies.curriculum = currentCurriculum;
      temporalAcademicStudies.vla = "entre";

      dispatch(addAcademicStudies(ACCESS_TOKEN, temporalAcademicStudies));
      console.log(
        "Estudio academicos",
        JSON.parse(JSON.stringify(temporalAcademicStudies))
      );

      /**
       *  --------------------------------------------------------------
       * Add curriculum to the person and then send it to the server and then to the redux store
       * ----------------------------------------------------------------
       */
      // Allows you to make a deep copy of the array
      const temporalPerson = JSON.parse(JSON.stringify(currentPerson));
      temporalPerson.curriculum = currentCurriculum;
      console.log("persona",temporalPerson);
      dispatch(
        updateperson(ACCESS_TOKEN, temporalPerson.persId, temporalPerson)
      );
      console.log(JSON.stringify(temporalPerson, null, 2));

      /**
       * ----------------------------------------------------
       * Add curriculum to the languages and then send it to the server and then to the redux store
       *
       */
      const temporalLanguages = JSON.parse(JSON.stringify(currentLanguages));
      temporalLanguages.curriculum = currentCurriculum;
      dispatch(addLanguages(ACCESS_TOKEN, temporalLanguages));
      dispatch(setIsRenderCurriculum(false));
      // navigate("/graduated/home");
    }
  }, [isRenderCurriculum]);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Información personal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PersonalInfoGR />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Perfil laboral</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <JobProfileGR />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Formación académica</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <AcademicTrainingGR />
          <Divider>IDIOMAS</Divider>
          <LanguagesGR />
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={2}>
          <label htmlFor="contained-button-file">
            <Input
              accept="pdf/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
            <Button variant="contained" component="span">
              Subir Hoja de Vida
            </Button>
          </label>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="outlined-read-only-input"
            value={`${fileName}`}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendData}
        >
          Enviar.
        </Button>
      </div>
    </div>
  );
};

export default CurriculumGR;
