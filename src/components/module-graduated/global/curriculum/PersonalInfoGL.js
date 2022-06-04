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
            {person.persDocumentType + ": "}
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
            {person.persDocument}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persPhone}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persGenre}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persAge + " años"}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persMaritalStatus}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persDateOfBirth}
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
            {person.persCountryName}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persCityName}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persEmail}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persEthnicGroup}
          </Typography>
          <Typography variant="body1" component="h6" gutterBottom>
            {person.persIsDisability === true ? "SI" : "NO"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInfoGL;
