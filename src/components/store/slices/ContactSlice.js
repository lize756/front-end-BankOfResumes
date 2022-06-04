import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../config/axios";
import { setAlert, setShowAlert, setTypeAlert } from "./AlertSlice";

let headers;
/**
 * Initial state of ContactSlice
 * @returns
 */
const initialState = () => ({
  // List the contact of the database
  listContacts: [],
  // Inter request
  contact: {},
  // List the intern rquests z a one company
  listContactsOfCompany: [],
  // Allow verified if a one element in the store in update
  isRenderContact: false,
});
/**
 * This slice containt all related to the requests of the contact.
 */
export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState(),
  reducers: {
    resetContactSliceState: (state) => initialState(),

    /**
     * Allows you to get data from a contact
     * @param {*} state Corresponds to the initial or current state of the slice
     * @param {*} action Corresponds to the action to be performed on the state of the slice
     */
    setContact: (state, action) => {
      state.contact = action.payload;
    },

    setListcontacts: (state, action) => {
      state.listContacts = action.payload;
    },
    setListContactsOfCompany: (state, action) => {
      state.listContactsOfCompany = action.payload;
    },
    setIsRenderContact: (state, action) => {
      state.isRenderContact = action.payload;
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
 *  Allow us add new contact to the database
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contact Correspond of element to add.
 * @returns
 */
export const addContact = (ACCESS_TOKEN, contact) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .post("/api/contacts/add", contact, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
      dispatch(setIsRenderContact(true));
      // Allow display alert when is create a contact
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se creo correctamente el contacto",
          alertSeverity: "success",
          alertPositionH: "left",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      // Allow display alert when the contact was not created correctly
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo crear el contacto",
          alertSeverity: "error",
          alertPositionH: "left",
        })
      );
    });
};

/**
 * Allows to added one list of contacts in the database
 * @param {*} contacts contacts to add.
 * @returns
 */
export const addContacts = (contacts) => async (dispatch) => {
  axios
    .post("/api/contacts/addContacts", contacts)
    .then((res) => {
      dispatch(setListContactsOfCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 *  Allow update a contact.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId contId id of the contact to update.
 * @param {*} contact new contact to update.
 * @returns
 */
export const updateContact = (ACCESS_TOKEN, contId, contact) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .put("/api/contacts/update/" + contId, contact, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
      dispatch(setIsRenderContact(true));
      // Allow display alert when is update a contact
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se actualizo correctamente el contacto",
          alertSeverity: "info",
          alertPositionH: "left",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      // Allow display alert when the contact was not update correctly
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo actualizar el contacto",
          alertSeverity: "error",
          alertPositionH: "left",
        })
      );
    });
};

/**
 * Allows delete a contact through you id
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId id of the contact that you want to delete
 * @returns
 */
export const deleteContact = (ACCESS_TOKEN, contId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };

  axios
    .delete("/api/contacts/" + contId, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
      dispatch(setIsRenderContact(true));
      // Allow display alert when is delete a contact
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "Se elimino correctamente el contacto",
          alertSeverity: "info",
          alertPositionH: "left",
        })
      );
    })
    .catch((err) => {
      console.log(err.toJSON());
      dispatch(setTypeAlert("1"));
      dispatch(setShowAlert(true));
      dispatch(
        setAlert({
          alertTitle: "No se pudo eliminar el contacto",
          alertSeverity: "error",
          alertPositionH: "left",
        })
      );
    });
};

/**
 * Allows to obtain a contact with its id.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} contId contId id to search a one contact
 * @returns
 */
export const getContact = (ACCESS_TOKEN, contId) => async (dispatch) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("/api/contacts/" + contId, { headers })
    .then((res) => {
      dispatch(setContact(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of contacts saved in the database.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @returns
 */
export const getContacts = (ACCESS_TOKEN) => (dispatch) => {
  const headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("api/contacts", { headers })
    .then((res) => {
      dispatch(setListcontacts(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

/**
 * Allows to obtain the list of contacts associated to company.
 * @param {*} ACCESS_TOKEN Token of the user that login to the system
 * @param {*} companyId id of the company from which its want obtain the list of contacts.
 * @returns
 */
export const getContactsAssociatedCompany = (ACCESS_TOKEN, companyId) => (
  dispatch
) => {
  headers = {
    Authorization: `${ACCESS_TOKEN}`,
  };
  axios
    .get("/api/contacts/comp/" + companyId, { headers })
    .then((res) => {
      dispatch(setListContactsOfCompany(res.data));
    })
    .catch((err) => {
      console.log(err.toJSON());
    });
};

//Export the action to reducer of contact
export const {
  setContact,
  setIsRenderContact,
  resetContactSliceState,
  setListcontacts,
  setListContactsOfCompany,
} = contactSlice.actions;
export default contactSlice.reducer;
