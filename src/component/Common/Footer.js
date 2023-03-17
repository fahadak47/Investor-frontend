import React from "react";
import { Link, useLocation } from "react-router-dom";
export const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/signUpUser" &&
        location.pathname !== "/signUpCompany" && (
          <>
            <footer className="main_footer mt-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-lg-6 col-12 text-md-start text-center">
                    <h3 className="text-white mt-3 ">Catergory</h3>
                    <a className="fCatbtn">Oil &amp; Gas</a>
                    <a className="fCatbtn">Fashion</a>
                    <a className="fCatbtn">Men's Fashion</a>
                    <a className="fCatbtn">Women Fashion</a>
                    <a className="fCatbtn">Babies &amp; Toys </a>
                    <a className="fCatbtn"> Sport &amp; outDoor</a>
                    <a className="fCatbtn">Watches ,bags &amp; jewellery</a>
                    <a className="fCatbtn">Automotive &amp; MotorBike</a>
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="row">
                      <div className="col-lg-6 col-12 text-md-start text-center">
                        <h3 className="text-white mt-3">Usefull Links</h3>
                        <ul className="footer_nav">
                          <li>
                            <Link className="nav-link text-white" to="/">
                              Home
                            </Link>
                          </li>
                          <li>
                            <Link className="nav-link text-white" to="/about">
                              About
                            </Link>
                          </li>
                          <li>
                            <Link className="nav-link text-white" to="/Contact">
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-12 mx-auto text-md-start text-center">
                        <h3 className="text-white mt-3">Contact</h3>
                        <p>
                          <i class="fa-solid fa-message mx-2 text-white"></i>
                          <span className="email_footer text-white">
                            info1233@example.com
                          </span>
                        </p>
                        <h3 className="text-white mt-3"> Payment</h3>
                        <p>
                          <i class="fa-brands fa-cc-visa mx-2 text-white"></i>
                          <i class="fa-brands fa-cc-apple-pay mx-2 text-white"></i>
                          <i class="fa-brands fa-cc-paypal mx-2 text-white"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
            <div className="second_footer">
              <p className="text-center text-white">
                Copyright © 2022 Investor Presentations
              </p>
            </div>
          </>
        )}
    </>
  );
};
