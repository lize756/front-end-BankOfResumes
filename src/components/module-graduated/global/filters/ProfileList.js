import React, { useEffect, useState } from "react";
import { List } from "@mui/material";

import ProfileElement from "./ProfileElement";
/**
 * -------------------------------------------------
 * ------------------REDUX -------------------------
 * -------------------------------------------------
 */
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterPersonsWithCurriculum,
  setisRenderFilter,
} from "../../../store/slices/FilterSlice";

let temporalFilter = [];
// This component represent the list of profiles
const ProfileList = () => {
  /**
   * ----------------------------------
   * -------------- REDUX -------------
   * ----------------------------------
   */
  // Allow to send the elements of store
  const dispatch = useDispatch();

  const [profiles, setProfiles] = useState([]);

  const listPersonsWithCurriculum = useSelector(
    (state) => state.PersonSlice.listPersonsWithCurriculum
  );
  const listFilterPersonWithCurriculum = useSelector(
    (state) => state.FilterSlice.filterPersonsWithCurriculum
  );

  /**
   * ----------------------------------
   *  -------------- current values to filters  ------------
   *
   */
  const listProfessionFilter = useSelector(
    (state) => state.FilterSlice.professionFilter
  );
  const listEnglishFilter = useSelector(
    (state) => state.FilterSlice.englishFilter
  );
  const listLanguageFilter = useSelector(
    (state) => state.FilterSlice.languagesFilter
  );
  const listGenderFilter = useSelector(
    (state) => state.FilterSlice.genderFilter
  );
  const listExperienceFilter = useSelector(
    (state) => state.FilterSlice.experienceFilter
  );
  const listMobilityFilter = useSelector(
    (state) => state.FilterSlice.mobilityFilter
  );
  const listSalaryFilter = useSelector(
    (state) => state.FilterSlice.salaryFilter
  );

  const isRenderFilter = useSelector(
    (state) => state.FilterSlice.isRenderFilter
  );

  /**
   * ======================================================
   * --------------  FUNCTIONS  ---------------------------
   * ======================================================
   */

  // This function allow to filter the list according to profession
  const filterByProfession = (temporalList) => {
    const arrayWithElementsToFilter = listProfessionFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = temporalList.filter((item) =>
        item.curriculum.careers.find((i) =>
          arrayWithElementsToFilter.find((j) => j.careName.includes(i.careName))
        )
      );
    }
    return res != null ? res : temporalList;
  };

  // This function allow to filter the list according to english
  const filterByEnglish = (temporalList) => {};

  /**
   * This function allow to filter the list according to languages
   * @param {*} temporalList  current temporal filter list that have the latest changes of the others filters
   * @returns new list with the filters
   */
  const filterByLanguage = (temporalList) => {
    const arrayWithElementsToFilter = listLanguageFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = temporalList.filter((item) =>
        item.curriculum.languages.find((i) =>
          arrayWithElementsToFilter.find((j) => j.name.includes(i.languName))
        )
      );
    }
    return res != null ? (res.length > -1 ? res : temporalList) : temporalList;
  };

  /**
   * This function allow to filter the list according to gender
   * @param {*} temporalList  current temporal filter list that have the latest changes of the others filters
   * @returns new list with the filters
   */
  const filterByGender = (temporalList) => {
    const arrayWithElementsToFilter = listGenderFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = auxFilter(
        temporalList,
        arrayWithElementsToFilter,
        "persGenre",
        "name"
      );
    }
    return res != null ? (res.length > -1 ? res : temporalList) : temporalList;
  };
  /**
   * This function allow to filter the list according to experience
   * @param {*} temporalList  current temporal filter list that have the latest changes of the others filters
   * @returns new list with the filters
   */
  const filterByExperience = (temporalList) => {
    const arrayWithElementsToFilter = listExperienceFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = temporalList.filter((item) =>
        arrayWithElementsToFilter.find(
          (item2) => item2 === item.curriculum.currExperience
        )
      );
    }
    return res != null ? (res.length > -1 ? res : temporalList) : temporalList;
  };

  /**
   * This function allow to filter the list according to mobility
   * @param {*} temporalList  current temporal filter list that have the latest changes of the others filters
   * @returns
   */
  const filterByMobility = (temporalList) => {
    const arrayWithElementsToFilter = listMobilityFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = auxFilter(
        temporalList,
        arrayWithElementsToFilter,
        "persIsDisability",
        "name"
      );
    }
    return res != null ? (res.length > -1 ? res : temporalList) : temporalList;
  };

  /**
   * This function allow to filter the list according to salary
   * @param {*} temporalList current temporal filter list that have the latest changes of the others filters
   * @returns
   */
  const filterBySalary = (temporalList) => {
    const arrayWithElementsToFilter = listSalaryFilter;
    let res = null;
    if (arrayWithElementsToFilter.length !== 0) {
      res = temporalList.filter((item) =>
        arrayWithElementsToFilter.find(
          (item2) => item2.name === item.curriculum.currSalary
        )
      );
    }
    return res != null ? (res.length > -1 ? res : temporalList) : temporalList;
  };

  /**
   * This is a auxiliar functions that allow filter for attributes: experience, mobility, salary, gender
   * @param {*} array1 correspond the array to filter
   * @param {*} array2 represent the elements that it want filter
   * @param {*} filterValueArray1 name of value to filter of first list
   * @param {*} filterValueArray2 name of value to filter of second list
   * @returns
   */
  const auxFilter = (array1, array2, filterValueArray1, filterValueArray2) => {
    return array1.filter((item) =>
      array2.find(
        (item2) => item2[filterValueArray2] === item[filterValueArray1]
      )
    );
  };

  //========================= End functions ================================
  useEffect(() => {
    // Allows you to make a deep copy of the array
    const temporalList = listPersonsWithCurriculum.slice();

    temporalFilter = filterByProfession(temporalList);
    temporalFilter = filterByLanguage(temporalFilter);
    temporalFilter = filterByGender(temporalFilter);
    temporalFilter = filterByExperience(temporalFilter);
    temporalFilter = filterByMobility(temporalFilter);
    temporalFilter = filterBySalary(temporalFilter);
    console.log(temporalFilter);

    dispatch(setFilterPersonsWithCurriculum(temporalFilter));
    dispatch(setisRenderFilter(false));
  }, [isRenderFilter]);

  //const filter = profileListExample.filter(filterC => Object.keys(careerFilter).every(key => filterC[key] === careerFilter[key]))
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {listFilterPersonWithCurriculum
          ? listFilterPersonWithCurriculum.map((profile, index) => {
              return (
                <ProfileElement
                  key={profile.persId}
                  profile={profile}
                  index={index}
                />
              );
            })
          : ""}
      </List>
    </>
  );
};

export default ProfileList;
