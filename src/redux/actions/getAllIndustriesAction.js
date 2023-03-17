import { PublicGetIndustriesApi } from "../../api/Public_Apis";
import { ERROR_GETTING_LIST_INDUSTRIES, SAVE_GETTING_LIST_INDUSTRIES, START_GETTING_ALL_INDUSTRIES } from "../constants/get_All_Industries_constant";



export const getAllIndustriesHandle = (dispatch) => {

    dispatch({
        type:START_GETTING_ALL_INDUSTRIES,
      });

      PublicGetIndustriesApi().then((res) => {
        console.log(res,"company by id")

        if (res?.data.success) {
            return dispatch({
                type: SAVE_GETTING_LIST_INDUSTRIES,
                payload: res.data ? res.data.data : []
            })
            
        }


    }).catch((error) => {
        console.log(error,"---------------indus err");
        // dispatch({
        //     type: ERROR_GETTING_LIST_INDUSTRIES,
        //     payload: error.response.data.message[0],
        //   });
    })
}
