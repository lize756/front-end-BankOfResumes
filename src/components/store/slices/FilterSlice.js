import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";
import { setLoginPersOrCompName } from "./SignIn/LoginSlice";

/**
 * Initial state of FilterSlice
 * @returns
 */
const initialState = () => ({
  // List the filter to profession
  professionFilter: [],
  // List the filter to english
  englishFilter: [],
  // List the filtrer to languages
  languagesFilter: [],
  // List the filtrer to gender
  genderFilter: [],
  // List the filter to experience
  experienceFilter: [],
  // List the mobility filter
  mobilityFilter: [],
  // List to salary filter
  salaryFilter: [],
  // List to person with curriculum
  filterPersonsWithCurriculum: [],
  // Render the list of persons with curriculum
  isRenderFilter: false,
});

/**
 * This slice containt all related with the filter that the user make.
 */
export const FilterSlice = createSlice({
  name: "filter",
  initialState: initialState(),
  reducers: {
    resetFilterSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a filter
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setProfessionFilter: (state, action) => {
      state.professionFilter = action.payload;
    },

    setisRenderFilter: (state, action) => {
      state.isRenderFilter = action.payload;
    },
    setEnglishFilter: (state, action) => {
      state.englishFilter = action.payload;
    },
    setLanguagesFilter: (state, action) => {
      state.languagesFilter = action.payload;
    },

    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.experienceFilter = action.payload;
    },
    setMobilityFilter: (state, action) => {
      state.mobilityFilter = action.payload;
    },
    setSalaryFilter: (state, action) => {
      state.salaryFilter = action.payload;
    },
    setFilterPersonsWithCurriculum: (state, action) => {
      state.filterPersonsWithCurriculum = action.payload;
    },

    extraReducers: {
      // async reducers here
      // eslint-disable-next-line no-use-before-define
    },
  },
});

//Export the action to reducer of filter
export const {
  resetFilterSliceState,
  setProfessionFilter,
  setEnglishFilter,
  setFilterPersonsWithCurriculum,
  setLanguagesFilter,
  setGenderFilter,
  setExperienceFilter,
  setMobilityFilter,
  setisRenderFilter,
  setSalaryFilter,
} = FilterSlice.actions;
export default FilterSlice.reducer;
