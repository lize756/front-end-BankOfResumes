import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../StylesCompany.css";
import RegistrationBasicCompanyData from "./RegistrationBasicCompanyData";
import RegistrationContactCompany from "./RegistrationContactCompany";

//Redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setAccordinRegisterPanelValue } from "../../../store/slices/CompanySlice";
import RegistrationUserCompany from "./RegistrationUserCompany";

//Component
const AccordionRegistration = () => {
  /**
   * -------------------------------------------------
   * -------------------- REDUX ----------------------
   * -------------------------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();
  const accordionStateValue = useSelector(
    (state) => state.CompanySlice.accordinRegisterPanel
  );
  const [expanded, setExpanded] = React.useState("");

  useEffect(() => {
    setExpanded(accordionStateValue);
  }, [accordionStateValue]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    dispatch(setAccordinRegisterPanelValue(panel));
  };

  return (
    <div className="accordion-padding">
      {/*Panel 1:*/}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>
            DATOS GENERALES DE LA ORGANIZACIÓN 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*Plane 1: Form for registration of basic company data*/}
          <RegistrationBasicCompanyData />
        </AccordionDetails>
      </Accordion>
      {/** Panel 2 */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        {/*DATOS DE USUARIO*/}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>DATOS DE USUARIO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*Plane 2: Form for user registration of the company*/}
          <RegistrationUserCompany />
        </AccordionDetails>
      </Accordion>
      {/** Panel 3 */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        {/*DATOS DE CONTACTO*/}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>DATOS DE CONTACTO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/*Plane 1: Form for registration the contact of the company*/}
          <RegistrationContactCompany />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionRegistration;
