import React from "react";

const HowWorkCard = ({ icon, tilte, para }) => {
  return (
    <div className="col-lg-4 col-12 border-dark">
      <div class="card mt-2 mx-auto how_card ">
        <div>
          <p className="text-center pt-5">{icon}</p>
        </div>
        <div class="card-body">
          <h3 class="card-title text-center text-black">{tilte}</h3>
          <p class="card-text text-muted text-center ">{para}</p>
        </div>
      </div>
    </div>
  );
};

export default HowWorkCard;
