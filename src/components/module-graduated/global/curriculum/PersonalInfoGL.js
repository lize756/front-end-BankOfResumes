import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

const PersonalInfoGL = ({ person }) => {
  return (
    <div>
      <Grid container spacing={2} mx={4} my={4}>
        <Grid item xs={3} mb={2}>
          <Typography
            variant="body2"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {person.typeOfDocument + ": "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Teléfono: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Género: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Edad: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Estado civil: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Fecha de nacimiento: "}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.documentNumber}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.phone}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.gender}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.age + " años"}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.maritalStatus}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.birthDate}
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs={3}>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"País de nacimiento: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Ciudad de nacimiento: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Correo electrónico: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"Grupo étnico: "}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {"¿Tiene una discapacidad?: "}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.countryName}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.cityName}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.email}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.ethnicGroup}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.isDisabled}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInfoGL;
