import { logoutUserType } from "../../constants/Common_constants";
import {
  activeUserTokens,
  userTokensExpired,
} from "../../constants/user_state_constants";

const INITIAL_STATE = {
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
};

const userTokensReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case activeUserTokens:
      return {
        ...state,
        tokens: payload,
      };

    case userTokensExpired:
      return {
        ...state,
        tokens: {
          accessToken: "",
          refreshToken: "",
        },
      };
    case logoutUserType:
      return {
        ...state,
        tokens: {
          accessToken: "",
          refreshToken: "",
        },
      };
    default:
      return state;
  }
};

export default userTokensReducer;
