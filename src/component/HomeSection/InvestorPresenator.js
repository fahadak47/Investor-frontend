import React from "react";
import Slider from "react-slick";
import InvestorCard from "./InvestorCard";
const InvestorPresenator = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    responsive: [
      
    
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" container mt-3 investor " >
    
      <div className="mx-auto">
        <Slider {...settings}>
          <div>
            <InvestorCard />
          </div>
          <div>
            <InvestorCard />
          </div>
          <div>
            <InvestorCard />
          </div>
          <div>
            <InvestorCard />
          </div>
          <div>
            <InvestorCard />
          </div>
          <div>
            <InvestorCard />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default InvestorPresenator;
