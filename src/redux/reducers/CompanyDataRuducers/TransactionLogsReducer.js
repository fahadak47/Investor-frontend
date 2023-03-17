import { logoutCompanyType } from "../../constants/Common_constants"
import { ERROR_GETTING_TRANSACTION_LOGS, SAVE_GETTING_TRANSACTION_LOGS, START_GETTING_TRANSACTION_LOGS } from "../../constants/get_active_Shedule_const"



const INITIAL_STATE = {
    loading : true,
    TransactionLogs : null,
    error : null
}

export const getTransactionLogsReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_TRANSACTION_LOGS:
            return {
                ...state,
               loading:true,
               error : null
            }
  
        case SAVE_GETTING_TRANSACTION_LOGS:
            return {
                ...state,
                loading:false,
                TransactionLogs : payload,
                error:null
            }

            case ERROR_GETTING_TRANSACTION_LOGS:
                return {
                    ...state,
                     TransactionLogsLoading:false,
                     error : payload,
                }


        case logoutCompanyType:
            return {
                ...state,
                TransactionLogs : null,
                 error : null,
                 loading: true
            }
        default:
            return state
    }
}