import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

let headers;
/**
 * Initial state of CareerSlice
 * @returns
 */
const initialState = () => ({
  // List the career of the database
  listCareers: [],
  // Career
  career: {},
});

/**
 * This slice containt all related to the requests of the career.
 */
export const careerSlice = createSlice({
  name: "career",
  initialState: initialState(),
  reducers: {
    resetCareerSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a career
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setCareer: (state, action) => {
      state.career = action.payload;
    },

    setlistCareers: (state, action) => {
      state.listCareers = action.payload;
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
 *  Allow us add new career to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} career Correspond of element to add.
 * @returns
 */
export const addcareer = (ACCESS_TOKEN, career) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .post("/api/careers", { headers }, career)
    .then((res) => {
      dispatch(setCareer(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a career
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} careId careId id of the career to update.
 * @param {*} career new career to update.
 * @returns
 */
export const updatecareer = (ACCESS_TOKEN, careId, career) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/careers/update/" + careId, { headers }, career)
    .then((res) => {
      dispatch(setCareer(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows delete a career through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} careId id of the career that you want to delete
 * @returns
 */
export const deletecareer = (ACCESS_TOKEN, careId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/careers/" + careId, { headers })
    .then((res) => {
      dispatch(setCareer(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a career with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} careId careId id to search a one career
 * @returns
 */
export const getcareer = (ACCESS_TOKEN, careId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/careers/" + careId, { headers })
    .then((res) => {
      dispatch(setCareer(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of careers saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getcareers = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/careers", { headers })
    .then((res) => {
      dispatch(setlistCareers(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of career
export const {
  setCareer,
  setlistCareers,
  resetCareerSliceState,
} = careerSlice.actions;
export default careerSlice.reducer;
