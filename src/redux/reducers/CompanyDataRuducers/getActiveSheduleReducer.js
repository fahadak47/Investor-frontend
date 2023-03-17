import { logoutCompanyType } from "../../constants/Common_constants"
import { ERROR_GETTING_ACTIVE_SCHEDULE, SAVE_GETTING_ACTIVE_SCHEDULE, START_GETTING_ACTIVE_SCHEDULE } from "../../constants/get_active_Shedule_const"



const INITIAL_STATE = {
    activeScheduleLoading : true,
    activeSchedule : null,
    error : null
}

export const getActiveScheduleReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_ACTIVE_SCHEDULE:
            return {
                ...state,
               activeScheduleLoading:true,
               error : null
            }
  
        case SAVE_GETTING_ACTIVE_SCHEDULE:
            return {
                ...state,
                activeScheduleLoading:false,
                activeSchedule : payload,
                error:null
            }

            case ERROR_GETTING_ACTIVE_SCHEDULE:
                return {
                    ...state,
                     paymentPerDayLoading:false,
                     error : payload,
                }


        case logoutCompanyType:
            return {
                ...state,
                activeSchedule : null,
                 error : null,
                 activeScheduleLoading: true
            }
        default:
            return state
    }
}