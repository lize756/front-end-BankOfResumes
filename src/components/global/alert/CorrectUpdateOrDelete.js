import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setAcceptedAlert,
  setAlert,
  setShowAlert,
} from "../../store/slices/AlertSlice";
import { AlertTitle } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CorrectUpdateOrDeletejs() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [getInfoAlert, setInfoAlert] = React.useState({});

  /**
   * --------------------------------------------------------
   * -----------------------  REDUX -------------------------
   * --------------------------------------------------------
   */
  // Allow verified if the alert change its state
  const isShowAlert = useSelector((state) => state.AlertSlice.isShowAlert);

  // Allow verified if the state of the obejct alert is change.
  const currentInfoAlert = useSelector((state) => state.AlertSlice.alert);

  React.useEffect(() => {
    setIsOpen(isShowAlert);
    setInfoAlert(currentInfoAlert);
  }, [isShowAlert, currentInfoAlert]);
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAlert({}));
    dispatch(setShowAlert(false));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={isOpen}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: `${getInfoAlert.alertPositionH}`}}
      >
        <Alert severity={getInfoAlert.alertSeverity} sx={{ width: "100%" }}>
          <AlertTitle>{getInfoAlert.alertTitle}</AlertTitle>
          {getInfoAlert.alertDescription}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
