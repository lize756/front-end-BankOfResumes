import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
/**
 * -------------------------------------------------
 * ------------------REDUX -------------------------
 * -------------------------------------------------
 */
 import { useDispatch, useSelector } from "react-redux";
 import {
  setExperienceFilter, setisRenderFilter,
 } from "../../../store/slices/FilterSlice";




const experience = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const ExperienceFilters = () => {
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();


  const [getExperience, setExperience] = useState("");

  /**
   * This function is responsible for storing the experience selected by the user in the experience list
   * @param {*} value
   */
  const handleSelect = (value) => {
    setExperience(value);
    const listExp = [];
    for (let i = 0; i < value.length; i++) {
      listExp.push(value[i]);
      setExperience(listExp);
    }
  };

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    //alert(JSON.stringify(getExperience, null, 2));
    dispatch(setExperienceFilter(getExperience));
    dispatch(setisRenderFilter(true))
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
          Experiencia (en años)
        </Typography>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={experience}
              name="experience"
              onChange={(e, value) => handleSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Años de Experiencia" />
              )}
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

export default ExperienceFilters;
