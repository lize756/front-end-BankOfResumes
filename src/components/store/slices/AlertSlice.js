import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state of alerSlice
 * @returns
 */
const initialState = () => ({
  // object alert that contains the info that have one career
  alert: {
    alertTitle: "",
    alertDescription: "",
    alertOtherInfo: "",
    alertMaxWidth: "",
    alertSeverity: "",
    alertPositionH: "left",
  },
  typeAlert: 1, // Option: 0: Dialog Alert 1: Snackbar
  isShowAlert: false,
  isAcceptedAlert: false,
});

/**
 * This slice containt all related with the state of application.
 */
export const alertSlice = createSlice({
  name: "alert",
  initialState: initialState(),
  reducers: {
    resetAlertSliceState: (state) => initialState(),

    /**
     *
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setAlert: (state, action) => {
      state.alert = action.payload;
    },

    setAcceptedAlert: (state, action) => {
      state.isAcceptedAlert = action.payload;
    },

    setShowAlert: (state, action) => {
      state.isShowAlert = action.payload;
    },
    /**
     * Correspond of type the alert to display:
     * if value is 0: Display dialog alert
     * but if value is 1: Display the snackbar
     * @param {} state
     * @param {*} action
     */
    setTypeAlert: (state, action) => {
      state.typeAlert = action.payload;
    },
  },
});
//Export the action to reducer of alert
export const {
  setAlert,
  setTypeAlert,
  resetAlertSliceState,
  setAcceptedAlert,
  setShowAlert,
} = alertSlice.actions;
export default alertSlice.reducer;
