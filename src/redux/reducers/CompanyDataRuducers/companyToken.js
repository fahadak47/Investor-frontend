import { logoutCompanyType } from "../../constants/Common_constants";
import {
  activeCompanyTokens,
  CompanyTokensExpired,
} from "../../constants/company_state_constants";

const INITIAL_STATE = {
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
};

const userTokensReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case activeCompanyTokens:
      return {
        ...state,
        tokens: payload,
      };

    case CompanyTokensExpired:
      return {
        ...state,
        tokens: {
          accessToken: "",
          refreshToken: "",
        },
      };
    case logoutCompanyType:
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
