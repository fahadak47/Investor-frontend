import { apiHandle } from "./apiHandler";

//user can toggle follow request by providung company Id
export const followCompanyApi = (id) => {
  return apiHandle().get(`/user/auth/company/follow/${id}`);
};

//user can toggle follow request by providung company Id
export const intrestedCompanyApi = (id) => {
  return apiHandle().get(`/user/auth/company/interest/${id}`);
};
