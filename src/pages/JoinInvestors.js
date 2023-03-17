import React from "react";
import TopSection from "../component/Common/TopSection";
import InvestorPresenator from "../component/HomeSection/InvestorPresenator";

export default function JoinInvestors() {
  return (
    <div className="joinInvestors container-fluid py-5">
      <TopSection
        mainHeading="Join 697,000+ Investors"
        desc="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et ju"
      />

      <InvestorPresenator />
   
    </div>
  );
}
