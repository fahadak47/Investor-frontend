import React from "react";
import TeamCard from "./TeamCard";

const TeamSec = () => {
  return (
    <div className="container wrapper">
      <h1 className="text-center">Our Team</h1>
      <p className="text-center">
        Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
      </p>
      <div className="row justify-content-center">
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </div>
  );
};

export default TeamSec;
