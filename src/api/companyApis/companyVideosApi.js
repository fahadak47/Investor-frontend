import { apiHandle } from "../apiHandler";

export const getCompanyVideosApi = () => {
  return apiHandle().get("/company/auth/presentation");
};

export const getCompanyVideoUrlApi = (id) => {
  return apiHandle().get(`/company/auth/presentation/video/${id}`);
};

export const getActiveCompanyVideoById = (id) => {
  return apiHandle().get(`/user/auth/companyPresentationsByCompanyId/${id}`);
};

export const getActiveCompanyVideoUrlApi = (videoId, companyId) => {
  return apiHandle().get(
    `/user/auth/companyPresentations/video/${videoId}?companyId=${companyId}`
  );
};

export const ActiveCompanyVideoViewCountApi = (videoId, companyId) => {
  return apiHandle().get(
    `/user/auth/companyPresentations/viewVideo/${videoId}?companyId=${companyId}`
  );
};

export const deleteCompanyVideoApi = (id) => {
  return apiHandle().delete(`/company/auth/presentation/${id}`);
};

export const UpdateCompanyVideoApi = (id, data) => {
  return apiHandle(true, true).put(`/company/auth/presentation/${id}`, data);
};
