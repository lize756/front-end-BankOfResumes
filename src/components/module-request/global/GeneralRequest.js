import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Chip,
  ListItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TimeIcon from "@mui/icons-material/AccessTimeFilled";
import SchoolIcon from "@mui/icons-material/School";
//redux
import { useDispatch, useSelector } from "react-redux";
import { updateInternRequest } from "../../store/slices/InternRequestSlice";

const GeneralRequest = () => {
  /**
   * ------------------------------------------
   * ------------------REDUX-------------------
   * ------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  //Get acces_token of the user that start section
  const ACCESS_TOKEN =
    "Bearer " + useSelector((state) => state.userLogin).responseUserLogin.token;

  const currentRol = useSelector((state) => state.userLogin.rolee);

  const isDisable = currentRol !== "ROLEE_LOCATION_COORDINATOR" ? true : false;

  // Current request
  const currentIntReq = useSelector((state) => state.InternRequestSlice.intReq);
  //Correspond to info that it have the current intern request.
  const request = {
    inteRequId: currentIntReq.inteRequId,
    inteRequName: currentIntReq.inteRequName,
    companyName: currentIntReq.company.compName,
    inteRequNumber: currentIntReq.inteRequNumber,
    inteRequStDate: currentIntReq.inteRequStDate,
    inteRequDuration: currentIntReq.inteRequDuration,
    inteRequSalary: currentIntReq.inteRequSalary,
    inteRequDepartment: currentIntReq.inteRequDepartment,
    inteRequBondingType: currentIntReq.inteRequBondingType,
    inteRequFunctions: currentIntReq.inteRequFunctions,
    inteRequCompetencies: currentIntReq.inteRequCompetencies,
    inteRequOtherBenefits: currentIntReq.inteRequOtherBenefits,
    inteRequStatus: currentIntReq.inteRequStatus,
    inteRequPracticeModality: currentIntReq.inteRequPracticeModality,
    inteRequCountryName: currentIntReq.inteRequCountryName,
    inteRequCityName: currentIntReq.inteRequCityName,
    company: currentIntReq.company,
    careers: currentIntReq.careers,
  };

  // Its represents the list of status that intern request could have.
  const listStatus = ["Nuevo", "Visto", "En proceso", "Terminado"];

  //Obtein the event of the button
  const handleChangeRadioButton = (value) => {
    request.inteRequStatus = value;
    dispatch(updateInternRequest(ACCESS_TOKEN, request.inteRequId, request));
  };

  return (
    <>
      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          align="center"
          color="primary"
        >
          {request.inteRequName}
        </Typography>

        <Box sx={{ mx: 4, mt: 2, pb: 2 }}>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <HomeIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.companyName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <MoneyIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequSalary}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <EventIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequStDate}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <FlagIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequCountryName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={2}>
                <SchoolIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequNumber === 1
                    ? request.inteRequNumber + " Estudiante"
                    : request.inteRequNumber + " Estudiantes"}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6} mb={2}>
              <Stack direction="row" spacing={2}>
                <LocationCityIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequCityName}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} mb={0}>
              <Stack direction="row" spacing={2}>
                <TimeIcon />
                <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
                  {request.inteRequDuration}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Estado de la solicitud
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={request.inteRequStatus}
                  onChange={(e, value) => {
                    handleChangeRadioButton(value);
                  }}
                >
                  {listStatus.map((option) => (
                    <FormControlLabel
                      value={option}
                      control={<Radio />}
                      label={option}
                      disabled={isDisable}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          ml={1}
          color="primary"
        >
          Información General
        </Typography>

        <Box ml={3} mt={2}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Area o departamento de la solicitud:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
              ml: 2,
              mt: 1,
            }}
          >
            <Chip
              label={request.inteRequDepartment}
              color="error"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Carreras:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.careers.map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data.careId}>
                    <Chip
                      label={data.careName}
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Funciones principales:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.inteRequFunctions.split(",").map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data}>
                    <Chip label={data} color="success" variant="outlined" />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Competencias claves:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {request.inteRequCompetencies.split(",").map((data) => {
              return (
                <Stack direction="row" spacing={1}>
                  <ListItem key={data}>
                    <Chip label={data} color="warning" variant="outlined" />
                  </ListItem>
                </Stack>
              );
            })}
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mt: 4, mx: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          ml={1}
          mt={1}
          color="primary"
        >
          Información específica
        </Typography>
        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Tipo de vinculación:
          </Typography>
          <Typography
            variant="subtitle2"
            ml={2}
            mt={1}
            sx={{ fontWeight: "medium" }}
          >
            {request.inteRequBondingType}
          </Typography>
        </Box>
        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Modalidad de práctica:
          </Typography>
          <Typography
            variant="subtitle2"
            ml={2}
            mt={1}
            sx={{ fontWeight: "medium" }}
          >
            {request.inteRequPracticeModality}
          </Typography>
        </Box>

        <Box ml={3} mt={1}>
          <Typography variant="p" sx={{ fontWeight: "bold" }}>
            Otros beneficios:
          </Typography>
          <Typography
            variant="subtitle2"
            ml={2}
            mt={1}
            sx={{ fontWeight: "medium" }}
          >
            {request.inteRequOtherBenefits}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default GeneralRequest;
