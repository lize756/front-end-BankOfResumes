import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { indigo } from "@mui/material/colors";

const AcademicTrainingGL = ({ academic }) => {
  return (
    <div>
      <Card sx={{ width: 550, backgroundColor: indigo[50] }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Nivel de estudio:  "}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Estado del estudio:  "}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Nombre de la institución:"}
              </Typography>

              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Título otorgado: "}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Fecha de inicio: "}
              </Typography>

              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Fecha finalización:"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="h6" gutterBottom>
                {academic.levelStudy}
              </Typography>
              <Typography variant="body1" component="h6" gutterBottom>
                {academic.studioStatus}
              </Typography>
              <Typography variant="body1" component="h6" gutterBottom>
                {academic.institutionName}
              </Typography>

              <Typography variant="body1" component="h6" gutterBottom>
                {academic.degreeAwarded}
              </Typography>
              <Typography variant="body1" component="h6" gutterBottom>
                {academic.startDate}
              </Typography>

              <Typography variant="body1" component="h6" gutterBottom>
                {academic.endDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicTrainingGL;
