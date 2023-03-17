// import { logoutUserType, LOGOUT_USER_TYPE } from "../../constants/common_constants"
import { ERROR_GETTING_LIST_COMPANIES, SAVE_GETTING_LIST_COMPANIES, START_GETTING_ALL_COMPANIES } from "../../constants/get_All_companies_constants"




const INITIAL_STATE = {
    isLoading : false,
    getAllCompanies : [],
    error : null
}

export const getAllCompaniesReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_ALL_COMPANIES:
            return {
                ...state,
               isLoading:true,
               error : null
            }
  
        case SAVE_GETTING_LIST_COMPANIES:
            return {
                ...state,
                isLoading:false,
                getAllCompanies : payload,
                error:null
            }

            case ERROR_GETTING_LIST_COMPANIES:
                return {
                    ...state,
                     isLoading:false,
                     error : payload,
                }


        // case logoutUserType
        //     return {
        //         ...state,
        //         getAllCompanies : [],
        //          error : null,
        //          isLoading: true
        //     }
        default:
            return state
    }
}