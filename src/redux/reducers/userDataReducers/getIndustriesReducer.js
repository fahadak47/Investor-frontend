import { logoutUserType } from "../../constants/Common_constants"
import { ERROR_GETTING_LIST_INDUSTRIES, SAVE_GETTING_LIST_INDUSTRIES, START_GETTING_ALL_INDUSTRIES } from "../../constants/get_All_Industries_constant"



const INITIAL_STATE = {
    isLoading : false,
    getAllIndustries : [],
    error : null
}

export const getAllIndustriesReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_ALL_INDUSTRIES:
            return {
                ...state,
               isLoading:true,
               error : null
            }
  
        case SAVE_GETTING_LIST_INDUSTRIES:
            return {
                ...state,
                isLoading:false,
                getAllIndustries : payload,
                error:null
            }

            case ERROR_GETTING_LIST_INDUSTRIES:
                return {
                    ...state,
                     isLoading:false,
                     error : payload,
                }


        case logoutUserType :
            return {
                ...state,
                getAllIndustries : [],
                 error : null,
                 isLoading: true
            }
        default:
            return state
    }
}