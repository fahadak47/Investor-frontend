import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { GetUserProfileApi, UpdateUserProfileApi } from "../api/UserProfileApi";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../helper/toast_notification_function";
import { BiEdit } from "react-icons/bi";
import { dataCleaning } from "../helper/common_functions";

const UserDetails = ({ SetUserName }) => {
  const [show, setShow] = useState(false);

  const [userState, setUser] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [formData, setformData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(evt) {
    const value = evt.target.value;
    setformData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const handleSubmint = (e) => {
    e.preventDefault();
    let data = !formData ? userState : formData;

    if (userState) {
      console.log(data, "----------------");
      UpdateUserProfileApi(dataCleaning(data))
        .then((response) => {
          console.log(response, "ressss");
          handleGetProfile();
          handleClose();
          displaySuccessToast(" Profile Updated");
        })
        .catch((err) => {
          displayErrorToast(err);
        });
    }
  };

  const handleGetProfile = () => {
    GetUserProfileApi()
      .then((response) => {
        console.log("Profile responce log", response.data?.data[0]);
        setUser(response.data?.data[0]);
        SetUserName({
          first: response.data?.data[0].first_name
            ? response.data?.data[0].first_name
            : "",
          last: response.data?.data[0].last_name
            ? response.data?.data[0].last_name
            : "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Profile error log", err);
      });
  };

  useEffect(() => {
    handleGetProfile();
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
      <div className="ProfileView">
        <div className="">
          <div className="col-md-12">
            <div className="head justify-content-space-between align-items-flex-end">
              <h5 style={{ fontWeight: "700", fontFamily: "poppins" }}>
                Your Identity
              </h5>
              <Button
                variant="btn btn-outline-primary"
                style={{ fontSize: "small" }}
                onClick={handleShow}
              >
                <BiEdit fontSize="17px" />
              </Button>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <div className="row ">
                  <div className="col-sm-3">
                    <h6 className="">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.first_name}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.last_name}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Contact Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.contact_number}
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Date of birth</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.date_of_birth}
                  </div>
                </div> */}

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.email}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">property Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.address}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">City</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.city}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">State</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.state}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Zip</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.zip}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Country</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {userState?.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="update" id="edit-form">
            <input class="form-control" type="hidden" name="id" />
            <div class="form-group">
              <label for="first_name">First Name</label>
              <input
                class="form-control"
                defaultValue={userState?.first_name}
                type="text"
                name="first_name"
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input
                class="form-control"
                defaultValue={userState?.last_name}
                type="text"
                name="last_name"
                onChange={handleChange}
              />
            </div>
            <div class="form-group">
              <label for="contact_number">Contact Number</label>
              <input
                class="form-control"
                defaultValue={userState?.contact_number}
                type="text"
                name="contact_number"
                onChange={handleChange}
              />
            </div>

            {/* <div class="form-group">
              <label for="date_of_birth">Date of birth</label>
              <input
                class="form-control"
                defaultValue={userState?.date_of_birth}
                type="date"
                name="date_of_birth"
                onChange={handleChange}
              />
            </div> */}

            <div class="form-group">
              <label for="email">Email</label>
              <input
                class="form-control"
                defaultValue={userState?.email}
                type="text"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label for="address">Property Address</label>
              <input
                class="form-control"
                defaultValue={userState?.address}
                type="text"
                name="address"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label for="city">City</label>
              <input
                class="form-control"
                defaultValue={userState?.city}
                type="text"
                name="city"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label for="state">State</label>
              <input
                class="form-control"
                defaultValue={userState?.state}
                type="text"
                name="state"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label for="zip">Zip</label>
              <input
                class="form-control"
                defaultValue={userState?.zip}
                type="text"
                name="zip"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label for="country">Country</label>
              <input
                class="form-control"
                defaultValue={userState?.country}
                type="text"
                name="country"
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmint}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetails;
