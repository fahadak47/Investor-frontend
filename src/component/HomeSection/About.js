import React from "react";

const About = () => {
  return (
    <div className="mt-5 mb-5">
      <section>
        <div className="about_section">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 col-md-12 text-sec mx-auto">
                <h2>Backing visionary teams since 2012.</h2>
                <p className="text-muted">
                  We’ve helped over 250+ startups use the power of equity
                  crowdfunding to raise capital efficiently, 100% online. Their
                  work is at the heart of what we do.
                </p>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="card mx-auto border-0">
                  <img
                    style={{ alignItems: "flex-end" }}
                    src="no_image.jpg"
                    alt=""
                    className="img-fluid ms-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="about_section ">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 col-md-12 mt-2">
                <div className="card mx-auto border-0">
                  <img
                    src="no_image.jpg"
                    alt=""
                    className="img-fluid"
                    height={200}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <h2>Looking to raise a round for your company?</h2>
                <p className="text-muted">
                  Streamline your fundraising process and tap into our team of
                  fundraising experts who are 100% committed to making the
                  process a success from end to end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
