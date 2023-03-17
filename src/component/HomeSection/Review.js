import React from "react";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";

const Review = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    // autoplay: true,
    // speed: 1000,
    // autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
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
    <div className="container">
      <Slider {...settings}>
        <div>
          <ReviewCard />
        </div>
        <div>
          <ReviewCard />
        </div>
        <div>
          <ReviewCard />
        </div>
        <div>
          <ReviewCard />
        </div>
        <div>
          <ReviewCard />
        </div>
        <div>
          <ReviewCard />
        </div>
      </Slider>
    </div>
  );
};

export default Review;
