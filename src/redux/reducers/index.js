import { combineReducers } from "redux";
import userTokensReducer from "./userDataReducers/userToken";
import CompanyStateReducer from "./CompanyDataRuducers/CompanyState";
import companyToken from "./CompanyDataRuducers/companyToken";
import userState from "./userDataReducers/userState";
import { AppStateReducer } from "./authReducer/appState";
import { getAllCompaniesReducer } from "./userDataReducers/getAllCompaniesReducer";
import { getCompanyByidReducer } from "./userDataReducers/companyByIdReducer";
import { getAllIndustriesReducer } from "./userDataReducers/getIndustriesReducer";
import { GetCardDataReducer } from "./CompanyDataRuducers/cardDataReducer";
import { PresentationProgressReducer } from "./CompanyDataRuducers/presentationProgressReducer";
import { getPaymentPerDayReducer } from "./CompanyDataRuducers/paymentPerDayReducer";
import { getActiveScheduleReducer } from "./CompanyDataRuducers/getActiveSheduleReducer";
import { getTransactionLogsReducer } from "./CompanyDataRuducers/TransactionLogsReducer";
import { videoReducer } from "./CompanyDataRuducers/videosReducer";

const reducers = combineReducers({
  userTokensReducer,
  CompanyStateReducer,
  companyToken,
  userState,
  AppStateReducer,
  getAllCompaniesReducer,
  getCompanyByidReducer,
  getAllIndustriesReducer,
  GetCardDataReducer,
  PresentationProgressReducer,
  getPaymentPerDayReducer,
  getActiveScheduleReducer,
  getTransactionLogsReducer,
  videoReducer,
});
export default reducers;
