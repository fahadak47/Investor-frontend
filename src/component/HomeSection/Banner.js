import React from "react";

const Banner = () => {
  return (
    <div>
      <section id="home">
        <div className="container-fluid px-0 top-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <h1>
                  Everyone should be able to in the next
                  <span color="banner-heading-primary"> big thing.</span>
                </h1>
                <p className="text-white">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Molestias, quisquam?
                </p>
              </div>
              <div className="mt-4">
                <button className="white-btn rounded  mx-4">
                  Start Investing
                </button>
                <button className="main-btn rounded ms-lg-4 mt-lg-0 mt-4 mx-4">
                  Start Investing <i className="fas fa-angle-right ps-3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
