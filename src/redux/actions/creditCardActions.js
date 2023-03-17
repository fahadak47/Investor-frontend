import {
  attachCardApi,
  cardActiveSheduleApi,
  getActiveScheduleApi,
  getCardDetailsApi,
  getChargeRateApi,
  updateCardApi,
} from "../../api/companyApis/CreditCardApis";
import { getTransactionLogsAPi } from "../../api/companyApis/transactionLogsApi";
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";
import {
  SAVE_GETTING_PAYMENT_PERDAY,
  START_GETTING_PAYMENT_PERDAY,
} from "../constants/getPaymentPerDayConst";
import {
  ERROR_GETTING_ACTIVE_SCHEDULE,
  ERROR_GETTING_TRANSACTION_LOGS,
  SAVE_GETTING_ACTIVE_SCHEDULE,
  SAVE_GETTING_TRANSACTION_LOGS,
  START_GETTING_ACTIVE_SCHEDULE,
  START_GETTING_TRANSACTION_LOGS,
} from "../constants/get_active_Shedule_const";
import {
  ERROR_GETTING_USER_CARD_DATA,
  SAVE_USER_CARD_DATA,
  START_GETTING_USER_CARD_DATA,
} from "../constants/get_card_constants";

export const attachCreditCardHandle = (
  formData,
  setformData,
  setButtonDisabled,
  setProcessLoading,
  dispatch
) => {
  setProcessLoading(true);

  attachCardApi(formData)
    .then((res) => {
      console.log(res, "card");

      if (res.data.success) {
        setformData({
          number: "",
          expiry_year: "",
          expiry_month: "",
          cv: "",
          cardHolder: "",
        });
        displaySuccessToast("Card attached successfully...");
        setButtonDisabled(true);
        getUserCardData(dispatch);
        setProcessLoading(false);
      }
    })
    .catch((error) => {
      displayErrorToast(error);
      setProcessLoading(false);
    });
};


// =========================== UPDATE CARD HANDLE ==================================================//

export const updateCardHandle = (
  formData,
  setformData,
  setButtonDisabled,
  setProcessLoading,
  dispatch
) => {
  setProcessLoading(true);

  updateCardApi(formData)
    .then((res) => {
      console.log(res, "card");

      if (res.data.success) {
        setformData({
          number: "",
          expiry_year: "",
          expiry_month: "",
          cv: "",
          cardHolder: "",
        });
        displaySuccessToast("Card attached successfully...");
        setButtonDisabled(true);
        getUserCardData(dispatch);
        setProcessLoading(false);
      }
    })
    .catch((error) => {
      displayErrorToast(error);
      setProcessLoading(false);
    });
};




// ========================= GET CREDIT CARD DETAILS ACTION ===================================================//

export const getUserCardData = (dispatch) => {
  dispatch({
    type: START_GETTING_USER_CARD_DATA,
  });
  getCardDetailsApi()
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: SAVE_USER_CARD_DATA,
        payload: res?.data?.length !== 0 ? res?.data.data : [],
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR_GETTING_USER_CARD_DATA,
        payload: error.response.data.message[0],
      });

      displayErrorToast(error);
    });
};







// =========================== GET CHARGE RATE PER DAY HANDLE====================

export const getChargeRatePerDayHandle = (dispatch, setLoading) => {
  dispatch({
    type: START_GETTING_PAYMENT_PERDAY,
  });

  getChargeRateApi()
    .then((res) => {
      if (res.data.success) {
        console.log(res.data);

        dispatch({
          type: SAVE_GETTING_PAYMENT_PERDAY,
          payload: res.data?.data?.[0]
            ? res.data?.data?.[0].charge_rate_per_day
            : [],
        });

        // setchargeRatePerDay()
        // setFinalAmount(daysBetween * chargeRatePerDay )
        setLoading(false);
      }
    })
    .catch((err) => {
      displayErrorToast(err);
      dispatch({
        type: ERROR_GETTING_USER_CARD_DATA,
        payload: err.response.data.message[0],
      });
      setLoading(false);
    });
};









// ===================================post apii--- Active Card shedule action========================

export const cardActiveSheduleHandle = (obj, setDateRange, setLoading,setFinalAmount) => {
  cardActiveSheduleApi(obj)
    .then((res) => {
      if (res.data.success) {
        displaySuccessToast("Shedule added...");
        setDateRange([]);
        setFinalAmount()
        setLoading(false);
      }
    })
    .catch((error) => {
      displayErrorToast(error);
      setLoading(false);
    });
};










// ====================================get api -- GET USER ACTIVE SHEDULE ACTION===========================================

export const getActiveScheduleHandle = (dispatch) => {
  dispatch({
    type: START_GETTING_ACTIVE_SCHEDULE,
  });

  getActiveScheduleApi()
    .then((res) => {
      if (res.data.success) {
        console.log(res.data, "==========>get active sche");

        dispatch({
          type: SAVE_GETTING_ACTIVE_SCHEDULE,
          payload: res.data?.data ? res.data?.data : [],
        });
      }
    })
    .catch((err) => {
      displayErrorToast(err);
      console.log(err, "-----------------------");
      dispatch({
        type: ERROR_GETTING_ACTIVE_SCHEDULE,
        payload: err.response.data.message[0],
      });
    });
};





// =================================  GET getTransactionLogs API============================

export const getTransactionLogsHandle = (dispatch) => {
  dispatch({
    type: START_GETTING_TRANSACTION_LOGS,
  });

  getTransactionLogsAPi().then((res) => {
      if (res.data.success) {
        console.log(res.data.data[0], "==========>get transc");

        dispatch({
          type: SAVE_GETTING_TRANSACTION_LOGS,
          payload: res.data?.data ? res.data?.data[0] : [],
        });
      }
    })
    .catch((err) => {
      displayErrorToast(err);
      console.log(err, "-----------------------");
      dispatch({
        type: ERROR_GETTING_TRANSACTION_LOGS,
        payload: err.response.data.message[0],
      });
    });
};
