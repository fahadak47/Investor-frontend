import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";

import { useNavigate } from "react-router-dom";
import { LoginCompanyHandle } from "../../redux/actions/authActions";
import { Spinner } from "react-bootstrap";

const FormCompany = () => {
  const [Company, SeTCompany] = useState({ email: "", password: "",
      // testing:true,
      // ttl:"30sec,60sec"
 });
  const [showPass, setShowPass] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChanger = (e) => {
    const { name, value } = e.target;
    SeTCompany({ ...Company, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!Company.email || !Company.password) {
   displayErrorToast("incomplete");
    } else {
      setProcessLoading(true)
      LoginCompanyHandle(Company, navigate, dispatch, setProcessLoading);
    }
  };

  return (
    <form className="py-md-3" onSubmit={formHandler}>
      <div className="form-group ">
        <label for="emailAddress" className="font-weight-bold">
          Email address
        </label>
        <input
          type="email"
          className="form-control form-control-lg"
          name="email"
          onChange={handleChanger}
          value={Company.email}
          id="companyInputEmail1"
          placeholder="Email"
        />
      </div>
      <div className="form-group mt-3">
        <label for="pword" className="font-weight-bold">
          Password
        </label>
        <div className="input-group">
          <input
            type={!showPass ? "password" : "text"}
            value={Company.password}
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
          disabled={processLoading ? true : false}
        >
          {!processLoading ? (
            "Login"
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
  );
};

export default FormCompany;
