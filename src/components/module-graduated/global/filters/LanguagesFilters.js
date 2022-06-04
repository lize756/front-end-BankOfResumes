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
  setisRenderFilter,
  setLanguagesFilter,
} from "../../../store/slices/FilterSlice";

const languagesList = [
  {
    id: 1,
    name: "Italiano",
  },
  {
    id: 2,
    name: "Romano",
  },
  {
    id: 3,
    name: "Aleman",
  },
  {
    id: 4,
    name: "Griego",
  },
  {
    id: 5,
    name: "Japones",
  },
  {
    id: 6,
    name: "Coreano",
  },
  {
    id: 7,
    name: "Mandarin",
  },
  {
    id: 8,
    name: "Ingles",
  },
];
const LanguagesFilters = () => {
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const [language, setLanguage] = useState("");

  /**
   * This function is responsible for storing the languages selected by the user in the careers list
   * @param {*} value
   */
  const handleSelect = (value) => {
    setLanguage(value);
    const listLgs = [];
    for (let i = 0; i < value.length; i++) {
      listLgs.push(value[i]);
      setLanguage(listLgs);
    }
  };

  /**
   *This function takes care of sending the filtered list to the backend
   */
  const handleClick = () => {
    //alert(JSON.stringify(language, null, 2));
    dispatch(setisRenderFilter(true));
    dispatch(setLanguagesFilter(language));
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
          Idiomas de interés
        </Typography>

        <Grid container spacing={1} mt={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={languagesList}
              getOptionLabel={(option) => option.name}
              name="languages"
              onChange={(e, value) => handleSelect(value)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Idiomas"
                  placeholder="Idiomas de Interés"
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

export default LanguagesFilters;
