import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Paper, TextField, Button, Grid, Box, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
/**
 * -------------------------------------------------
 * ------------------REDUX -------------------------
 * -------------------------------------------------
 */
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/slices/SignIn/LoginSlice";

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Campo requerido"),
  password: yup.string().required("Campo requerido"),
  changePassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  }),
});

const ProfilePassword = () => {
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Get userName of user that login
   const userName = useSelector((state) => state.userLogin.userName);


  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      changePassword: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      const data = values;
      const dataPasswordChange = {
        userName: userName,
        oldUserPassword: data.oldPassword,
        newUserPassword: data.password,
        confirmPassword: data.changePassword,
      };

      dispatch(changePassword(dataPasswordChange));
    },
  });
  return (
    <div>
      {" "}
      <Paper sx={{ mt: 3, ml: 5, mr: 5 }}>
        <Typography
          mt={2}
          ml={2}
          variant="h6"
          sx={{ fontWeight: "medium", color: "#072079" }}
        >
          Cambiar contraseña
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2} ml={1.5}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                sx={{ width: "85%" }}
                name="oldPassword"
                label="Contraseña actual"
                type="password"
                autoComplete="old-password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.oldPassword &&
                  Boolean(formik.errors.oldPassword)
                }
                helperText={
                  formik.touched.oldPassword && formik.errors.oldPassword
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                sx={{ width: "85%" }}
                name="password"
                label="Nueva Contraseña"
                type="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                sx={{ width: "85%" }}
                name="changePassword"
                label="Confirmar contraseña"
                type="password"
                autoComplete="change-password"
                value={formik.values.changePassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.changePassword &&
                  Boolean(formik.errors.changePassword)
                }
                helperText={
                  formik.touched.changePassword && formik.errors.changePassword
                }
              />
            </Grid>
          </Grid>

          <Box>
            <Button
              sx={{ my: 4, ml: 4 }}
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Cambiar contraseña
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default ProfilePassword;
