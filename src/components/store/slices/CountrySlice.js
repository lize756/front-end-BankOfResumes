import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";

/*
 * Initial state of CountrySlice
 * @returns
 */
const initialState = () => ({
  // List cities of the api
  listCities: [],
  // List countries of the api
  listCountries: [],
  // Current country
  currentCountry: {},
  // Current city
  currentCity: {},
});
let headers;
/**
 * This slice containt all related to the requests of the City.
 */
export const countrySlice = createSlice({
  name: "Country",
  initialState: initialState(),
  reducers: {
    resetCountrySliceState: (state) => initialState(),

    /**
     * Allows you to get data from a Country
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setListCountries: (state, action) => {
      state.listCountries = action.payload;
    },
    setCountry: (state, action) => {
      state.currentCountry = action.payload;
    },
    setListCities: (state, action) => {
      state.listCities = action.payload;
    },
    setCity: (state, action) => {
      state.currentCity = action.payload;
    },

    extraReducers: {
      // async reducers here
      // eslint-disable-next-line no-use-before-define
    },
  },
});

/**
 * --------------------------------------------------------------------
 * Async functions
 * --------------------------------------------------------------------
 */

/**
 *  Allow get the list of countries of the API
 * @returns
 */
export const getCountries = () => async (dispatch) => {
  axios
    .get("https://countriesnow.space/api/v0.1/countries/capital")
    .then((res) => {
      dispatch(setListCountries(res.data.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow get the list of cities associated of the country
 * @returns
 */
export const getCitiesAssociatedToCountry = (countryName) => async (
  dispatch
) => {
  if (countryName !== undefined) {
    const data = {
      country: `${countryName}`,
    };
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", data)
      .then((res) => {
        dispatch(setListCities(res.data.data));
      })
      .catch((err) => {
        // Allow display alert when the intern request was not update correctly
        dispatch(setTypeAlert("1"));
        dispatch(setShowAlert(true));
        dispatch(
          setAlert({
            alertTitle:
              "No se encontraron ciudades asociadas a este país: " +
              countryName,
            alertSeverity: "warning",
            alertPositionH: "left",
          })
        );
      });
  }
};

//Export the action to reducer of City
export const {
  setCity,
  setListCities,
  setListCountries,
  resetCountrySliceState,
} = countrySlice.actions;
export default countrySlice.reducer;
