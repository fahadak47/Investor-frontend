import { logoutUserType } from "../../constants/Common_constants";
import { userAciveState } from "../../constants/user_state_constants";

const INITIAL_STATE = {
  user: false,
  isLoading: true,
};

const userStateReducer = (state = INITIAL_STATE, action) => {
  const { type, user } = action;

  switch (type) {
    case userAciveState:
      return {
        ...state,
        user: user,
        isLoading: false,
      };
    case logoutUserType:
      return {
        ...state,
        user: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userStateReducer;
