import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd";
import RemoveIcon from "@mui/icons-material/PersonRemove";
import { useNavigate } from "react-router";

//Redux
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../../../store/slices/ContactSlice";

const RegistrationContactCompany = () => {
  /**
   * ---------------------------------------------------------
   * -------------------------REDUX-----------------------
   * ---------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  const company = useSelector((state) => state.CompanySlice.company);
  // Allow navigate between roots
  let navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(2),

      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100%",
      },
      "& .MuiButtonBase-root": {
        margin: theme.spacing(2),
      },
    },
  }));

  // Use to styles of the view
  const classes = useStyles();
  const [contacts, setContacts] = useState([
    {
      id: uuidv4(),
      contName: "",
      contPosition: "",
      contEmail: "",
      contPhone: "",
    },
  ]);
  /**
   * This method allow print to console the result of the form
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    //Delete contact id from the array
    contacts.map((c) => {
      delete c.id;
      c["company"] = company;
    });
    console.log(contacts);
    dispatch(addContacts(contacts));
    navigate("/SignIn");
  };

  /**
   * This function allows to draw a new form
   */
  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        id: uuidv4(),
        contName: "",
        contPosition: "",
        contEmail: "",
        contPhone: "",
      },
    ]);
  };

  /**
   * This function allows to delete a new form
   * @param {*} id of contact
   */
  const handleRemoveContact = (id) => {
    const values = [...contacts];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setContacts(values);
  };

  /**
   * This function allows you to save changes to contact details
   * @param {*} id of contact
   * @param {*} e is a event
   */
  const handleChange = (id, e) => {
    const newContact = contacts.map((i) => {
      if (id === i.id) {
        i[e.target.name] = e.target.value;
      }
      return i;
    });

    setContacts(newContact);
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#F2F6FE" }} />
          <form className={classes.root} onSubmit={handleSubmit}>
            {contacts.map((contactP) => (
              <div key={contactP.id}>
                <TextField
                  name="contName"
                  label="Nombre contacto directo"
                  variant="outlined"
                  required
                  value={contactP.contName}
                  onChange={(e) => handleChange(contactP.id, e)}
                />
                <TextField
                  name="contPosition"
                  label="Cargo"
                  variant="outlined"
                  required
                  value={contactP.contPosition}
                  onChange={(e) => handleChange(contactP.id, e)}
                />
                <TextField
                  name="contEmail"
                  label="E-mail"
                  variant="outlined"
                  type="email"
                  required
                  value={contactP.contEmail}
                  onChange={(e) => handleChange(contactP.id, e)}
                />

                <TextField
                  name="contPhone"
                  label="Teléfono - Ext-"
                  variant="outlined"
                  required
                  value={contactP.contPhone}
                  onChange={(e) => handleChange(contactP.id, e)}
                />
                <div>
                  <IconButton onClick={handleAddContact}>
                    <AddIcon color="primary" />
                  </IconButton>
                  <IconButton
                    disabled={contacts.length === 1}
                    onClick={() => handleRemoveContact(contactP.id)}
                  >
                    <RemoveIcon color="primary" />
                  </IconButton>
                </div>
              </div>
            ))}
            <div>
              <Button type="submit" variant="contained" color="primary">
                Registrarse
              </Button>
            </div>
          </form>
        </Container>
      </React.Fragment>
    </>
  );
};

export default RegistrationContactCompany;
