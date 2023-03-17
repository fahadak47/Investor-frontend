import React from "react";
import { Link } from "react-router-dom";
const Header = ({ title, Links }) => {
  return (
    <div className="header_wrapper d-flex flex-column align-items-center ">
      <h1 className="header_heading text-center text-white ">{title}</h1>
      <nav aria-label="breadcrumb" className="text-white">
        <ol className="breadcrumb text-white ">
          {Links.map((ele) => {
            return (
              <li className="breadcrumb-item">
                <Link
                  className={`text-decoration-none text-white ${
                    ele.Active && "active"
                  }`}
                  to={ele.link}
                >
                  {ele.Name}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Header;
