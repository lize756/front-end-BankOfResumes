import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

/**
 * Initial state of UserrSlice
 * @returns
 */
const initialState = () => ({
    // List the userr of the database
    listuserrs: [],
    // userr
    userr: {},
});

let headers;
/**
 * This slice containt all related to the requests of the one userr.
 */
export const userrSlice = createSlice({
  name: "userr",
  initialState: initialState(),
  reducers: {
    resetUserrSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a userr
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setuserr: (state, action) => {
      state.userr = action.payload;
    },

    setListuserrs: (state, action) => {
      state.listuserrs = action.payload;
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
 *  Allow us add new userr to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} userr Correspond of element to add.
 * @returns
 */
export const registerUser = (data) => async (dispatch) => {
  await axios
    .post("/api/auth/register", data)
    .then((response) => {})
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a one userr
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} usrId usrId id of the userr to update.
 * @param {*} userr new userr to update.
 * @returns
 */
export const updateuserr = (ACCESS_TOKEN, usrId, userr) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/userrs/update/" + usrId, { headers }, userr)
    .then((res) => {
      dispatch(setuserr(res.data));
      console.log("Se actulizo correctamente el usuario");
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows delete a userr through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} usrId id of the userr that you want to delete
 * @returns
 */
export const deleteuserr = (ACCESS_TOKEN, usrId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/userrs/" + usrId, { headers })
    .then((res) => {
      dispatch(setuserr(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a userr with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} usrId usrId id to search a one userr
 * @returns
 */
export const getuserr = (ACCESS_TOKEN, usrId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/userrs/" + usrId, { headers })
    .then((res) => {
      dispatch(setuserr(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of userrs saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getuserrs = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/userrs", { headers })
    .then((res) => {
      dispatch(setListuserrs(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of userr
export const { setuserr, setListuserrs, resetUserrSliceState} = userrSlice.actions;
export default userrSlice.reducer;
