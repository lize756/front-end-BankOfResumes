import React, { useState } from "react";
import {
  Paper,
  FormControlLabel,
  Checkbox,
  Chip,
  Grid,
  Typography,
  Button,
  Stack,
} from "@mui/material";
/**
 * -------------------------------------------------
 * ------------------REDUX -------------------------
 * -------------------------------------------------
 */
import { useDispatch, useSelector } from "react-redux";
import {
  setGenderFilter,
  setisRenderFilter,
} from "../../../store/slices/FilterSlice";

const genreCount = [
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Otro",
  "Femenino",
  "Masculino",
  "No Binario",
  "Femenino",
  "Masculino",
  "No Binario",
];

const GenderFilters = () => {
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const [state, setState] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the Genders that the user selected
   */
  const filterGenre = [
    {
      name: "FEMENINO",
      value: state.first,
    },
    {
      name: "MASCULINO",
      value: state.second,
    },
    {
      name: "NO BINARIO",
      value: state.third,
    },
    {
      name: "NO BINARIO",
      value: state.fourth,
    },
  ].filter((genre) => genre.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    //alert(JSON.stringify(filterGenre, null, 2));
    dispatch(setGenderFilter(filterGenre));
    dispatch(setisRenderFilter(true));
  };
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          align="left"
          color="primary"
        >
          Género
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.first}
                  onChange={handleChange}
                  name="first"
                />
              }
              label="Femenino"
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.second}
                  onChange={handleChange}
                  name="second"
                />
              }
              label={"Masculino"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.third}
                  onChange={handleChange}
                  name="third"
                />
              }
              label={"No Binario"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.fourth}
                  onChange={handleChange}
                  name="fourth"
                />
              }
              label={"Otro"}
            />
          </Grid>
        </Grid>

        <Stack mt={2} alignItems="center">
          <Button variant="contained" component="span" onClick={handleClick}>
            Buscar
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default GenderFilters;
