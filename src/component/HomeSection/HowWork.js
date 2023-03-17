import React from "react";
import HowWorkCard from "./HowWorkCard";

const HowWork = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center">How Investor Presentations works</h1>
      <p className="text-muted text-center">
        From Seed stage startups to Series C, every company on SeedInvest has
        made it through our rigorous vetting process.
      </p>
      <p className="text-muted text-center GetStartFooter">
        Browse companies currently raising on the platform.
      </p>
      <div className="row">
        <HowWorkCard
          icon={<i class="fa-solid fa-phone fa-3x text-black"></i>}
          tilte="Access the startup asset class"
          para="We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class."
        />
        <HowWorkCard
          icon={<i class="fa-brands fa-facebook-f fa-3x text-black"></i>}
          tilte="Access the startup asset"
          para="We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class."
        />
        <HowWorkCard
          icon={<i class="fa-solid fa-car fa-3x text-black"></i>}
          tilte="Access the startup asset class"
          para="We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class."
        />
      </div>
    </div>
  );
};

export default HowWork;
