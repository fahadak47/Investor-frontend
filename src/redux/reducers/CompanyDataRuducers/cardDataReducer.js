import { logoutCompanyType } from "../../constants/Common_constants"
import { ERROR_GETTING_USER_CARD_DATA, SAVE_USER_CARD_DATA, START_GETTING_USER_CARD_DATA } from "../../constants/get_card_constants"



const INITIAL_STATE = {
    userCardLoading : true,
    userCard : null,
    error : null
}

export const GetCardDataReducer = (state = INITIAL_STATE,action) => {

    const {type, payload} = action

    switch (type) {
        case START_GETTING_USER_CARD_DATA:
            return {
                ...state,
               userCardLoading:true,
               error : null
            }
  
        case SAVE_USER_CARD_DATA:
            return {
                ...state,
                userCardLoading:false,
                userCard : payload,
                error:null
            }

            case ERROR_GETTING_USER_CARD_DATA:
                return {
                    ...state,
                     userCardLoading:false,
                     error : payload,
                }


        case logoutCompanyType:
            return {
                ...state,
                userCard : null,
                 error : null,
                 userCardLoading: true
            }
        default:
            return state
    }
}