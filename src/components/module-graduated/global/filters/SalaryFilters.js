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
  setisRenderFilter,
  setSalaryFilter,
} from "../../../store/slices/FilterSlice";

/**
 * List of examples for the count for each salary
 */
const wageCount = [
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "Menos de $1",
  "$1,5 a $2",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$5,5 a $6",
  "$6 a $8",
  "Menos de $1",
  "Menos de $1",
  "$8 a $10",
  "$1,5 a $2",
  "$2,5 a $3",
  "$10 a $12,5",
  "$12,5 a $15",
  "$2,5 a $3",
  "$3,5 a $4",
  "$4,5 a $5",
  "$6 a $8",
  "$5,5 a $6",
  "$4,5 a $5",
  "$5,5 a $6",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$2,5 a $3",
  "$3,5 a $4",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$4,5 a $5",
  "$5,5 a $6",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
  "$15 a $18",
  "$18 a $21",
  "Más de $21",
];

const SalaryFilters = () => {
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
    fifth: false,
    sixth: false,
    seventh: false,
    eighth: false,
    nineth: false,
    tenth: false,
    eleventh: false,
    twelfth: false,
    thirteenth: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the salaries that the user selected
   */
  const filterSalary = [
    {
      name: "Menos de $1",
      value: state.first,
    },
    {
      name: "$1,5 a $2",
      value: state.second,
    },
    {
      name: "$2,5 a $3",
      value: state.third,
    },
    {
      name: "$3,5 a $4",
      value: state.fourth,
    },
    {
      name: "$4,5 a $5",
      value: state.fifth,
    },
    {
      name: "$5,5 a $6",
      value: state.sixth,
    },
    {
      name: "$6 a $8",
      value: state.seventh,
    },
    {
      name: "$8 a $10",
      value: state.eighth,
    },
    {
      name: "$10 a $12,5",
      value: state.nineth,
    },
    {
      name: "$12,5 a $15",
      value: state.tenth,
    },
    {
      name: "$15 a $18",
      value: state.eleventh,
    },
    {
      name: "$18 a $21",
      value: state.twelfth,
    },
    {
      name: "Más de $21",
      value: state.thirteenth,
    },
  ].filter((salary) => salary.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    // alert(JSON.stringify(filterSalary, null, 2));
    dispatch(setSalaryFilter(filterSalary));
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
          Salario (en millones de pesos)
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
              label={"Menos de $1"}
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
              label={"$1,5 a $2"}
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
              label={"$2,5 a $3"}
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
              label={"$3,5 a $4"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.fifth}
                  onChange={handleChange}
                  name="fifth"
                />
              }
              label={"$4,5 a $5"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.sixth}
                  onChange={handleChange}
                  name="sixth"
                />
              }
              label={"$5,5 a $6"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.seventh}
                  onChange={handleChange}
                  name="seventh"
                />
              }
              label={"$6 a $8"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.eighth}
                  onChange={handleChange}
                  name="eighth"
                />
              }
              label={"$8 a $10"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.nineth}
                  onChange={handleChange}
                  name="nineth"
                />
              }
              label={"$10 a $12,5"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.tenth}
                  onChange={handleChange}
                  name="tenth"
                />
              }
              label={"$12,5 a $15"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.eleventh}
                  onChange={handleChange}
                  name="eleventh"
                />
              }
              label={"$15 a $18"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.twelfth}
                  onChange={handleChange}
                  name="twelft"
                />
              }
              label={"$18 a $21"}
            />
          </Grid>

          <Grid item xs={9}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.thirteenth}
                  onChange={handleChange}
                  name="thirteenth"
                />
              }
              label={"Más de $21"}
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

export default SalaryFilters;
