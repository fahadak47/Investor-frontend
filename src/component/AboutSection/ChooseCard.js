import React from "react";

const ChooseCard = ({ title, icon, para }) => {
  return (
    <div className=" col-lg-4 col-md-6 col-12 mt-3">
      <div class="card px-5 py-3 shadow mx-auto about_choose ">
        <div className="upper_container mt-2">
          <p className="text-center HowCard_icon ">{icon}</p>
        </div>
        <div class="card-body">
          <h3 class="card-title text-center text-black chose_heading ">
            {title}
          </h3>
          <p class="card-text text-muted text-center ">{para}</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseCard;
