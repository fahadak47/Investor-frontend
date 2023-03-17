import { apiHandle } from "./apiHandler";

// Api for get user profile

export const GetUserProfileApi = () => {
  return apiHandle().get("/user/auth/profile");
};
// api for update user profile
export const UpdateUserProfileApi = (data) => {
  console.log(data,"Apii payload")
  return apiHandle().put("/user/auth/profile", data);
};






//get user level 2 profile api
export const GetUserLeveltwoProfileApi = () => {
  return apiHandle().get("/user/auth/levelTwoProfile");
};
//update user level 2 profile api
export const UpdateUserLeveltwoProfileApi = (data) => {
  return apiHandle().put("/user/auth/levelTwoProfile", data);
};
