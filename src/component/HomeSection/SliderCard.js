import React from "react";
const SliderCard = () => {
  return (
    <div className="card mx-auto p-1 company_slider_card">
      <img
        className="card-img-top Card_company_img"
        src="images/company_slide.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <div className="card_absolute">
          <p className="text-white  text-left px-2">Card title</p>
        </div>

        <h5 className="card-title">Card title</h5>
        <p className="card-text text-black">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a className="white-btn">Learn More</a>
      </div>
    </div>
  );
};

export default SliderCard;
