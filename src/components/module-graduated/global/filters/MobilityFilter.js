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
  setMobilityFilter,
} from "../../../store/slices/FilterSlice";

const mobilityCount = [
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "No",
  "Si",
  "Si",
  "Si",
  "Si",
  "Si",
];

const MobilityFilter = () => {
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
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  /**
   * This filter is responsible for separating the mobility that the user selected
   */
  const filterMobility = [
    {
      name: "true",
      value: state.first,
    },
    {
      name: "false",
      value: state.second,
    },
  ].filter((mobility) => mobility.value === true);

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    // alert(JSON.stringify(filterMobility, null, 2));
    dispatch(setMobilityFilter(filterMobility));
    dispatch(setisRenderFilter(true));
  };

  return (
    <>
      {" "}
      <Paper sx={{ p: 2 }}>
        <Typography
          variant="p"
          gutterBottom
          component="div"
          align="left"
          color="primary"
        >
          ¿Puede mudarse a otra ciudad o país?
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
              label="Si"
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
              label={"No"}
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

export default MobilityFilter;
