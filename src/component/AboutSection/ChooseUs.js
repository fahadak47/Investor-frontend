import React from "react";
import ChooseCard from "./ChooseCard";

const ChooseUs = () => {
  return (
    <div className="container wrapper">
      <h1 className="text-center">Why Choose Us?</h1>
      <p className="text-center">
        Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
      </p>
      <div className="row">
        <ChooseCard
          icon={
            <i className="fa fa-bullhorn fs-30 text-primary icon-lineheight"></i>
          }
          title="Provide Free Listings"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
        <ChooseCard
          icon={<i className="fa fa-heart fs-30"></i>}
          title="Best Ad Ratings"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
        <ChooseCard
          icon={
            <i className="fa fa-bookmark fs-30 text-primary icon-lineheight"></i>
          }
          title="Provide Post Features"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
        <ChooseCard
          icon={
            <i className="fa fa-line-chart fs-30 text-primary icon-lineheight"></i>
          }
          title="See your Ad Progress"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
        <ChooseCard
          icon={<i class="fa-solid fa-handshake"></i>}
          title="User Friendly"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
        <ChooseCard
          icon={<i className="fa fa-phone fs-30"></i>}
          title="24/7 Support"
          para="our being able to do what we like best, every pleasure is to be welcomed and every pain."
        />
      </div>
    </div>
  );
};

export default ChooseUs;
