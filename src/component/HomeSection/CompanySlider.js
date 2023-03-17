import React, { Component } from "react";
import Slider from "react-slick";
import SliderCard from "./SliderCard";

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 5000,
      cssEase: "linear",
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1240,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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
          breakpoint: 760,
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
      <div className="py-5 Slider-main">
        <h1 className="text-center text-white mt-2">Companies</h1>
        <p className="text-center text-white">
          Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
        </p>
        <div>
          <Slider {...settings}>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
            <div>
              <SliderCard />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
