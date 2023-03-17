import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/AuthApi";
import { storeAppState } from "../../helper/storgeHandler";
import PhoneInput from "react-phone-number-input";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWorrningToast,
} from "../../helper/toast_notification_function";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TopSection from "../Common/TopSection";
import { dataCleaning } from "../../helper/common_functions";

const UserRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [UserSign, SetUserSign] = useState({
    first_name: "",
    last_name: "",
    contact_number: "",
    address: "",
    email: "",
    password: "",
    city: "",
    country: "",
    zip: "",
    state: "",
    // date_of_birth: "",
  });
  const handleChanger = (e) => {
    const { name, value } = e.target;
    SetUserSign({ ...UserSign, [name]: value });
  };
  const formHandler = (e) => {
    const nameRegex = /^[a-zA-Z ]{3,255}$/;
    // const numberRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    e.preventDefault();
    if (
      !UserSign.last_name ||
      !UserSign.first_name ||
      !UserSign.email ||
      !UserSign.password ||
      !UserSign.zip ||
      !UserSign.country
    ) {
      displayWorrningToast("Please Enter Information");
    } else {
      if (!nameRegex.test(UserSign.first_name)) {
        return displayWorrningToast(
          "First Name should be alphabet and lenght greater than 3"
        );
      }
      if (!nameRegex.test(UserSign.last_name)) {
        return displayWorrningToast(
          "Last Name should be alphabet and lenght greater than 3"
        );
      }
      if (!emailRegex.test(UserSign.email)) {
        return displayWorrningToast("Please enter valid Email Address");
      }
      setLoading(true);
      RegisterUser(dataCleaning(UserSign))
        .then((responce) => {
          setLoading(false);
          console.log("singup res log", responce);
          // saveTokens()
          // storeAppState("USER")
          navigate("/login");
          displaySuccessToast("User Registered Successfully");
        })
        .catch((err) => {
          setLoading(false);
          console.log("singup catch erreoe", err);
          displayErrorToast(err);
        });
    }
  };

  console.log(UserSign);

  return (
    <div>
      <h3 className="text-center mt-3 fw-bold font-family-poppins">
        Join Our Network As User
      </h3>
      <p className="text-muted text-center">
        Start building your diversified, vetted startup portfolio today.
      </p>
      <form className="py-md-3" onSubmit={formHandler}>
        <div className="form-group mb-2">
          <label for="FirstName" className="fw-bold pb-2">
            First Name
          </label>
          <input
            type="text"
            required
            maxLength={255}
            className="form-control"
            name="first_name"
            value={UserSign.first_name}
            onChange={handleChanger}
            id="FirstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-group mb-2 mt-3 ">
          <label for="LastName" className="fw-bold pb-2">
            Last Name
          </label>
          <input
            required
            type="text"
            maxLength={255}
            className="form-control form-control-lg"
            name="last_name"
            value={UserSign.last_name}
            onChange={handleChanger}
            id="LastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group mb-2 mt-3">
          <label for="ContactNo" className="fw-bold pb-2">
            Contact Number <span> (e.g +923123456789)</span>
          </label>
          <PhoneInput
            className="form-control hide_increament_button "
            placeholder="Enter phone number"
            value={UserSign.contact_number}
            onChange={(value) => {
              SetUserSign({ ...UserSign, contact_number: value });
            }}
          />
        </div>

        {/* <div className="form-group mb-2 mt-3 ">
          <label for="date_of_birth" className="fw-bold mb-2">
            DOB
          </label>
          <input
            maxLength={55}
            type="date"
            className="form-control "
            name="date_of_birth"
            onChange={handleChanger}
            value={UserSign.date_of_birth}
            id="date_of_birth"
            placeholder="Dob"
          />
        </div> */}

        <div className="form-group mb-2 mt-3 ">
          <label for="Address" className="fw-bold pb-2">
            Address
          </label>
          <input
            maxLength={255}
            type="text"
            value={UserSign.address}
            onChange={handleChanger}
            className="form-control"
            name="address"
            id="Address"
            placeholder="Address"
          />
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="primary_contact_city" className="fw-bold mb-2">
              City
            </label>
            <input
              maxLength={55}
              type="text"
              className="form-control "
              name="city"
              onChange={handleChanger}
              value={UserSign.city}
              id="city"
              placeholder="city"
            />
          </div>

          <div className="form-group mb-2 mt-3 col-lg-6">
            <label
              for="primary_contact_tax_identification_number"
              className="fw-bold mb-2"
            >
              State
            </label>
            <input
              maxLength={65}
              type="text"
              className="form-control "
              name="state"
              onChange={handleChanger}
              value={UserSign.state}
              id="state"
              placeholder="State"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="zip" className="fw-bold mb-2">
              Zip code
            </label>
            <input
              maxLength={65}
              required
              type="text"
              className="form-control "
              name="zip"
              onChange={handleChanger}
              value={UserSign.zip}
              id="zip"
              placeholder="zip"
            />
          </div>
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="primary_contact_date_of_birth" className="fw-bold mb-2">
              Country
            </label>
            <input
              required
              maxLength={55}
              type="text"
              className="form-control "
              name="country"
              onChange={handleChanger}
              value={UserSign.country}
              id="country"
              placeholder="Country"
            />
          </div>
        </div>

        <div className="form-group mb-2 mt-3 ">
          <label for="emailAddress" className="fw-bold pb-2">
            Email address
          </label>
          <input
            required
            type="email"
            value={UserSign.email}
            onChange={handleChanger}
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-2 mt-3">
          <label for="pword" className="fw-bold pb-2">
            Password
          </label>
          <div className="input-group">
            <input
              required
              type={!showPass ? "password" : "text"}
              value={UserSign.password}
              onChange={handleChanger}
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <div
              class="input-group-append"
              onClick={() => setShowPass((prev) => !prev)}
            >
              <span class="input-group-text " id="basic-addon2">
                {!showPass ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="form_btn d-block w-100 p-2"
            disabled={isLoading ? true : false}
          >
            {!isLoading ? (
              "SIGN UP"
            ) : (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Processing...
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
