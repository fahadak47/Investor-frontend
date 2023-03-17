import { logoutCompanyType } from "../../constants/Common_constants"
import { ERROR_GETTING_PAYMENT_PERDAY, SAVE_GETTING_PAYMENT_PERDAY, START_GETTING_PAYMENT_PERDAY } from "../../constants/getPaymentPerDayConst"



const INITIAL_STATE = {
    paymentLoading : true,
    paymentPerDay : null,
    error : null
}

export const getPaymentPerDayReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_PAYMENT_PERDAY:
            return {
                ...state,
               userCardLoading:true,
               error : null
            }
  
        case SAVE_GETTING_PAYMENT_PERDAY:
            return {
                ...state,
                userCardLoading:false,
                paymentPerDay : payload,
                error:null
            }

            case ERROR_GETTING_PAYMENT_PERDAY:
                return {
                    ...state,
                     paymentPerDayLoading:false,
                     error : payload,
                }


        case logoutCompanyType:
            return {
                ...state,
                paymentPerDay : null,
                 error : null,
                 userCardLoading: true
            }
        default:
            return state
    }
}