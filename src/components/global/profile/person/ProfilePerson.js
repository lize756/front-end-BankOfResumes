import React from "react";
import ProfileGeneral from "./ProfileGeneral";
import ProfilePassword from "../ProfilePassword";

const ProfilePerson = () => {
  return (
    <div>
      <ProfileGeneral />
      <ProfilePassword />
    </div>
  );
};

export default ProfilePerson;
