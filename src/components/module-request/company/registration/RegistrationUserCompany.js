import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAccordinRegisterPanelValue } from "../../../store/slices/CompanySlice";
import { registerUser } from "../../../store/slices/UserrSlice";

const validationSchema = yup.object({
  userEmail: yup
    .string("Ingresa el correo electrónico del usuario")
    .email("Ingresa un correo electrónico válido")
    .required("Campo obligatorio"),

  userEmailR: yup.string().when("userEmail", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("userEmail")], "Los correos electrónicos no coinciden"),
  }),

  userPassword: yup
    .string()
    .required("Campo requerido")
    .matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Debe contener al menos 8 caracteres, una mayúscula, una minúscula, y un número"
    ),

  userPasswordR: yup.string().when("userPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("userPassword")], "Las contraseñas no coinciden"),
  }),
});

const RegistrationUserCompany = () => {
  /**
   * ---------------------------------------------------------
   * -------------------------REDUX-----------------------
   * ---------------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  const companyStore = useSelector((state) => state.CompanySlice.company);
  const [getCompany, setCompany] = useState({});
  const [getEmail, setEmail] = useState("");

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

  useEffect(() => {
    setCompany(companyStore);
    setEmail(companyStore.compEmail);
  }, [companyStore]);

  // Use to styles of the view
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      userEmail: " ",
      userEmailR: "",
      userPassword: "",
      userPasswordR: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      const user = {
        userName: values.userEmail,
        userPassword: values.userPassword,
        company: getCompany,
        isEnable: true,
        rolee: {
          roleId: 5,
        },
      };
      //alert(JSON.stringify(user, null, 2));

      dispatch(registerUser(user));
      dispatch(setAccordinRegisterPanelValue("panel3"));
    },
  });

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#F2F6FE" }} />
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <TextField
              defaultValue={getCompany.compEmail}
              label="Correo electrónico de inicio de sesión"
              variant="outlined"
              type="email"
              name="userEmail"
              value={formik.values.userEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.userEmail && Boolean(formik.errors.userEmail)
              }
              helperText={formik.touched.userEmail && formik.errors.userEmail}
            />
            <TextField
              label="Repetir correo electrónico"
              variant="outlined"
              type="email"
              name="userEmailR"
              value={formik.values.userEmailR}
              onChange={formik.handleChange}
              error={
                formik.touched.userEmailR && Boolean(formik.errors.userEmailR)
              }
              helperText={formik.touched.userEmailR && formik.errors.userEmailR}
            />

            <TextField
              variant="outlined"
              fullWidth
              name="userPassword"
              label="Contraseña"
              type="password"
              value={formik.values.userPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.userPassword &&
                Boolean(formik.errors.userPassword)
              }
              helperText={
                formik.touched.userPassword && formik.errors.userPassword
              }
            />
            <TextField
              variant="outlined"
              fullWidth
              name="userPasswordR"
              label="Confirmar contraseña"
              type="password"
              value={formik.values.userPasswordR}
              onChange={formik.handleChange}
              error={
                formik.touched.userPasswordR &&
                Boolean(formik.errors.userPasswordR)
              }
              helperText={
                formik.touched.userPasswordR && formik.errors.userPasswordR
              }
            />

            <div>
              <Button type="submit" variant="contained" color="primary">
                Guardar información.
              </Button>
            </div>
          </form>
        </Container>
      </React.Fragment>
    </>
  );
};

export default RegistrationUserCompany;
