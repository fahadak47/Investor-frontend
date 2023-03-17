import {
  ERROR_GETTING_VIDEOS,
  SAVE_GETTING_VIDEOS,
  START_GETTING_VIDEOS,
} from "../../constants/videos_costants";

const INITIAL_STATE = {
  videos: null,
  isVideoLoadig: false,
  videoError: null,
};

export const videoReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_GETTING_VIDEOS:
      return {
        ...state,
        isVideoLoadig: true,
      };
    case SAVE_GETTING_VIDEOS:
      return {
        ...state,
        isVideoLoadig: false,
        videos: payload,
      };
    case ERROR_GETTING_VIDEOS:
      return {
        ...state,
        isVideoLoadig: false,
        videoError: payload,
      };
    default:
      return state;
  }
};
