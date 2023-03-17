import {
  getAllCompanies,
  getFollowedCompany,
  getIntrestedCompany,
} from "../../api/CompaniesForUserApis";
import {
  ERROR_GETTING_LIST_COMPANIES,
  SAVE_GETTING_LIST_COMPANIES,
  START_GETTING_ALL_COMPANIES,
} from "../constants/get_All_companies_constants";

export const getAllCompaniesHandle = (dispatch) => {
  dispatch({
    type: START_GETTING_ALL_COMPANIES,
  });

  getAllCompanies()
    .then((res) => {
      console.log(res.data, "companies");

      if (res?.data) {
        return dispatch({
          type: SAVE_GETTING_LIST_COMPANIES,
          payload: res.data ? res.data.data : [],
        });
      }
    })
    .catch((error) => {
      console.log("error Get all companies", error);
      dispatch({
        type: ERROR_GETTING_LIST_COMPANIES,
        // payload: error.response.data.message[0],
      });
    });
};


export const getFollowedCompaniesHandle = (dispatch,setTabsLoading) => {
  // dispatch({
  //     type:START_GETTING_ALL_COMPANIES,
  //   });
  setTabsLoading(true)
  getFollowedCompany()
    .then((res) => {
      console.log(res.data, "followed companies");

      if (res?.data) {
         dispatch({
          type: SAVE_GETTING_LIST_COMPANIES,
          payload: res.data ? res.data.data : [],
        });
        setTabsLoading(false)
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_LIST_COMPANIES,
        payload: error.response.data.message[0],
      });
      setTabsLoading(false)

    });
};
export const getInrestedCompaniesHandle = (dispatch,setTabsLoading) => {
  // dispatch({
  //     type:START_GETTING_ALL_COMPANIES,
  //   });

  setTabsLoading(true)
  getIntrestedCompany()
    .then((res) => {
      console.log(res.data, "followed companies");

      if (res?.data) {
         dispatch({
          type: SAVE_GETTING_LIST_COMPANIES,
          payload: res.data ? res.data.data : [],
        });
        setTabsLoading(false)
      }
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_LIST_COMPANIES,
        payload: error.response.data.message[0],
      });
      setTabsLoading(false)
    });
};
