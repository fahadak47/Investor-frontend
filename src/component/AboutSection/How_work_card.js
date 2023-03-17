import React from "react";
const How_work_card = ({ tilte, icon, para }) => {
  return (
    <div className="col-lg-3 col-12 border-0">
      <div class="card mt-2 mx-auto border-0 about_how_work ">
        <div>
          <p className="text-center HowCard_icon ">{icon}</p>
        </div>
        <div class="card-body">
          <h3 class="card-title text-center text-black">{tilte}</h3>
          <p class="card-text text-muted text-center ">{para}</p>
        </div>
      </div>
    </div>
  );
};

export default How_work_card;
