import React from "react";
import LogoIcesi from "../../../assets/logo_icesi.png";
import LogoCEDEP from "../../../assets/logo_cedep.png";
import { Link as RouterLink, Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import "../StylesCompany.css";

const HomeRequest = (props) => {
  return (
    <>
      <div className="home-container">
        <div>
          <img
            src={LogoIcesi}
            className="rounded"
            width="180px"
            height="65px"
            alt="Universidad ICESI"
          />
          <img
            src={LogoCEDEP}
            className="rounded"
            width="180px"
            height="65px"
            alt="CEDEP"
          />
        </div>

        <nav>
          <RouterLink to="/company">Home</RouterLink>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="#"> Preguntas Frecuentes </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="#"> Contacto </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="#"> Bolsa de Empleo </Link>
          </nav>

        <h2>{props.name}</h2>

        <Outlet />
      </div>
    </>
  );
};

export default HomeRequest;