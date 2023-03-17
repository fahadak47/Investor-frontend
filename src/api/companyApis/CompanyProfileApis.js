// Api for get company profile

import { apiHandle } from "../apiHandler";

export const GetCompanyProfileApi = () => {
  return apiHandle().get("/company/auth/profile");
};
// api for update user profile
export const UpdateCompanyProfileApi = (data) => {
  console.log(data,"update")
  let multipart = true,
    isAuth = true;
  return apiHandle(isAuth, multipart).put("/company/auth/profile", data);
};





export const getUserProfileBId = (id) => {
  return apiHandle().get(`/company/auth/users/${id}`);
};



export const getUserLevelTwoProfileById = (id) => {
  return apiHandle().get(`/company/auth/users/levelTwoProfile/${id}`);
};


