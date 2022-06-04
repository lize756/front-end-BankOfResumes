import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

/**
 * This components allow show us a circular progress while checking the user credentials
 * @returns
 */
export const LoadingLogin = () => {
  const userRole = useSelector((state) => state.userLogin).rolee;
  // Allow navigate between roots
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      selectPath(userRole);
    }, 2000);
  }, [userRole]); // <- add the count variable here

  /**
   * This function is responsible for choosing the route that corresponds to the person logged in
   * @param {*} ROLEE Role of the person who logged in to the application
   */
  const selectPath = (ROLEE) => {
    switch (ROLEE) {
      case "ROLEE_PROMOTION_COORDINATOR":
        navigate("/promotion/home");

        break;
      case "ROLEE_LOCATION_COORDINATOR":
        navigate("/location/home");
        break;

      case "ROLEE_COMPANY":
        navigate("/company/home");
        break;

      case "ROLEE_DIRECTOR":
        navigate("/director/home");
        break;
      case "ROLEE_GRADUATE":
        navigate("/graduated/home");
        break;

      case "ROLEE_A1TALENT":
        navigate("/talents/home");
        break;
    }
  };
  return (
    <Box sx={{ display: "flex" }} alignItems="center" justifyContent="center">
      <CircularProgress
        size={"100px"}
        sx={{ marginTop: "10%", marginBottom: "10%" }}
      />
    </Box>
  );
};
