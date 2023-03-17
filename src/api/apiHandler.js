import axios from "axios";
import Logout from "../component/Logout";
import { isJwtExpired } from "../helper/jwtExpireChecked";
import { displaySuccessToast } from "../helper/toast_notification_function";
import { LogoutFn, LogoutHandle } from "../redux/actions/authActions";
import { logoutUserType } from "../redux/constants/Common_constants";
import store from "../redux/store";

// const navigate = useNavigate() 

const { dispatch } = store;
// const apiUrl = "http://172.16.17.14:3000";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const apiHandle = (isAuth = true, multipart = false) => {
  let aaxios; // veriable for creating axios instance and use intercept

  // condition for enabling multi part of form data in request
  let multipartData = multipart
    ? { "Content-Type": "multipart/form-data", Accept: "application/json" }
    : "";
  // condition for enabling multi part of form data in request
  aaxios = axios.create({
    baseURL: apiUrl,
    headers: {
      ...axios.defaults.headers,
      ...multipartData,
    },
  });

  aaxios.interceptors.request.use(
    async (req) => {
      if (!isAuth) {
        console.log("false auth request", req);
        return req;
      }

      console.log("inside token condition");

      let accessToken = await localStorage.getItem("IP_accessToken"),
        refreshToken = await localStorage.getItem("IP_refreshToken"),
        appState = await localStorage.getItem("IP_State");
      let renewTokenRoute =
        appState === "USER"
          ? "/user/renewAccessToken"
          : "/company/renewAccessToken";

      if (accessToken) {
        console.log("access token available");

        console.log("access token is expired", isJwtExpired(accessToken));

        if (refreshToken) {
          console.log("refresh token available");
          if (!isJwtExpired(refreshToken)) {
            if (!isJwtExpired(accessToken)) {
              req.headers.Authorization = `Bearer ${accessToken}`;

              return req;
            }
            console.log("refresh is not expire");
            const renewApiRes = await axios.post(
              `${apiUrl}${renewTokenRoute}`,
              {
                refreshToken: refreshToken,
              }
            );
            req.headers.Authorization = `Bearer ${renewApiRes?.data?.data[0]?.NewAccessToken}`;
            await localStorage.setItem(
              "IP_accessToken",
              renewApiRes?.data?.data[0]?.NewAccessToken
            );

            await localStorage.setItem(
              "IP_refreshToken",
              !renewApiRes?.data?.data[0]?.NewRefreshToken
                ? refreshToken
                : renewApiRes?.data?.data[0]?.NewRefreshToken
            );

            return req;
          }
        }
      }

      LogoutFn(dispatch);

  // setTimeout(() => {
  // displaySuccessToast("session expired login agail")
    
  // }, 3000);


      // window.location.replace("/login")
      // localStorage.clear();
      // dispatch({
      //   type: logoutUserType,
      // });
      // displaySuccessToast("session Expired login again!")

      
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  aaxios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );

  return aaxios;
};
