import { logoutCompanyType } from "../../constants/Common_constants";
import { CompanyAciveState } from "../../constants/company_state_constants";

const INITIAL_STATE = {
  Company: false,
  isLoading: true,
};

const CompanyStateReducer = (state = INITIAL_STATE, action) => {
  const { type, user } = action;
  switch (type) {
    case CompanyAciveState:
      return {
        ...state,
        Company: user,
        isLoading: false,
      };
    case logoutCompanyType:
      return {
        ...state,
        Company: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default CompanyStateReducer;
