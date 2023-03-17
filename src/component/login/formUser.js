import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";

import { useNavigate } from "react-router-dom";
import { LoginUserHandle } from "../../redux/actions/authActions";
import { Spinner } from "react-bootstrap";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TopSection from "../Common/TopSection";

const FormUser = () => {
  const [processLoading, setProcessLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const { error } = useSelector((state) => state.AppStateReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [User, SeTUser] = useState({ email: "", password: "" });

  const handleChanger = (e) => {
    const { name, value } = e.target;
    SeTUser({ ...User, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!User.email || !User.password) {
      displayErrorToast("incomplete");
    } else {
      setProcessLoading(true);
      LoginUserHandle(User, navigate, dispatch, setProcessLoading);
    }
  };

  return (
    <div>
      <form className="py-md-3" onSubmit={formHandler}>

        <div className="form-group ">
          <label for="emailAddress" className="font-weight-bold">
            Email address
          </label>
          <input
            type="email"
            onChange={handleChanger}
            value={User.email}
            className="form-control form-control-lg"
            name="email"
            id="exampleInputEmail1"
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
              value={User.password}
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
    </div>
  );
};

export default FormUser;
