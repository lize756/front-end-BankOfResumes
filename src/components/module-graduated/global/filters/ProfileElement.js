import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  Grid,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

import { blue } from "@mui/material/colors";

import { useNavigate } from "react-router";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurriculum } from "../../../store/slices/CurriculumSlice";

const ProfileElement = ({ index, profile }) => {
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;
  // Correspond to rol login in the system
  const rolUserLogin = useSelector((state) => state.userLogin.rolee);
  //navigate
  let navigate = useNavigate();

  /**
   * This function is responsible for choosing the route that corresponds to the person logged in
   * @param {*} ROLEE Role of the person or company who logged in to the application
   */
  const selectPathShowProfile = (ROLEE) => {
    switch (ROLEE) {
      case "ROLEE_COMPANY":
        navigate("/company/graduated/curriculum");
        break;

      case "ROLEE_A1TALENT":
        navigate("/talents/graduated/curriculum");
        break;
    }
  };

  const handleChange = () => {
    console.log(profile);
    dispatch(setCurriculum(profile));
    selectPathShowProfile(rolUserLogin);
  };
  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleChange}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[50] }}>
              <SchoolIcon color={index % 2 === 0 ? "warning" : "secondary"} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              profile.personalInformation.firstName +
              " " +
              profile.personalInformation.lastName
            }
            secondary={
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    sx={{ display: "inline" }}
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {"Email: " + profile.personalInformation.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {"Edad: " + profile.personalInformation.age}
                </Grid>
                <Grid item xs={4}>
                  {"Género: " + profile.personalInformation.gender}
                </Grid>
              </Grid>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider />
    </>
  );
};

export default ProfileElement;
