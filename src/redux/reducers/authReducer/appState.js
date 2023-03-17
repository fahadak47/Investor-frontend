import {
  ERROR_GETTING_AUTH_STATE,
  SAVE_GETTING_AUTH_STATE,
  START_GETTING_AUTH_STATE,
} from "../../constants/auth_Constants";
import { logoutUserType } from "../../constants/Common_constants";

const INITIAL_STATE = {
  appState: null,
  isappStateLoading: false,
  error: null,
};
export const AppStateReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_GETTING_AUTH_STATE:
      return {
        ...state,
        isappStateLoading: true,
      };

    case SAVE_GETTING_AUTH_STATE:
      return {
        ...state,
        appState: payload,
        isappStateLoading: false,
      };
    case ERROR_GETTING_AUTH_STATE:
      return {
        ...state,
        error: payload,
        isappStateLoading: false,
      };
    case logoutUserType:
      return {
        ...state,
        appState: null,
        isappStateLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
