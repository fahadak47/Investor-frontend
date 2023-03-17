import React from "react";
import User from "../component/SignComplay&User/UserSignUp";

const SignUp = () => {
  return (
    <div className="common_wrapper wrapper">
      <div class="d-flex justify-content-center align-items-center mt-5">
        <div className="row w-100">
          <div className="col-lg-5 col-12 mx-auto">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
