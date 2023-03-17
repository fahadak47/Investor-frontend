import React from "react";
import AboutSlider from "../component/AboutSection/AboutSlider";
import ChooseUs from "../component/AboutSection/ChooseUs";
import Header from "../component/Common/Header";
import HowWork_about from "../component/AboutSection/HowWork_about";
import PostingAds from "../component/AboutSection/PostingAds";
import TeamSec from "../component/AboutSection/TeamSec";
import Count from "../component/Common/Counter";

const About = () => {
  return (
    <div className="common_wrapper">
      <Header
        title="About Us"
        Links={[
          { Name: "Home", link: "/", active: false },
          { Name: "About", link: "/about", active: true },
        ]}
      />
      <AboutSlider />
      <HowWork_about />
      <PostingAds />
      <ChooseUs />
      <Count />
      <TeamSec />
    </div>
  );
};

export default About;
