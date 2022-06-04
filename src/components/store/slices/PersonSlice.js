import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";
import { setFilterPersonsWithCurriculum } from "./FilterSlice";
import { setLoginPersOrCompName } from "./SignIn/LoginSlice";

/**
 * Initial state of PersonSlice
 * @returns
 */
const initialState = () => ({
  // List the person of the database
  listPersons: [],
  // List the person with curriculum of the database
  listPersonsWithCurriculum: [],
  // person
  person: {},
});

let headers;
/**
 * This slice containt all related to the requests of the one person.
 */
export const personSlice = createSlice({
  name: "person",
  initialState: initialState(),
  reducers: {
    resetPersonSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a person
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setPerson: (state, action) => {
      state.person = action.payload;
    },

    setListPersons: (state, action) => {
      state.listPersons = action.payload;
    },

    setLisPersonsWithCurriculum: (state, action) => {
      state.listPersonsWithCurriculum = action.payload;
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
 *  Allow us add new person to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} person Correspond of element to add.
 * @returns
 */
export const addperson = (person) => async (dispatch) => {
  axios
    .post("/api/persons/add", person)
    .then((res) => {
      dispatch(setPerson(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a one person
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} persId persId id of the person to update.
 * @param {*} person new person to update.
 * @returns
 */
export const updateperson = (ACCESS_TOKEN, persId, person) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/persons/update/" + persId, person, { headers })
    .then((res) => {
      dispatch(setPerson(res.data));
      // Allow display alert when is update a one person
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizo correctamente el perfil",
          alertSeverity: "info",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      // Allow display alert when the person was not update correctly

      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar el perfil",
          alertSeverity: "error",
        })
      );
    });
};

/**
 * Allow update a one person
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} persId persId id of the person to update.
 * @param {*} person new person to update.
 * @returns
 */
export const updatePartiallyPerson = (ACCESS_TOKEN, persId, person) => (
  dispatch
) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/persons/partiallyUpdate/" + persId, person, { headers })
    .then((res) => {
      dispatch(setPerson(res.data));
      // Allow display alert when is update a one person
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizo correctamente el perfil",
          alertSeverity: "info",
          alertPositionH: "right",
        })
      );
    })
    .catch((err) => {
      console.log("Se actualizo correctamente la persona");
      console.log(err.toJSON());
      // Allow display alert when the person was not update correctly
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar el perfil",
          alertSeverity: "error",
          alertPositionH: "right",
        })
      );
    });
};

/**
 * Allows delete a person through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} persId id of the person that you want to delete
 * @returns
 */
export const deleteperson = (ACCESS_TOKEN, persId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/persons/" + persId, { headers })
    .then((res) => {
      dispatch(setPerson(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a person with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} persId persId id to search a one person
 * @returns
 */
export const getperson = (ACCESS_TOKEN, persId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/persons/" + persId, { headers })
    .then((res) => {
      dispatch(setPerson(res.data));
      dispatch(setLoginPersOrCompName(res.data.persFirstName));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of persons saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getpersons = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/persons", { headers })
    .then((res) => {
      dispatch(setListPersons(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};


/**
 * Allows to obtain the list of persons that have a curriculum.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
 export const getPersonsWithCurriculum = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/persons/personsWithCurriculum", { headers })
    .then((res) => {
      dispatch(setLisPersonsWithCurriculum(res.data));
      dispatch(setFilterPersonsWithCurriculum(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of person
export const {
  setPerson,
  setListPersons,
  setLisPersonsWithCurriculum,
  resetPersonSliceState,
} = personSlice.actions;
export default personSlice.reducer;
