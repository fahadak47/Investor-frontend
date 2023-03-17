import { apiHandle } from "./apiHandler";

// ############################## User Auth #############
export const loginUser = (formData) => {
  return apiHandle(false).post("/user/login", formData);
};

export const RegisterUser = (data) => {
  return apiHandle(false).post("/user/create", data);
};

// ################################ Company Auth #######################

export const loginCompany = (data) => {
  return apiHandle(false).post("/company/login", data);
};

export const RegisterCompany = (data) => {
  let multipart = true,
    isAuth = false;
  return apiHandle(isAuth, multipart).post("/company/register", data);
};
