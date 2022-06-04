import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../../config/axios";
import {
  resetAlertSliceState,
  setAlert,
  setShowAlert,
  setTypeAlert,
} from "../AlertSlice";
import { resetCareerSliceState } from "../CareerSlice";
import { resetCompanySliceState } from "../CompanySlice";
import { resetContactSliceState } from "../ContactSlice";
import { resetCountrySliceState } from "../CountrySlice";
import { resetCurriculumSliceState, setCurriculum } from "../CurriculumSlice";
import { resetInternRequestSliceState } from "../InternRequestSlice";
import { resetPersonSliceState } from "../PersonSlice";
import { resetUserrSliceState } from "../UserrSlice";
import { resetFilterSliceState } from "../FilterSlice";
//AUTHORIZATION
const initialAuthState = {
  isAuthenticated: true,
};
/**
 * Initial state of loginSlice
 * @returns
 */
const initialState = () => ({
  initialAuthState,
  userName: "",
  loginPersOrCompName: "",
  responseUserLogin: {},
  isLogin: false,
  rolee: "",
  userCompanyId: "",
  userPersonId: "",
  userCurriculumId: "",
});

export const LoginSlice = createSlice({
  name: "userlogin",
  initialState: initialState(),
  reducers: {
    resetLoginState: (state) => initialState(),

    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setLoginPersOrCompName: (state, action) => {
      state.loginPersOrCompName = action.payload;
    },
    setResponseUserLogin: (state, action) => {
      state.responseUserLogin = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setRolee: (state, action) => {
      state.rolee = action.payload;
    },
    setUserPersonId: (state, action) => {
      state.userPersonId = action.payload;
    },
    setUserCompanyId: (state, action) => {
      state.userCompanyId = action.payload;
    },
    setUserCurriculumId: (state, action) => {
      state.userCurriculumId = action.payload;
    }

  },
});

/**
 * This middleware allow save the all information of the saved in the store in the local storage.
 * @param {*} getState correspond in the current state of application
 * @returns return the result
 */
export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

/**
 * This function allow us refresh the information when the windows is reload
 * @returns the information saved in the store for reload it
 */
export const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
  }
};

export const logOut = () => async (dispatch) => {
  if (localStorage.getItem("applicationState") !== null) {
    try {
      localStorage.clear();
      dispatch(setIsLogin(false));
      resetAllState(dispatch);
    } catch (e) {
      console.log(
        "removeStorage: Error removing key [aplicationSate] from localStorage: " +
          JSON.stringify(e)
      );
      return false;
    }
  }
  if (localStorage.getItem("applicationState") !== null) {
    console.log("Existe");
  } else {
    console.log("No existe");
  }
  return true;
};

const resetAllState = (dispatch) => {
  dispatch(resetLoginState());
  dispatch(resetAlertSliceState());
  dispatch(resetCareerSliceState());
  dispatch(resetCompanySliceState());
  dispatch(resetContactSliceState());
  dispatch(resetCountrySliceState());
  dispatch(resetInternRequestSliceState());
  dispatch(resetPersonSliceState());
  dispatch(resetUserrSliceState());
  dispatch(resetCurriculumSliceState());
  dispatch(resetFilterSliceState());
};

/**
 * Allow us send the token to back
 * @param {*} data
 * @returns
 */
export const sendToken = (data) => async (dispatch) => {
  dispatch(setIsLogin(true));
  await axios
    .post("api/auth/signIn", data)
    .then((response) => {
      dispatch(setIsLogin(false));
      dispatch(setResponseUserLogin(response.data));
      console.log("entre", response.data.userFound);
      //Update this rol in the initial state
      dispatch(setRolee(response.data.userFound.roles[0].name));
      dispatch(setUserCurriculumId(response.data.userFound.curriculumVitae));
      // dispatch(setUserCompanyId(response.data.userCompanyId));
      // dispatch(setUserPersonId(response.data.userPersonId));
      // dispatch(setUserName(response.data.user.username));
    })
    .catch((err) => {
      console.log(err.toJSON());
      console.log(err.response.data);
      dispatch(setResponseUserLogin({}));
      dispatch(setIsLogin(false));
      // Allow display alert when not change correctly the password.
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Error en el inicio de sesión",
          alertSeverity: "error",
          alertPositionH: "right",
          alertDescription:
            "El correo electrónico o contraseña no son correctos",
        })
      );
    });
};

/**
 * Allow the user change your curren password
 * @param {*} data Represent of data that it will send of request.
 * @returns
 */
export const changePassword = (data) => async (dispatch) => {
  await axios
    .post("api/auth/changePassword", data)
    .then(() => {
      // Allow display alert when is change the password of one user.
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizó correctamente la contraseña",
          alertSeverity: "info",
          alertPositionH: "right",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      // Allow display alert when not change correctly the password.
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar la contraseña",
          alertSeverity: "error",
          alertPositionH: "right",
          alertDescription:
            "La contraseña actual es incorrecta. Por favor, vuelva a intentar.",
        })
      );
    });
};

//Export the action to reducer of userLogin
export const {
  logout,
  setUserName,
  setUserCurriculumId,
  resetLoginState,
  setLoginPersOrCompName,
  reset,
  setResponseUserLogin,
  setIsLogin,
  setRolee,
  setUserCompanyId,
  setUserPersonId,
} = LoginSlice.actions;
export default LoginSlice.reducer;
