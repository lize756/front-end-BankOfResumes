import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const LanguagesGL = ({ language }) => {
  return (
    <div>
      <Card sx={{ width: 500, backgroundColor: deepOrange[50] }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Idioma Estudiado:  "}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Nivel del idioma:  "}
              </Typography>
              <Typography
                variant="body1"
                component="h6"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              >
                {"Nombre de la institución: "}
              </Typography>

              {language.endDate !== " " ? (
                <Typography
                  variant="body1"
                  component="h6"
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                >
                  {"Fecha finalización:"}
                </Typography>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" component="h6" gutterBottom>
                {language.language}
              </Typography>
              <Typography variant="body1" component="h6" gutterBottom>
                {language.level}
              </Typography>
              <Typography variant="body1" component="h6" gutterBottom>
                {language.institutionName}
              </Typography>

              <Typography variant="body1" component="h6" gutterBottom>
                {language.endDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguagesGL;
