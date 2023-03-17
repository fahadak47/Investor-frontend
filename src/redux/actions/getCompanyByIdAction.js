import { getCompanyById } from "../../api/CompaniesForUserApis";
import {
  ERROR_GETTING_COMPANY_BY_ID,
  SAVE_GETTING_COMPANY_BY_ID,
  START_GETTING_COMPANY_BY_ID,
} from "../constants/get_companyById_constants";

export const getCompanyByIDHandle = (dispatch, id) => {
  dispatch({
    type: START_GETTING_COMPANY_BY_ID,
  });

  getCompanyById(id)
    .then((res) => {
      console.log(res.data, "company by id");

      if (res?.data.success) {
        return dispatch({
          type: SAVE_GETTING_COMPANY_BY_ID,
          payload: res.data ? res.data.data : [],
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_COMPANY_BY_ID,
        payload: error.response.data.message[0],
      });
    });
};
