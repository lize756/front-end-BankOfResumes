import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeCompany from "../../pages/CompanyApp";

import Profile from "../../components/global/profile/company/ProfileCompany";
import Graduated from "../../components/module-graduated/global/filters/GraduatedFilters";
import CurriculumGL from "../../components/module-graduated/global/curriculum/CurriculumGL";

const MainCompany = () => {
  return (
    <>
      <Routes>
        {/** ====================================Profile==================================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        {/** ====================================Graduated==================================== */}

        <Route path="/company" element={<HomeCompany />}>
          <Route path="home" element={<Graduated />} />
        </Route>

        <Route path="/company" element={<HomeCompany />}>
          <Route path="home/curriculum" element={<CurriculumGL />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainCompany;
