import {
  getActiveCompanyVideoById,
  getCompanyVideosApi,
} from "../../api/companyApis/companyVideosApi";
import {
  START_GETTING_VIDEOS,
  SAVE_GETTING_VIDEOS,
  ERROR_GETTING_VIDEOS,
} from "../constants/videos_costants";

export const getVideosHandle = (dispatch) => {
  dispatch({
    type: START_GETTING_VIDEOS,
  });
  getCompanyVideosApi()
    .then((res) => {
      dispatch({
        type: SAVE_GETTING_VIDEOS,
        payload: res.data?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_VIDEOS,
        payload: error.response.data.message[0],
      });
    });
};
export const getActiveCompanyVideosByIdHandle = (dispatch, id) => {
  console.log("geeeetttttttt video with compny id", id);
  dispatch({
    type: START_GETTING_VIDEOS,
  });
  getActiveCompanyVideoById(id)
    .then((res) => {
      dispatch({
        type: SAVE_GETTING_VIDEOS,
        payload: res.data?.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_VIDEOS,
        payload: error.response.data.message[0],
      });
    });
};
