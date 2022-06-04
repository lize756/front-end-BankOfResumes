import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
// Impor img
import img_company from "../../../assets/company.png";
import graduated from "../../../assets/graduated.png";
import img_register_cedep from "../../../assets/img_register_cedep1.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height: 400,
    margin: "50px 0 50px 0",
  },
  cardMedia: {
    padding: "10px",
  },
  media: {
    height: "250px",
    width: "250px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
  },
});

/**
 * Allows you to select what type of record I want to make: 
 * Student, Company and people of the CEDEP.
 * @returns the component that allow select what type of register to make.
 */
export default function DashboardCreateAccount() {
  const classes = useStyles();
  const urlToCompanyRegister = "/company/register";
  const urlToGraduatedRegister = "#";
  const urlToCEDEPRegister = "/cedep/register";

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      style={{ minHeight: "" }}
    >
      <Grid item>
        <Card className={classes.root}>
          <CardActionArea
            className={classes.cardMedia}
            href={urlToCompanyRegister}
          >
            <CardMedia
              className={classes.media}
              component="img"
              image={img_company}
              title="img"
            />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="p">
                Registro de empresas
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.root}>
          <CardActionArea
            className={classes.cardMedia}
            href={urlToGraduatedRegister}
          >
            <CardMedia
              className={classes.media}
              component="img"
              image={graduated}
              title="img"
            />
            <CardContent>
              <Typography variant="h6" color="textSecondary" component="p">
                Registro de egresados
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.root}>
          <CardActionArea
            className={classes.cardMedia}
            href={urlToCEDEPRegister}
          >
            <CardMedia
              className={classes.media}
              component="img"
              image={img_register_cedep}
              title="img"
            />
            <CardContent>
              <Typography
                align="center"
                variant="h6"
                color="textSecondary"
                component="p"
              >
                Registro de miembros del CEDEP
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
