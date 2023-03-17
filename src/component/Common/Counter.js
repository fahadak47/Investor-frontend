import React from "react";
import CountUp from "react-countup";

const Count = () => {
  return (
    <>
      <section className="counter">
        <section className="counter-section">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-3 md-lg-0 mb-md-0 mb-5">
                <p className="counter_para">
                  <i className="fa fa-home"></i>
                </p>
                <p>Total Companies</p>
                <CountUp className="counter" end={300} />
              </div>
              <div className="col-md-3 md-lg-0 mb-md-0 mb-5">
                <p className="counter_para">
                  <i className="fa fa-user"></i>
                </p>
                <p>Total Users</p>
                <CountUp className="counter" end={500} />
              </div>
              <div className="col-md-3 md-lg-0 mb-md-0 mb-5">
                <p className="counter_para">
                  <i className="fa fa-rocket"></i>
                </p>
                <p>Total Catergory</p>
                <CountUp className="counter" duration={3} end={200} />
              </div>
              <div className="col-md-3 md-lg-0 mb-md-0 mb-5">
                <p className="counter_para">
                  <i className="fa fa-cubes"></i>
                </p>
                <p>Happy Customer</p>
                <CountUp className="counter" duration={4} end={1000} />
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* <CountUp className='counter' end={100} duration={5} />+ */}
    </>
  );
};

export default Count;
