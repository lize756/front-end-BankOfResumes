import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";
import { setLoginPersOrCompName } from "./SignIn/LoginSlice";

/**
 * Initial state of CompanySlice
 * @returns
 */
const initialState = () => ({
  // List the company of the database
  listCompanies: [],
  // Company
  company: {},

  //AccordeonChangeValue
  accordinRegisterPanel: "panel1",
});
let headers;
/**
 * This slice containt all related to the requests of the company.
 */
export const companySlice = createSlice({
  name: "company",
  initialState: initialState(),
  reducers: {
    resetCompanySliceState: (state) => initialState(),

    /**
     * Allows you to get data from a company
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setCompany: (state, action) => {
      state.company = action.payload;
    },

    setListCompanies: (state, action) => {
      state.listCompanies = action.payload;
    },
    setAccordinRegisterPanelValue: (state, action) => {
      state.accordinRegisterPanel = action.payload;
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
 *  Allow us add new company to the database
 * @param {*} Company Correspond of element to add.
 * @returns
 */
export const addCompany = (Company) => async (dispatch) => {
  axios
    .post("/api/companies/add", Company)
    .then((res) => {
      dispatch(setCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a one company
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} compId compId id of the company to update.
 * @param {*} Company new company to update.
 * @returns
 */
export const updateCompany = (ACCESS_TOKEN, compId, Company) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("api/companies/update/" + compId, Company, { headers })
    .then((res) => {
      dispatch(setCompany(res.data));
      console.log("Se actualizo correctamente la compañia");
      // Allow display alert when is update the intern request
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
      // Allow display alert when the perfil was not update correctly
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
 * Allows delete a company through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} compId id of the company that you want to delete
 * @returns
 */
export const deleteCompany = (ACCESS_TOKEN, compId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/companies/" + compId, { headers })
    .then((res) => {
      dispatch(setCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain a company with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} compId compId id to search a one company
 * @returns
 */
export const getCompany = (ACCESS_TOKEN, compId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .get("/api/companies/" + compId, { headers })
    .then((res) => {
      dispatch(setCompany(res.data));
      dispatch(setLoginPersOrCompName(res.data.compName))
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of companys saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getCompanies = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/companies", { headers })
    .then((res) => {
      dispatch(setListCompanies(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of Company
export const {
  setCompany,
  resetCompanySliceState,
  setListCompanies,
  setAccordinRegisterPanelValue,
} = companySlice.actions;
export default companySlice.reducer;
