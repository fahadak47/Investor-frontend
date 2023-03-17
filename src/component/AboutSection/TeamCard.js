import React from "react";
import { RatingStar } from "rating-star";

const TeamCard = () => {
  return (
    <div className="col-lg-4  col-12  mx-3 mt-2 team_section">
      <div class="card border-0">
        <div class="card-body">
          <h3 class="card-title text-center">john</h3>
          <h5 className="text-center">Web Designer</h5>
          <p class="card-text text-muted">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eaque totam cumque earum nihil perferendis
            voluptates aliquam ea, sit ducimus rem aspernatur placeat expedita
            excepturi amet distinctio. Sequi fugit quidem possimus?
          </p>
          {/* <StarsRating count={5} value={3} size={24} color2={"#ffd700"} /> */}
          <RatingStar maxScore={10} id="123" size={15} rating={7} />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
