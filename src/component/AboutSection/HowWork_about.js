import React from "react";
import How_work_card from "./How_work_card";

const HowWork = () => {
  return (
    <div className="container wrapper ">
      <h1 className="text-center"> How It Works? </h1>
      <p className="text-center">
        Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
      </p>
      <div className="row">
        <How_work_card
          tilte="Create Account"
          para="Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus"
          icon={<i class="fa-solid fa-user"></i>}
        />
        <How_work_card
          tilte="Promote Listing"
          icon={<i class="fa-solid fa-clipboard"></i>}
          para="Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus"
        />
        <How_work_card
          tilte="View location"
          para="Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus"
          icon={<i class="fa-sharp fa-solid fa-location-dot"></i>}
        />
        <How_work_card
          tilte="Get Business"
          para="Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus"
          icon={<i class="fa-solid fa-hand-holding-dollar"></i>}
        />
      </div>
    </div>
  );
};

export default HowWork;
