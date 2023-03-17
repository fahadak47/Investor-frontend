import { apiHandle } from "./apiHandler";

// Api for get all companies

export const getAllCompanies = () => {
  return apiHandle().get("/user/auth/company");
};

export const getCompanyById = (id) => {
  return apiHandle().get(`/user/auth/company/${id}`);
};

export const getFollowedCompany = () => {
  return apiHandle().get("/user/auth/company/followed");
};

export const getIntrestedCompany = () => {
  return apiHandle().get("/user/auth/company/interested");
};
