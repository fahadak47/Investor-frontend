// import { logoutUserType, LOGOUT_USER_TYPE } from "../../constants/common_constants"

import { ERROR_GETTING_COMPANY_BY_ID, SAVE_GETTING_COMPANY_BY_ID, START_GETTING_COMPANY_BY_ID } from "../../constants/get_companyById_constants"




const INITIAL_STATE = {
    isLoading : false,
    getCompanyByid : [],
    error : null
}

export const getCompanyByidReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_COMPANY_BY_ID:
            return {
                ...state,
               isLoading:true,
               error : null
            }
  
        case SAVE_GETTING_COMPANY_BY_ID:
            return {
                ...state,
                isLoading:false,
                getCompanyByid : payload,
                error:null
            }

            case ERROR_GETTING_COMPANY_BY_ID:
                return {
                    ...state,
                     isLoading:false,
                     error : payload,
                }


        // case logoutUserType
        //     return {
        //         ...state,
        //         getCompanyByid : [],
        //          error : null,
        //          isLoading: true
        //     }
        default:
            return state
    }
}