import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, Stack, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

import PersonalInfoGL from "./PersonalInfoGL";
import JobProfileGL from "./JobProfileGL";
import AcademicTrainingGL from "./AcademicTrainingGL";
import LanguagesGL from "./LanguagesGL";

//redux
import { useSelector } from "react-redux";

const CurriculumGL = () => {
  /**
   * ----------------------------------------
   * ---------------- REDUX -----------------
   * ----------------------------------------
   */
  const currentProfile = useSelector(
    (state) => state.CurriculumSlice.Curriculum
  );

  const [getCareers, setCareers] = useState("");

  useEffect(() => {
    console.log(currentProfile);
    careerProfile();
  });

  const careerProfile = () => {
    let concatCareers = "";
    const array = currentProfile.curriculum.careers;
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        concatCareers += array[i].careName;
      } else {
        concatCareers += array[i].careName + ", ";
      }
    }
    setCareers(concatCareers);
  };

  return (
    <>
      <Paper spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={9}>
            <Stack direction="row" spacing={5} alignItems="center">
              <SchoolIcon sx={{ width: 75, height: 75 }} color="primary" />
              <Stack spacing={1}>
                <Typography variant="h4" component="h4" color="primary">
                  {currentProfile.persFirstName +
                    " " +
                    currentProfile.persLastName}
                </Typography>
                <Typography variant="h6" component="h5" color="#072079">
                  {getCareers}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <PersonalInfoGL person={currentProfile} />
      </Paper>
      <JobProfileGL curriculum={currentProfile.curriculum} />

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {currentProfile.curriculum.academicstudies
          ? currentProfile.curriculum.academicstudies.map((academic) => {
              return (
                <Grid item xs={6} mt={4}>
                  <AcademicTrainingGL
                    key={academic.acadStudId}
                    academic={academic}
                  />
                </Grid>
              );
            })
          : ""}
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mt={4}
      >
        {currentProfile.curriculum.languages
          ? currentProfile.curriculum.languages.map((language) => {
              return (
                <Grid item xs={6} mt={4}>
                  <LanguagesGL key={language.languId} language={language} />
                </Grid>
              );
            })
          : ""}
      </Grid>

      <Stack mt={2} alignItems="center">
        <Button variant="contained" component="span">
          Descargar
        </Button>
      </Stack>
    </>
  );
};

export default CurriculumGL;
