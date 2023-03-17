import React from "react";
import { AroundCompany } from "../component/homeNew/AroundCompany";
import ExploreInvestment from "../component/homeNew/ExploreInvestment";
import HeroSection from "../component/homeNew/HeroSetion";
import HowItWork from "../component/homeNew/HowItWork";
import Questions from "../component/homeNew/Questions";
import RaiseAround from "../component/homeNew/RaiseAround";
import Review from "../component/HomeSection/Review";
import JoinInvestors from "./JoinInvestors";

export default function HomeNew() {
  return (
    <div>
      <HeroSection />
      <div className="container">
        <ExploreInvestment />
        <HowItWork />
      </div>

        <JoinInvestors />
        <AroundCompany />
        <RaiseAround />
        <Questions />

        {/* <Review /> */}
    </div>
  );
}
