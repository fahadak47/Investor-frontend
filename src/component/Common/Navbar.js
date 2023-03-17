import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../../images/user.png";
import logo from "../../images/newlogo.png";
import { LogoutHandle } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_GETTING_AUTH_STATE } from "../../redux/constants/auth_Constants";
import { storeAppState } from "../../helper/storgeHandler";

const Navigation = () => {
  const { appState, isAppStateLoadig, error } = useSelector(
    (state) => state.AppStateReducer
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [style, setStyle] = useState();
  let navBar = document.querySelectorAll(".nav-link");
  let navCollapse = document.querySelector(".navbar-collapse.collapse");

  navBar.forEach((ele) => {
    ele.addEventListener("click", () => {
      navCollapse.classList.remove("show");
    });
  });

  const check = () => {
    // storeAppState("DASHBOARD"); // App State Flgas are COMPANY || USER
    //   dispatch({
    //     type: SAVE_GETTING_AUTH_STATE,
    //     payload: "DASHBOARD",
    //   });
    // navigate("/dashboard");
    const localState = localStorage.setItem(
      "DASHBOARD_STATE",
      "DASHBOARD_ROUTE"
    );
  };

  // console.log(location, "oooooooooooooo");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "scroll",
        () => setStyle(window.pageYOffset > 5)
        // setNews(true)
      );
    }
  }, []);

  return (
    <div className="container-fuild">
      <nav
        className={`navbar navbar-expand-lg navbar-light  bg-white ${
          location.pathname !== "/user/profile" &&
          location.pathname !== "/company" &&
          "shadow"
        } border-bottom ${!style ? "sticky-top" : "fixed-top"}`}
      >
        <Link href="/">
          <img
            src={logo}
            className=" logo px-md-3 px-2"
            alt="React Bootstrap logo"
          />
        </Link>
        <button
          className="navbar-toggler mx-4 "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0  px-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link" to="/about">
                Blog
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            {/* ================================== APPSTATE USER ====================================== */}

            {appState === "USER" ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/user/company"
                    className="main-btn rounded text-white"
                  >
                    Companies
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img width="40" src={icon} />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link class="dropdown-item" to="/user/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to="/"
                        onClick={() => LogoutHandle(dispatch)}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : appState === "COMPANY" ? (
              <>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img width="40" src={icon} />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link class="dropdown-item" to="/company/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/Profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to="/"
                        onClick={() => LogoutHandle(dispatch)}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item dropdown display-flex align-item-center ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>Sign Up</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link class="dropdown-item" to="signUpUser">
                        User
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="signUpCompany">
                        Company
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="main-btn rounded text-white">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
