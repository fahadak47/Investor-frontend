import React, { useEffect } from "react";
import { Spinner, FormGroup, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Buffer } from "buffer";
import { AntDesignOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";
import {
  GetCompanyProfileApi,
  UpdateCompanyProfileApi,
} from "../../api/companyApis/CompanyProfileApis";
import { dataWithFiles, dataCleaning } from "../../helper/common_functions";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";
import { mergedEncryption } from "../../helper/encryptData";
import { Avatar, Col, Row, Tabs, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { getVideosHandle } from "../../redux/actions/CompayVideoActions";
import { useDispatch, useSelector } from "react-redux";
import VideosComponent from "./VideosComponent";
import { Tooltip } from "antd";
import { GoPrimitiveDot } from "react-icons/go";
import checkmark from "../../images/checkMark.png";
import { getAllIndustriesHandle } from "../../redux/actions/getAllIndustriesAction";
import PhoneInput from "react-phone-number-input";

const CompanyProfile = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { videos, isVideoLoadig, videoError } = useSelector(
    (state) => state.videoReducer
  );
  const { getAllIndustries, error } = useSelector(
    (state) => state.getAllIndustriesReducer
  );

  const [userState, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [formData, setformData] = useState(null);

  console.log(getAllIndustries, "ikkkkkkk", userState, "sdsd", formData);
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "MUdassir",
    fName: "jamal",
  });

  const [convertedImg, setConvertedImg] = useState(null);
  const [levelTwoCheckBox, setLevelTwoCheckBox] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(evt) {
    const { name, value } = evt.target;
    console.log("change file ", name, evt.target.value);
    if (name === "logo") {
      console.log("change file ", `${name}`, evt.target.files[0]);
      setformData({ ...formData, [name]: evt.target.files[0] });
    } else {
      setformData({
        ...formData,
        [name]: value,
      });
    }
  }
  const converted = mergedEncryption(state);

  const handleSubmint = (e) => {
    console.log("handle submit runs", formData);
    e.preventDefault();
    if (formData) {
      let data = !formData ? userState : formData;
      console.log(
        "update company data",
        data,
        dataWithFiles(dataCleaning(data))
      );
      if (userState) {
        localStorage.setItem(
          "IP_levelTwoProfileStatus",
          JSON.stringify(levelTwoCheckBox)
        );
        UpdateCompanyProfileApi(dataWithFiles(dataCleaning(data)))
          .then((response) => {
            displaySuccessToast("Profile Updated Successfully");
            handleGetProfile();
            handleClose();
          })
          .catch((err) => displayErrorToast(err));
      }
    }
  };

  const handleGetProfile = () => {
    GetCompanyProfileApi()
      .then((response) => {
        console.log("Profile responce log", response);
        let logoBuffer = response.data?.data[0].logo;

        let base64 = Buffer.from(logoBuffer).toString("base64");

        setConvertedImg("data:image/jpg;base64," + base64);
        setUser(response.data?.data[0]);
        setformData({
          primary_contact_number:
            response.data?.data[0]?.primary_contact_number,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Profile error log", err);
      });
  };

  const calculateContNumber = () => {
    if (!formData == null || !formData.primary_contact_number) {
      return;
    }
  };

  useEffect(() => {
    handleGetProfile();
    handleClose();
    getAllIndustriesHandle(dispatch);
  }, []);

  useEffect(() => {
    getVideosHandle(dispatch);
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="container">
          <div className="main-body">
            <Spinner animation="grow" size="lg" variant="primary" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="">
          <div className="col-md-12">
            <Row style={{ marginTop: "8rem" }} gutter={[16, 48]}>
              <Col
                className="gutter-row "
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="profilrAvatar">
                  <Avatar
                    src={userState?.logo}
                    style={{ verticalAlign: "middle" }}
                    size={{
                      xs: 50,
                      sm: 80,
                      md: 100,
                      lg: 120,
                      xl: 130,
                      xxl: 140,
                    }}
                    icon={<AntDesignOutlined />}
                  />

                  <div className="profileNameDiv">
                    <h4>{userState?.company_name}</h4>
                    <h5>Accredited Investor</h5>
                  </div>
                </div>
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={24}
                lg={16}
                xl={16}
              >
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane
                    className="ProfileView"
                    tab="Account details"
                    key="1"
                  >
                    <div className="head">
                      <h3>Information</h3>

                      <Button
                        variant="btn btn-outline-primary"
                        style={{ fontSize: "small" }}
                        onClick={handleShow}
                      >
                        <BiEdit fontSize="17px" />
                      </Button>
                    </div>
                    <div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Company Name</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.company_name}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">
                              Employer Identification Number
                            </h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.employer_identification_number}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Region Formation</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.region_of_formation}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Description</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.description}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Industry</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.industry?.title}
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Contact Number</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.contact_number}
                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.email}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Address</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.address}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">City</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.city}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">State</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.state}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Zip</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.zip}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Country</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.country}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">
                              Make Profile visible only for level 2 Users
                            </h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            <Tooltip
                              placement="topLeft"
                              title={
                                userState?.is_level_two_profile
                                  ? "Visible only for level two user"
                                  : "Visible to all users"
                              }
                            >
                              <span style={{ width: "25px", height: "25px" }}>
                                {userState?.is_level_two_profile ? (
                                  <img
                                    src={checkmark}
                                    alt="icon"
                                    width={"30px"}
                                  />
                                ) : (
                                  <GoPrimitiveDot style={{ width: "22px" }} />
                                )}
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="head">
                      <h3>Primary Contact</h3>
                    </div>
                    <div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_first_name}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Last Name</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_last_name}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Tax Identification Number</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {
                              userState?.primary_contact_tax_identification_number
                            }
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Contact Number</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_number}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Contact Email</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_email}
                          </div>
                        </div>

                        {/* <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Date of Birth</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_date_of_birth}
                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Address</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_address}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">City</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_city}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">State</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_state}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Zip</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_zip}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5">
                            <h6 className="mb-0">Country</h6>
                          </div>
                          <div className="col-sm-7 text-secondary">
                            {userState?.primary_contact_country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Videos" key="2">
                    <div className="head">
                      <h3>Information</h3>
                      <Button
                        variant="primary"
                        style={{ fontSize: "small" }}
                        onClick={() => navigate("/company/presentation_videos")}
                      >
                        Manage Videos
                      </Button>
                    </div>
                    <VideosComponent userState={userState} videos={videos} />
                  </Tabs.TabPane>
                </Tabs>
              </Col>
              <Col
                className="gutter-row mt-5 px-3 py-5"
                xs={24}
                sm={24}
                md={24}
                lg={7}
                xl={7}
              >
                <h4 style={{ fontWeight: "bold", fontFamily: "poppins" }}>
                  Finish setting Up Yours Investor Account
                </h4>
                <p>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available. It is also used to temporarily replace text in a
                  process called greeking, which allows designers to consider
                  the form of a webpage or publication...
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        scrollable={true}
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="py-md-3">
            <div className="row">
              <div className="form-group mt-3 col-6">
                <label for="CompanyName" className="font-weight-bold">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="company_name"
                  onChange={handleChange}
                  defaultValue={userState?.company_name}
                  id="CompanyName"
                  placeholder="Company Name"
                />
              </div>

              <div className="form-group mt-3 col-6">
                <label for="region_of_formation" className="font-weight-bold">
                  Region Formation
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="region_of_formation"
                  onChange={handleChange}
                  defaultValue={userState?.region_of_formation}
                  id="region_of_formation"
                  placeholder="Region formation"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="description" className="font-weight-bold">
                Description
              </label>
              <textarea
                defaultValue={userState?.description}
                placeholder="company description"
                className="form-control form-control-lg"
                name="description"
                id="description"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="form-group mt-3 col-6">
                <label
                  for="employer_identification_number"
                  className="font-weight-bold"
                >
                  Employer Identification number
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="employer_identification_number"
                  defaultValue={userState?.employer_identification_number}
                  onChange={handleChange}
                  id="employer_identification_number"
                  placeholder="E.I.N"
                />
              </div>
              {/* <div className="form-group mt-3 col-6">
                <label for="ContactNumber" className="font-weight-bold">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="contact_number"
                  defaultValue={userState?.contact_number}
                  onChange={handleChange}
                  id="ContactNumber"
                  placeholder="Contact Number"
                />
              </div> */}
            </div>
            <div className="form-group mt-3 ">
              <label for="Address" className="font-weight-bold">
                Address
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="address"
                onChange={handleChange}
                defaultValue={userState?.address}
                id="compAddress"
                placeholder="Address"
              />
            </div>

            <div class="form-group mt-3">
              <label>Industry</label>

              <select
                onChange={handleChange}
                id="industry_type"
                defaultValue={userState?.industry?.id}
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
              {/* <select
                onChange={handleChange}
                id="industry_type"
                // defaultValue={userState?.industry?.title}
                defaultValue={'lklhibkk'}

                class="form-control p-2"
                name="industry"
                required
              >
                {console.log(userState?.industry?.title)}
                <option> Select Category</option>
                <option value="Oil">Oil &amp; Gas</option>
                <option value="Fashion">Fashion</option>
                <option value="Groceries">Groceries &amp; Pets</option>
                <option value="Health">Health &amp; Beauty</option>
                <option value="Men's Fashion">Men's Fashion</option>
                <option value="Women's Fashion">Women's Fashion</option>
                <option value="Babies">Babies &amp; Toys</option>
                <option value="Sports">Sports &amp; Outdoor</option>
                <option value="Watches">Watches, Bags &amp; Jewellery</option>
                <option value="Automotive">Automotive &amp; Motorbike</option>
                <option value="Energy">Energy</option>
              </select> */}
            </div>
            <div
              className="row "
              style={{ alignItems: "flex-end", gap: "5px" }}
            >
              <div className="form-group mt-3 col-11">
                <label for="Address" className="font-weight-bold ">
                  Logo (gif,jpeg,png)
                </label>
                <br />
                <br />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-lg"
                  name="logo"
                  id="logo"
                  onChange={handleChange}
                  placeholder="logo"
                />
              </div>

              <Avatar
                src={userState?.logo}
                style={{
                  verticalAlign: "middle",
                  width: "50px",
                  height: "50px",
                  boxShadow: "1px 1px 4px 1px #d3d3d369",
                }}
                // size={{

                // }}
                icon={<AntDesignOutlined />}
              />
            </div>

            <div className="form-group mt-3 ">
              <label for="emailAddress" className="font-weight-bold">
                Email address
              </label>
              <input
                type="email"
                onChange={handleChange}
                defaultValue={userState.email}
                className="form-control form-control-lg"
                name="email"
                id="exampleInputEmail1"
                placeholder="Email"
              />
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label for="country" className="font-weight-bold">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="country"
                  defaultValue={!userState?.country ? "" : userState?.country}
                  id="country"
                  onChange={handleChange}
                  placeholder=" country"
                />
              </div>

              <div className="form-group col-6">
                <label for="city" className="font-weight-bold">
                  City
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="city"
                  onChange={handleChange}
                  defaultValue={!userState.city ? "" : userState?.city}
                  id="city"
                  placeholder="city"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label for="state" className="font-weight-bold">
                  State
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="state  "
                  defaultValue={!userState?.state ? "" : userState?.state}
                  id="state"
                  onChange={handleChange}
                  placeholder="state"
                />
              </div>

              <div className="form-group col-6">
                <label for="zip" className="font-weight-bold">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="zip"
                  onChange={handleChange}
                  defaultValue={!userState.zip ? "" : userState?.zip}
                  id="zip"
                  placeholder="zip"
                />
              </div>

              <FormGroup>
                <label for="presentatio-checkbox12" className="fw-bold mt-3">
                  Profile Visiblity
                </label>
                <Form.Check
                  type={"checkbox"}
                  label="make profile visible only for Level 2 user"
                  id="presentatio-checkbox12"
                  value={userState?.is_level_two_profile}
                  // onChange={handleChange}
                  defaultChecked={userState?.is_level_two_profile}
                  onChange={(e) => {
                    setLevelTwoCheckBox(e.target.checked);
                    setformData({
                      ...formData,
                      is_level_two_profile: e.target.checked,
                    });
                  }}
                />
              </FormGroup>
            </div>

            {/* ================================= MODAL PRIMARY CONTACT==================================================  */}

            <div className="head my-3">
              <h3 className="text-center">Primary Contact</h3>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label for="FirstName" className="font-weight-bold">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_first_name"
                  defaultValue={
                    !userState?.primary_contact_first_name
                      ? ""
                      : userState?.primary_contact_first_name
                  }
                  id="FirstName"
                  onChange={handleChange}
                  placeholder="FirstName"
                />
              </div>

              <div className="form-group col-6">
                <label for="LastName" className="font-weight-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_last_name"
                  onChange={handleChange}
                  defaultValue={
                    !userState.primary_contact_last_name
                      ? ""
                      : userState?.primary_contact_last_name
                  }
                  id="LastName"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label
                  for="primary_contact_tax_identification_number"
                  className="font-weight-bold"
                >
                  Tax Identification no
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_tax_identification_number"
                  defaultValue={
                    !userState?.primary_contact_tax_identification_number
                      ? ""
                      : userState?.primary_contact_tax_identification_number
                  }
                  id="primary_contact_tax_identification_number"
                  onChange={handleChange}
                  placeholder="Text Indentification no"
                />
              </div>

              <div className="form-group mb-2 mt-3 hide_increament_button col-lg-6">
                <label for="ContactNumber" className="fw-bold mb-2">
                  Contact Number <span> (e.g +923123456789)</span>
                </label>
                <PhoneInput
                  className="form-control hide_increament_button "
                  placeholder="Enter phone number"
                  value={
                    formData?.primary_contact_number
                      ? formData?.primary_contact_number
                      : ""
                  }
                  onChange={(value) => {
                    setformData({
                      ...formData,
                      primary_contact_number: value,
                    });
                  }}
                />
              </div>

              {/* <div className="form-group col-6">
                <label
                  for="primary_contact_number"
                  className="font-weight-bold"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_number"
                  onChange={handleChange}
                  defaultValue={
                    !userState.primary_contact_number
                      ? ""
                      : userState?.primary_contact_number
                  }
                  id="primary_contact_number"
                  placeholder="Last Name"
                />
              </div> */}
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label for="primary_contact_email" className="font-weight-bold">
                  Contact Email
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_email"
                  defaultValue={
                    !userState?.primary_contact_email
                      ? ""
                      : userState?.primary_contact_email
                  }
                  id="primary_contact_tax_identification_number"
                  onChange={handleChange}
                  placeholder="Contact Email"
                />
              </div>

              {/* <div className="form-group col-6">
                <label
                  for="primary_contact_date_of_birth"
                  className="font-weight-bold"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="primary_contact_date_of_birth"
                  onChange={handleChange}
                  defaultValue={
                    !userState.primary_contact_date_of_birth
                      ? ""
                      : userState?.primary_contact_date_of_birth
                  }
                  id="primary_contact_date_of_birth"
                  placeholder="Date of birth"
                />
              </div> */}
            </div>

            <div className="form-group mt-3 ">
              <label for="primary_contact_address" className="font-weight-bold">
                Address
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name="primary_contact_address"
                onChange={handleChange}
                defaultValue={userState?.primary_contact_address}
                id="primary_contact_address"
                placeholder="Address"
              />
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label for="primary_contact_city" className="font-weight-bold">
                  City
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_city"
                  onChange={handleChange}
                  defaultValue={
                    !userState.primary_contact_city
                      ? ""
                      : userState?.primary_contact_city
                  }
                  id="primary_contact_city"
                  placeholder="city"
                />
              </div>

              <div className="form-group col-6">
                <label for="primary_contact_state" className="font-weight-bold">
                  State
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_state"
                  defaultValue={
                    !userState?.primary_contact_state
                      ? ""
                      : userState?.primary_contact_state
                  }
                  id="state"
                  onChange={handleChange}
                  placeholder="state"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-6">
                <label for="primary_contact_zip" className="font-weight-bold">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_zip"
                  onChange={handleChange}
                  defaultValue={
                    !userState.primary_contact_zip
                      ? ""
                      : userState?.primary_contact_zip
                  }
                  id="zip"
                  placeholder="zip"
                />
              </div>

              <div className="form-group col-6">
                <label
                  for="primary_contact_country"
                  className="font-weight-bold"
                >
                  Country
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="primary_contact_country"
                  defaultValue={
                    !userState?.primary_contact_country
                      ? ""
                      : userState?.primary_contact_country
                  }
                  id="primary_contact_country"
                  onChange={handleChange}
                  placeholder=" country"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!formData && true}
            variant="primary"
            onClick={handleSubmint}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyProfile;
