import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
//in need send the name, props?
const CardProfile = () => {
  // Correspond the name of rol that login in the system
  const loginPersOrCompName = useSelector(
    (state) => state.userLogin.loginPersOrCompName
  );

  const letterFirst = loginPersOrCompName[0];
  const name = loginPersOrCompName;
  return (
    <div>
      {" "}
      <Card sx={{ bgcolor: blue[50], borderRadius: 5, width: 230, height: 70 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#072079" }} aria-label="recipe">
              {letterFirst}
            </Avatar>
          }
          title={name}
        />
      </Card>
    </div>
  );
};

export default CardProfile;
