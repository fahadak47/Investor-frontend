import React from "react";
import Slider from "react-slick";
import img1 from "../../images/aboutSlider1.jpeg"
import img2 from "../../images/aboutSlider2.jpeg"
import img3 from "../../images/aboutSlider3.jpeg"
import img4 from "../../images/aboutSlider4.jpeg"


const AboutSlider = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="container wrapper">
      <div className="row">
        <div className="col-lg-6 col-12 px-3">
          <h1>About Us</h1>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered by injected humour, or randomised words
            which don't look even slightly believable. If you are going to use a
            passage of Lorem Ipsum
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English.
          </p>
          <div>
            <a className="white-btn m-3 rounded ">Start Investing</a>
            <a className="main-btn m-3 rounded">Start Investing</a>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <Slider {...settings}>
            <div>
              <img className="img_about" width={500} src={img1} />
            </div>
            <div>
              <img className="img_about" width={500} src={img2}/>
            </div>
            <div>
              <img className="img_about" width={500} src={img3}/>
            </div>
            <div>
              <img className="img_about"  width={500} src={img4}/>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;
