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
import { setisRenderFilter, setProfessionFilter } from "../../../store/slices/FilterSlice";

const ProfessionFilters = () => {

   /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;


  const careerList = useSelector((state) => state.CareerSlice.listCareers);
  const [careers, setCareers] = useState("");

  /**
   * This function is responsible for storing the careers selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    setCareers(value);
    const listCrs = [];
    for (let i = 0; i < value.length; i++) {
      listCrs.push(value[i]);
      setCareers(listCrs);
    }
  };

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    //alert(JSON.stringify(careers, null, 2));
    dispatch(setProfessionFilter(careers));
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
          Carreras de interés
        </Typography>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={careerList}
              getOptionLabel={(option) => option.careName}
              name="careers"
              onChange={(e, value) => handleSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Carreras"
                  placeholder="Carreras de Interés"
                />
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

export default ProfessionFilters;
