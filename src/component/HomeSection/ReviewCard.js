import React from "react";
import { RatingStar } from "rating-star";
import { Route } from "react-router-dom";

const ReviewCard = () => {
  return (
    <div className="col-lg-6 col-12 p-3  review_section mx-auto">
      <img src="no_image.jpg" alt="Card image cap" className="review_img" />
      <div class="card  border-0">
        <div class="card-body">
          <p class="card-text text-muted">
            <i class="fa-solid fa-quote-left fs-4 mx-2"></i>
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. A dicta, eligendi odit porro quo earum possimus
            minus nostrum totam commodi maxime! Ea a totam tempora numquam
            consequuntur vel impedit minima.
          </p>
          {/* <StarsRating count={5} value={3} size={24} color2={"#ffd700"} /> */}
          <div className="d-flex justify-content-between flex-row align-items-center">
            <h4 class="card-title">Card title</h4>
            <RatingStar maxScore={10} size={15} id="123" rating={7} colors="red"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
