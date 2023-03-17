import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterCompany } from "../../api/AuthApi";
import { dataCleaning, dataWithFiles } from "../../helper/common_functions";
import { storeAppState } from "../../helper/storgeHandler";
import PhoneInput from "react-phone-number-input";
import {
  displayErrorToast,
  displaySuccessToast,
  displayWorrningToast,
} from "../../helper/toast_notification_function";

import {
  SAVE_GETTING_AUTH_STATE,
  START_GETTING_AUTH_STATE,
} from "../../redux/constants/auth_Constants";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getAllIndustriesHandle } from "../../redux/actions/getAllIndustriesAction";

const CompanyRegister = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { getAllIndustries, error } = useSelector(
    (state) => state.getAllIndustriesReducer
  );

  const [CompanySign, SetCompanySign] = useState({
    company_name: "",
    // contact_number: null,
    address: "",
    email: "",
    password: "",
    industry_id: "",
    logo: "",
    description: "",
    employer_identification_number: "",
    region_of_formation: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    primary_contact_first_name: "",
    primary_contact_last_name: "",
    primary_contact_email: "",
    primary_contact_number: null,
    // primary_contact_date_of_birth: "",
    primary_contact_tax_identification_number: "",
    primary_contact_address: "",
    primary_contact_city: "",
    primary_contact_state: "",
    primary_contact_zip: "",
    primary_contact_country: "",
    is_level_two_profile: false,
  });

  const navigate = useNavigate();

  const handleChanger = (e) => {
    const { name, value } = e.target;
    if (name === "logo") {
      console.log("on change handler", e.target?.files[0]);
      SetCompanySign({ ...CompanySign, [name]: e.target.files[0] });
    } else {
      SetCompanySign({ ...CompanySign, [name]: value });
    }
  };
  console.log("==========", CompanySign, "=================");
  const formHandler = (e) => {
    const nameRegex = /^[a-zA-Z ]{3,255}$/;
    // const numberRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    e.preventDefault();
    console.log(CompanySign, "chvk");
    if (
      !CompanySign.email ||
      !CompanySign.company_name ||
      !CompanySign.password ||
      !CompanySign.city ||
      !CompanySign.zip ||
      !CompanySign.state ||
      !CompanySign.country ||
      !CompanySign.industry_id ||
      !CompanySign.primary_contact_first_name ||
      !CompanySign.primary_contact_last_name ||
      !CompanySign.primary_contact_email ||
      !CompanySign.logo
    ) {
      displayWorrningToast("Please Enter complete Information");
    } else {
      if (!nameRegex.test(CompanySign.primary_contact_first_name)) {
        return displayWorrningToast(
          "First Name should be alphabet and lenght greater than 3"
        );
      }
      if (!nameRegex.test(CompanySign.primary_contact_last_name)) {
        return displayWorrningToast(
          "Last Name should be alphabet and lenght greater than 3"
        );
      }
      // if (!numberRegex.test(CompanySign.contact_number)) {
      //   return displayWorrningToast("Please enter valid Contact Number");
      // }
      if (
        !emailRegex.test(CompanySign.email) ||
        !emailRegex.test(CompanySign.primary_contact_email)
      ) {
        return displayWorrningToast("Please Enter valid Email Address");
      }
      setLoading(true);

      RegisterCompany(dataWithFiles(dataCleaning(CompanySign)))
        .then((res) => {
          if (res.data.success) {
            e.target.reset();
            displaySuccessToast("You are registered successfully please login");
            setLoading(false);
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log("company signUp err", err);
          setLoading(false);
          displayErrorToast(err);
        });
    }
  };

  useEffect(() => {
    getAllIndustriesHandle(dispatch);
  }, []);
  return (
    <div>
      <h3 className="text-center mt-3 fw-bold">
        Join Our Network As a Company
      </h3>
      <p className="text-muted text-center">
        Start building your diversified, vetted <br />
        startup portfolio today.
      </p>

      <form className="py-md-3" onSubmit={formHandler}>
        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="CompanyName" className="fw-bold mb-2">
              Company Name
            </label>
            <input
              required
              maxLength={205}
              type="text"
              className="form-control "
              name="company_name"
              onChange={handleChanger}
              value={CompanySign.company_name}
              id="CompanyName"
              placeholder="Company Name"
            />
          </div>
          {/*=========================== new field====================================== */}
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="region_of_formation" className="fw-bold mb-2">
              Region of Formation
            </label>
            <input
              maxLength={65}
              type="text"
              className="form-control "
              name="region_of_formation"
              onChange={handleChanger}
              value={CompanySign?.region_of_formation}
              id="region_of_formation"
              placeholder="Region of formation"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mt-3 col-lg-6">
            <label for="emailAddress" className="fw-bold mb-2">
              Email address
            </label>
            <input
              required
              type="email"
              onChange={handleChanger}
              value={CompanySign.email}
              className="form-control form-control-lg"
              name="email"
              id="exampleInputEmail1"
              placeholder="Email"
            />
          </div>

          {/*=========================== new field====================================== */}

          <div className="form-group mb-2 mt-3 col-lg-6">
            <label
              for="employer_identification_number"
              className="fw-bold mb-2"
            >
              Employer Identification Number (EIN)
            </label>
            <input
              maxLength={10}
              type="text"
              onChange={handleChanger}
              value={CompanySign.employer_identification_number}
              className="form-control form-control-lg"
              name="employer_identification_number"
              id="employer_identification_number"
              placeholder="EIN"
            />
          </div>
        </div>

        <div className="form-group mt-3">
          <label for="pword" className="fw-bold mb-2">
            Password
          </label>
          <div className="input-group">
            <input
              maxLength={205}
              required
              type={!showPass ? "password" : "text"}
              value={CompanySign.password}
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

        <div className="form-group mb-2 mt-3">
          <label htmlFor="description" className="fw-bold mb-2">
            Description
          </label>
          <textarea
            maxLength={500}
            placeholder="company description"
            className="form-control "
            name="description"
            id="description"
            onChange={handleChanger}
          />
        </div>

        <div className="form-group mb-2 mt-3 ">
          <label for="Address" className="fw-bold mb-2">
            Upload Company Logo (gif,jpeg,png)
          </label>
          <br />
          <br />
          <input
            required
            type="file"
            accept="image/*"
            className="form-control "
            name="logo"
            id="logo"
            onChange={handleChanger}
            placeholder="logo"
          />
        </div>

        <div className="row">
          {/* <div className="form-group mb-2 mt-3 hide_increament_button col-lg-6">
            <label for="ContactNumber" className="fw-bold mb-2">
              Contact Number <span> (e.g +923123456789)</span>
            </label>
            <PhoneInput
              className="form-control hide_increament_button "
              placeholder="Enter phone number"
              value={CompanySign.contact_number}
              onChange={(value) => {
                SetCompanySign({ ...CompanySign, contact_number: value });
              }}
            />
          </div> */}

          <div class="form-group mb-2 mt-3 col-lg-6">
            <label className="fw-bold mb-2">Industry</label>
            <select
              required
              onChange={handleChanger}
              id="industry_type"
              value={CompanySign.industry_id}
              class="form-control "
              name="industry_id"
            >
              <option value=""> Select Category</option>
              {getAllIndustries.length !== 0
                ? getAllIndustries.map((val, ind) => {
                    return (
                      <>
                        <option key={ind} value={val?.id}>
                          {val?.title}
                        </option>
                      </>
                    );
                  })
                : null}
            </select>
          </div>
        </div>

        <div className="form-group mb-2 mt-3 ">
          <label for="Address" className="fw-bold mb-2">
            Address
          </label>
          <input
            maxLength={205}
            type="text"
            className="form-control "
            name="address"
            onChange={handleChanger}
            value={CompanySign.address}
            id="compAddress"
            placeholder="Address"
          />
        </div>

        {/*=========================== new field====================================== */}

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="Address" className="fw-bold mb-2">
              City
            </label>
            <input
              maxLength={45}
              required
              type="text"
              className="form-control "
              name="city"
              onChange={handleChanger}
              value={CompanySign.city}
              id="City"
              placeholder="City"
            />
          </div>

          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="Address" className="fw-bold mb-2">
              State
            </label>
            <input
              maxLength={45}
              required
              type="text"
              className="form-control "
              name="state"
              onChange={handleChanger}
              value={CompanySign.state}
              id="state"
              placeholder="state"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="Address" className="fw-bold mb-2">
              Zip
            </label>
            <input
              maxLength={25}
              required
              type="text"
              className="form-control "
              name="zip"
              onChange={handleChanger}
              value={CompanySign.zip}
              id="zip"
              placeholder="zip"
            />
          </div>

          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="Address" className="fw-bold mb-2">
              Country
            </label>
            <input
              maxLength={35}
              required
              type="text"
              className="form-control "
              name="country"
              onChange={handleChanger}
              value={CompanySign.country}
              id="country"
              placeholder="country"
            />
          </div>
        </div>
        <FormGroup>
          <label for="presentatio-checkbox12" className="fw-bold mt-3">
            Profile Visiblity
          </label>
          <Form.Check
            type={"checkbox"}
            id="presentatio-checkbox12"
            label="make profile visible only for Level 2 user"
            value={CompanySign?.is_level_two_profile}
            onChange={(e) => {
              SetCompanySign({
                ...CompanySign,
                is_level_two_profile: e.target.checked,
              });
            }}
          />
        </FormGroup>

        <div className="row pb-2">
          <h3 className="text-center mt-3 fw-bold mt-3">Primary Contact</h3>
          <p className="text-muted text-center">
            Please add beneficial owners with more than 10% ownership in
            company.
          </p>
        </div>

        <div className="row">
          <div className="form-group mb-2 col-lg-6">
            <label for="FirstName" className="fw-bold mb-2">
              First Name
            </label>
            <input
              required
              maxLength={205}
              type="text"
              className="form-control "
              name="primary_contact_first_name"
              value={CompanySign.primary_contact_first_name}
              id="primary_contact_first_name"
              onChange={handleChanger}
              placeholder="primary first name"
            />
          </div>

          <div className="form-group mb-2  col-lg-6">
            <label for="LastName" className="fw-bold mb-2">
              Last Name
            </label>
            <input
              required
              maxLength={205}
              type="text"
              className="form-control "
              name="primary_contact_last_name"
              onChange={handleChanger}
              value={CompanySign?.primary_contact_last_name}
              id="primary_contact_last_name"
              placeholder="primary last name"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="Email" className="fw-bold mb-2">
              Email
            </label>
            <input
              required
              type="text"
              className="form-control "
              name="primary_contact_email"
              onChange={handleChanger}
              value={CompanySign.primary_contact_email}
              id="primary_contact_email"
              placeholder="Email"
            />
          </div>

          <div className="form-group mb-2 mt-3 hide_increament_button col-lg-6">
            <label for="ContactNumber" className="fw-bold mb-2">
              Contact Number <span> (e.g +923123456789)</span>
            </label>
            <PhoneInput
              className="form-control hide_increament_button "
              placeholder="Enter phone number"
              value={CompanySign.primary_contact_number}
              onChange={(value) => {
                SetCompanySign({
                  ...CompanySign,
                  primary_contact_number: value,
                });
              }}
            />
          </div>
        </div>

        {/* <div className="form-group mb-2 mt-3 ">
          <label for="primary_contact_date_of_birth" className="fw-bold mb-2">
            DOB
          </label>
          <input
            // pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"

            type="date"
            className="form-control "
            name="primary_contact_date_of_birth"
            onChange={handleChanger}
            value={CompanySign.primary_contact_date_of_birth}
            id="primary_contact_date_of_birth"
            placeholder="Dob"
          />
        </div> */}

        <div className="row">
          <div className="form-group mb-2 mt-3 ">
            <label for="primary_contact_address" className="fw-bold mb-2">
              Address
            </label>
            <input
              maxLength={205}
              type="text"
              className="form-control "
              name="primary_contact_address"
              onChange={handleChanger}
              value={CompanySign.primary_contact_address}
              id="primary_contact_address"
              placeholder="Address"
            />
          </div>
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
              name="primary_contact_city"
              onChange={handleChanger}
              value={CompanySign.primary_contact_city}
              id="primary_contact_city"
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
              name="primary_contact_state"
              onChange={handleChanger}
              value={CompanySign.primary_contact_state}
              id="primary_contact_state"
              placeholder="State"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="primary_contact_zip" className="fw-bold mb-2">
              Zip code
            </label>
            <input
              maxLength={65}
              type="text"
              className="form-control "
              name="primary_contact_zip"
              onChange={handleChanger}
              value={CompanySign.primary_contact_zip}
              id="primary_contact_zip"
              placeholder="zip"
            />
          </div>
          <div className="form-group mb-2 mt-3 col-lg-6">
            <label for="primary_contact_date_of_birth" className="fw-bold mb-2">
              Country
            </label>
            <input
              maxLength={55}
              type="text"
              className="form-control "
              name="primary_contact_country"
              onChange={handleChanger}
              value={CompanySign.primary_contact_country}
              id="primary_contact_country"
              placeholder="Country"
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mb-2 mt-3 ">
            <label
              for="primary_contact_tax_identification_number"
              className="fw-bold mb-2"
            >
              Tax id
            </label>
            <input
              maxLength={65}
              type="text"
              className="form-control "
              name="primary_contact_tax_identification_number"
              onChange={handleChanger}
              value={CompanySign.primary_contact_tax_identification_number}
              id="primary_contact_tax_identification_number"
              placeholder="id"
            />
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
                />
                Processing...
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyRegister;
