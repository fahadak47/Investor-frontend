import { apiHandle } from "./apiHandler";


export const Public_contact = (formData) => {
  return apiHandle(false).post("/public/contact", formData);
};



export const PublicGetIndustriesApi = () => {
  return apiHandle(false).get("/public/industry");
};
