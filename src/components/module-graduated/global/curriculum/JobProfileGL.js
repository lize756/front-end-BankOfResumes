import React from "react";
import { Paper, Grid, Typography, Stack, Chip } from "@mui/material";

const JobProfileGL = ({ curriculum }) => {
  return (
    <div>
      <Paper>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          align="center"
          color="error"
        >
          Perfil laboral
        </Typography>
        <Grid container spacing={2} mx={4}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom component="div">
              Carreras estudiadas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={3}>
              {curriculum.careers.map((career) => {
                return (
                  <Chip
                    key={career._id}
                    label={career.carsName}
                    color="warning"
                    variant="outlined"
                  />
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={3} mb={2}>
            <Typography variant="body1" gutterBottom component="div">
              Aspiración salarial
            </Typography>
            <Chip
              label={curriculum.wageAspiration + " millones de pesos"}
              color="error"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" gutterBottom component="div">
              ¿Puede mudarse a otra ciudad o país?
            </Typography>
            <Chip
              label={curriculum.isCanMove === true ? "SI" : "NO"}
              color="error"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" gutterBottom component="div">
              Años de experiencia
            </Typography>
            <Chip
              label={curriculum.yearsOfExperience + " años de experiencia"}
              color="error"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default JobProfileGL;
