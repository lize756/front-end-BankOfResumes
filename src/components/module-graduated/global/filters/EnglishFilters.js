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
  setEnglishFilter,
  setisRenderFilter,
} from "../../../store/slices/FilterSlice";
import { setIsRender } from "../../../store/slices/InternRequestSlice";

const levelCount = [
  "Intermedio",
  "Avanzado",
  "Básico",
  "Intermedio",
  "Avanzado",
  "Básico",
  "Intermedio",
  "Avanzado",
  "Avanzado",
  "Básico",
  "Básico",
  "Intermedio",
  "Intermedio",
  "Avanzado",
  "Avanzado",
  "Básico",
  "Avanzado",
  "Básico",
  "Intermedio",
  "Avanzado",
];

const EnglishFilters = () => {
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
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the levels that the user selected
   */
  const filterLevel = [
    {
      name: "Avanzado",
      value: state.first,
    },
    {
      name: "Intermedio",
      value: state.second,
    },
    {
      name: "Básico",
      value: state.third,
    },
  ].filter((level) => level.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    // alert(JSON.stringify(filterLevel, null, 2));
    dispatch(setEnglishFilter(filterLevel));
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
          Nivel de ingles
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
              label="Avanzado"
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
              label={"Intermedio"}
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
              label={"Básico"}
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

export default EnglishFilters;
