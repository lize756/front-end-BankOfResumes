import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setAcceptedAlert, setShowAlert } from "../../store/slices/AlertSlice";

const DeleteAlert = () => {
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

  const handleDisagree = () => {
    dispatch(setAcceptedAlert(false));
    dispatch(setShowAlert(false));
  };

  const handleAgree = () => {
    dispatch(setAcceptedAlert(true));
    dispatch(setShowAlert(false));
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        maxWidth={getInfoAlert.alertMaxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align= "center" id="alert-dialog-title">{getInfoAlert.alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { getInfoAlert.alertDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteAlert;
