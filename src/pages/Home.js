import React from "react";
import Banner from "../component/HomeSection/Banner";
import GetCard from "../component/HomeSection/GetCard";
import CompanySlider from "../component/HomeSection/CompanySlider";
import HowWork from "../component/HomeSection/HowWork";
import About from "../component/HomeSection/About";
import InvestorPresenator from "../component/HomeSection/InvestorPresenator";
import Count from "../component/Common/Counter";
import LatestInvestor from "../component/HomeSection/LatestInvestor";
import Review from "../component/HomeSection/Review";
const Home = () => {
  return (
    <div style={{ overflow: "hidden", maxWidth: "100%" }}>
      <Banner />
      <GetCard />
      <CompanySlider />
      <HowWork />
      <About />
      <InvestorPresenator />
      <Count />
      <LatestInvestor />
      <Review />
    </div>
  );
};

export default Home;
