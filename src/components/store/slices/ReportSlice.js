import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";

/**
 * Initial state of PersonSlice
 * @returns
 */
const initialState = () => ({});

let headers;
/**
 * This slice containt all related to the requests of the one person.
 */
export const reportSlice = createSlice({
  name: "reportSlice",
  initialState: initialState(),
  reducers: {
    resetReportSliceState: (state) => initialState(),

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
export const downloadCompanyContactsReport = () => async (dispatch) => {
  axios
    .get("/api/reports/companyContactsReport?type=PDF", {
      responseType: "blob",
    })
    .then((res) => {
      console.log(res);
      //Create a Blob from the PDF Stream
      const file = new Blob([res.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

export const downloadAllCompaniesReport = () => async (dispatch) => {
    axios
      .get("/api/reports/allCompaniesReport?type=PDF", {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };

  export const downloadInternRequestsPersonGroupingByCareerReport = (persId) => async (dispatch) => {
    axios
      .get(`/api/reports/companyInternRequestsPersonGroupingByCareerReport?persId=${persId}&type=PDF`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log("entre");
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };


  export const downloadCompanyInternRequestsReport = (compId) => async (dispatch) => {
    axios
      .get(`/api/reports/companyInternRequestsByCompanyIdReport?type=PDF&compId=${compId}`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log("entre");
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };

//Export the action to reducer of reportSlice
export const {} = reportSlice.actions;
export default reportSlice.reducer;
