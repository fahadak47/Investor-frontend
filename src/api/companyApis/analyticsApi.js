import { apiHandle } from "../apiHandler";

export const userViewsApi = () => {
  return apiHandle().get(`/company/auth/users/views`);
};

// this appi give the data of each video view count but with there name
export const videoViewsApi = () => {
  return apiHandle().get(`/company/auth/presentation/titleWithViews`);
};

// this api used in line chart which give count of all video views on the basis of date
export const allVideoViewsApi = () => {
  return apiHandle().get(`/company/auth/users/presentation/videoViews`);
};

// Api for Company side whcich gives the user Views on date
export const userProfileViewsApi = (id) => {
  return apiHandle().get(`/company/auth/users/views/${id}`);
};
// this api gives the video view count according to user id with respact to date
export const userAllVideoViewsApi = (id) => {
  return apiHandle().get(
    `/company/auth/users/presentation/videoViews?userId=${id}`
  );
};
export const userSingleVideoViewsByIdApi = (id, videoId) => {
  return apiHandle().get(
    `/company/auth/users/presentation/videoViews?userId=${id}&presentationId=${videoId}`
  );
};

// This api gives the view count of each which user viewed with title
export const userEachVideoViewsApi = (id) => {
  return apiHandle().get(
    `/company/auth/users/videoWisePresentationViews/
    ${id}`
  );
};
export const VideoViewByIdApi = (id) => {
  return apiHandle().get(
    `/company/auth/users/presentationVideoViews/filterByPresentation/${id}`
  );
};

// Api is for company which gives comapnt views with user information
export const userViewsWithProfileApi = (download = false) => {
  return apiHandle().get(
    `/company/auth/users/views/groupByUser?download=${download}`
  );
  // return apiHandle().get(`/company/auth/users`);
};

export const userWithVideoViewsApi = (download = false) => {
  return apiHandle().get(
    `/company/auth/users/presentationViews/userWise?download=${download}`
  );
};

export const VideoViewsByIdTableApi = (id) => {
  return apiHandle().get(
    `/company/auth/users/presentationViews/userWise/${id}`
  );
};

export const getDeshboardApi = () => {
  return apiHandle().get(`/company/auth/dashboard`);
};

export const inrestedUserChartApi = () => {
  return apiHandle().get(`/company/auth/dateWiseInterestedCount`);
};

export const inrestedUserTableApi = (download = false) => {
  return apiHandle().get(`/company/auth/interestedUsers?download=${download}`);
};

export const UserDataTableApi = (download = false) => {
  return apiHandle().get(`/company/auth/userWise/merged?download=${download}`);
};
