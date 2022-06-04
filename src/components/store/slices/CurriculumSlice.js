import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";
import { setLoginPersOrCompName } from "./SignIn/LoginSlice";

/**
 * Initial state of CurriculumSlice
 * @returns
 */
const initialState = () => ({
  // List the Curriculum of the database
  listCurriculum: [],
  // Curriculum
  Curriculum: {},
  // academicStudies
  academicStudies: [],
  // languageStudies
  languageStudies: [],
  // curriculum is render
  isRenderCurriculum: false,
});

let headers;
/**
 * This slice containt all related to the requests of the one Curriculum.
 */
export const CurriculumSlice = createSlice({
  name: "Curriculum",
  initialState: initialState(),
  reducers: {
    resetCurriculumSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a Curriculum
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setCurriculum: (state, action) => {
      state.Curriculum = action.payload;
    },

    setIsRenderCurriculum: (state, action) => {
      state.isRenderCurriculum = action.payload;
    },

    setAcademicStudies: (state, action) => {
      state.academicStudies = action.payload;
    },
    setLanguageStudies: (state, action) => {
      state.languageStudies = action.payload;
    },

    setlistCurriculum: (state, action) => {
      state.listCurriculum = action.payload;
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
 *  Allow us add new Curriculum to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} Curriculum Correspond of element to add.
 * @returns
 */
export const addCurriculum = (ACCESS_TOKEN, Curriculum) => async (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .post("/api/curriculums/add", Curriculum, { headers })
    .then((res) => {
      dispatch(setCurriculum(res.data));
      dispatch(setIsRenderCurriculum(true));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a one Curriculum
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} currId currId id of the Curriculum to update.
 * @param {*} Curriculum new Curriculum to update.
 * @returns
 */
export const updateCurriculum = (ACCESS_TOKEN, currId, Curriculum) => (
  dispatch
) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/curriculums/update/" + currId, Curriculum, { headers })
    .then((res) => {
      dispatch(setCurriculum(res.data));
      // Allow display alert when is update a one Curriculum
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizo correctamente el curriculum",
          alertSeverity: "info",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      // Allow display alert when the curriculum was not update correctly

      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar el curriculum",
          alertSeverity: "error",
        })
      );
    });
};

/**
 * Allow update a one Curriculum
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} currId currId id of the Curriculum to update.
 * @param {*} Curriculum new Curriculum to update.
 * @returns
 */
export const updatePartiallyCurriculum = (ACCESS_TOKEN, currId, Curriculum) => (
  dispatch
) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/curriculums/partiallyUpdate/" + currId, Curriculum, { headers })
    .then((res) => {
      dispatch(setCurriculum(res.data));
      // Allow display alert when is update a one Curriculum
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizo correctamente el curriculum",
          alertSeverity: "info",
          alertPositionH: "right",
        })
      );
    })
    .catch((err) => {
      console.log("Se actualizo correctamente la Curriculuma");
      console.log(err.toJSON());
      // Allow display alert when the curriculum was not update correctly
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar el curriculum",
          alertSeverity: "error",
          alertPositionH: "right",
        })
      );
    });
};

/**
 * Allows delete a Curriculum through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} currId id of the Curriculum that you want to delete
 * @returns
 */
export const deleteCurriculum = (ACCESS_TOKEN, currId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/curriculums/" + currId, { headers })
    .then((res) => {
      dispatch(setCurriculum(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a Curriculum with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} currId currId id to search a one Curriculum
 * @returns
 */
export const getCurriculum = (ACCESS_TOKEN, currId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/curriculums/" + currId, { headers })
    .then((res) => {
      dispatch(setCurriculum(res.data));
      dispatch(setLoginPersOrCompName(res.data.persFirstName));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of curriculums saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getcurriculums = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/curriculums", { headers })
    .then((res) => {
      dispatch(setlistCurriculum(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * ========================================================================
 * ========Functions for academyStudy and language entities================
 * ========================================================================
 */

/**
 * Allows to added one list of academicStudies in the database
 * @param {*} academicStudies academicStudies to add.
 * @returns
 */
export const addAcademicStudies = (ACCESS_TOKEN, academicStudies) => async (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .post("/api/academicStudies/addAcademicStudies", academicStudies, {
      headers,
    })
    .then((res) => {
      dispatch(setAcademicStudies(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to added one list of languages in the database
 * @param {*} languages languages to add.
 * @returns
 */
export const addLanguages = (ACCESS_TOKEN, languages) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .post("/api/languages/addLanguages", languages, { headers })
    .then((res) => {
      dispatch(setLanguageStudies(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of Curriculum
export const {
  setCurriculum,
  setLanguageStudies,
  setAcademicStudies,
  setlistCurriculum,
  setIsRenderCurriculum,
  resetCurriculumSliceState,
} = CurriculumSlice.actions;
export default CurriculumSlice.reducer;
