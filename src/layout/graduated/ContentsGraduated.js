import React, { useEffect } from "react";

import {
  Typography,
  Paper,
  Card,
  Grid,
  CardActions,
  IconButton,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FeedIcon from "@mui/icons-material/Feed";

import { lightBlue } from "@mui/material/colors";

import { useNavigate } from "react-router";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getperson } from "../../components/store/slices/PersonSlice";
import { getcareers } from "../../components/store/slices/CareerSlice";
import {
  getCurriculum,
  setAcademicStudies,
  setCurriculum,
} from "../../components/store/slices/CurriculumSlice";
import { getCountries } from "../../components/store/slices/CountrySlice";

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const ContentsGraduated = () => {
  let navigate = useNavigate();

  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Redux
  // Get person id of the store
  const userPersonId = useSelector((state) => state.userLogin.userPersonId);
  //Get acces_token of the user that start section
  const ACCESS_TOKEN = useSelector((state) => state.userLogin).responseUserLogin.token;

  const userCurriculumId = useSelector((state) => state.userLogin.userCurriculumId);
  const currentPerson = useSelector((state) => state.PersonSlice.person);
  //Axios
  useEffect(() => {
    //Adde to store the person that user login
   // dispatch(getperson(ACCESS_TOKEN, userPersonId));
    //Added to store of list of carreers.
    //dispatch(getcareers(ACCESS_TOKEN));
    //Added to store of curriculum of the person
    //dispatch(setCurriculum(currentPerson.curriculum));
    dispatch(getCountries())
    dispatch(getCurriculum(ACCESS_TOKEN, userCurriculumId));
  }, []);
  return (
    <div>
      <Paper sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ opacity: 1, color: "#072079", textAlign: "center" }}
        >
          ¡BIENVENIDOS/AS!
        </Typography>

        <Grid
          container
          spacing={5}
          p={4}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs="auto">
            <Card
              sx={{
                width: 210,
                height: 240,
                textAlign: "center",
                py: 5,
                boxShadow: 2,
                bgcolor: lightBlue[50],
              }}
            >
              <IconWrapperStyle
                sx={{
                  color: (theme) => theme.palette["primary"].dark,
                  backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(
                      theme.palette["primary"].dark,
                      0
                    )} 0%, ${alpha(theme.palette["primary"].dark, 0.24)} 100%)`,
                }}
              >
                <FeedIcon color="primary" />
              </IconWrapperStyle>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.72, color: "#072079" }}
              >
                Hoja de
              </Typography>

              <Typography variant="h5" sx={{ color: "#072079" }}>
                Vida
              </Typography>

              <CardActions sx={{ mx: 6 }}>
                <IconButton
                  aria-label="editar"
                  color="primary"
                  onClick={() => {
                    navigate("/graduated/curriculum");
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="eliminar" color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ContentsGraduated;
