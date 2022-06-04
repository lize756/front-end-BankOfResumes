import React from "react";
import { Routes, Route } from "react-router-dom";
import GraduatedApp from "../../pages/GraduatedApp";
import ContentsGraduated from "../../layout/graduated/ContentsGraduated";
import Curriculum from "../../components/module-graduated/graduated/CurriculumGR";
import Profile from "../../components/global/profile/person/ProfilePerson";

const MainGraduated = () => {
  return (
    <>
      <Routes>
        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="home" element={<ContentsGraduated />} />
        </Route>

        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="curriculum" element={<Curriculum />} />
        </Route>

        <Route path="/graduated" element={<GraduatedApp />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainGraduated;
