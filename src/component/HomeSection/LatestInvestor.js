import React from "react";
import InvestorCard from "./InvestorCard";

const LatestInvestor = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">Latest Companies</h1>
      <p className="text-muted text-center">
        Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
      </p>
      <div className="row justify-content-center ">
        <InvestorCard mark={true} />
        <InvestorCard mark={true} />
        <InvestorCard mark={true} />
        <InvestorCard mark={true} />
        <InvestorCard mark={true} />
        <InvestorCard mark={true} />
      </div>
      <h1 className="text-center mt-5">Join 697,000+ investors</h1>
      <p className="text-muted text-center">
        From Seed stage startups to Series C, every company on SeedInvest has
        made it through our rigorous vetting process.
      </p>
      <p className="text-muted text-center GetStartFooter">
        Browse companies currently raising on the platform.
      </p>
    </div>
  );
};

export default LatestInvestor;
