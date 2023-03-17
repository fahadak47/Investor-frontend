import { logoutCompanyType } from "../../constants/Common_constants";
import { PROGRESS_UPLOADING_VIDEO } from "../../constants/presentation_progress_constant";

const INITIAL_STATE = {
  ProgressVideoUpload: null,
};

export const PresentationProgressReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROGRESS_UPLOADING_VIDEO:
      return {
        ...state,
        ProgressVideoUpload: payload,
      };

    case logoutCompanyType:
      return {
        ...state,
        ProgressVideoUpload: null,
      };
    default:
      return state;
  }
};
