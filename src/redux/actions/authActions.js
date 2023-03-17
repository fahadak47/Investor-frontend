import { Redirect, useNavigate } from "react-router-dom";
import { loginCompany, loginUser } from "../../api/AuthApi";
import { storeAppState, storeTokens } from "../../helper/storgeHandler";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";
import {
  ERROR_GETTING_AUTH_STATE,
  SAVE_GETTING_AUTH_STATE,
  START_GETTING_AUTH_STATE,
} from "../constants/auth_Constants";
import { logoutUserType } from "../constants/Common_constants";

// user Related Actions

export const LoginUserHandle = (User, navigate, dispatch, setLoading) => {
  dispatch({
    type: START_GETTING_AUTH_STATE,
  });

  let test = {
    ...User,
    testing: true,
    ttl: "30s,60s",
  };
  loginUser(User)
    .then((response) => {
      console.log("login counsole", response, "login response");
      let tokens = response.data?.data[0];
      let message = response.data.message[0];
      storeTokens(tokens);

      setLoading(false);

      storeAppState("USER"); // App State Flgas are COMPANY || USER

      dispatch({
        type: SAVE_GETTING_AUTH_STATE,
        payload: "USER",
      });
      // setTimeout(() => {
      //   navigate("/user/company");
      // }, 5000);
      navigate("/user/company");
      // window.location.replace("/user/company");
      displaySuccessToast("Logged in Successfully!");
    })
    .catch((error) => {
      setLoading(false);
      console.log("login err", error, "login error");
      displayErrorToast(error);
      dispatch({
        type: ERROR_GETTING_AUTH_STATE,
        payload: error.response?.message[0],
      });
    });
};

export const LoginCompanyHandle = (
  User,
  navigate,
  dispatch,
  setProcessLoading
) => {
  console.log(
    "****************************logi compay************************************"
  );
  dispatch({
    type: START_GETTING_AUTH_STATE,
  });
  let test = {
    ...User,
    testing: true,
    ttl: "30s,60s",
  };
  loginCompany(User)
    .then(async (res) => {
      if (res.data.success) {
        let tokens = res.data?.data[0];

        console.log("TOKEEEEEEEENNNNNSSSSSSS", tokens);

        let message = res.data.message;

        storeTokens(tokens); // function for storing token isn local storage

        setProcessLoading(false);

        displaySuccessToast("Logged in Successfully!");

        storeAppState("COMPANY"); // App State Flgas are COMPANY || USER

        dispatch({
          type: SAVE_GETTING_AUTH_STATE,
          payload: "COMPANY",
        });

        navigate("/company/dashboard");
      }
    })
    .catch((error) => {
      console.log(error.response?.data?.message[0]);
      displayErrorToast(error);
      setProcessLoading(false);
      dispatch({
        type: ERROR_GETTING_AUTH_STATE,
        payload: error.response?.message[0],
      });
      // setProcessLoading(false);
    });
};

// user Related Actions End

export const LogoutFn = (dispatch) => {
  // const navigate = useNavigate()
  // window.location.replace("/login");
  localStorage.clear();
  displaySuccessToast("session expired login again");
  // navigate("/login")
  dispatch({
    type: logoutUserType,
  });
};

export const LogoutHandle = (dispatch) => {
  localStorage.clear();
  dispatch({
    type: logoutUserType,
  });
  displaySuccessToast("Log Out SuccessFully....!");
};
