import { apiHandle } from "../apiHandler";

// data encryption
export const attachCardApi = (data) => {
  console.log(data,"coverted");
    return apiHandle().post("/company/auth/card", data);
  };


  export const updateCardApi = (data) => {
    console.log(data,"coverted");
      return apiHandle().post("/company/auth/card", data);
    };
  


// get card details api
  export const getCardDetailsApi = () => {
      return apiHandle().get("/company/auth/card");
    };
    

    // =============================== CARD ACTIVE SHEDULE APIS=========================================

    export const cardActiveSheduleApi = (data) => {
        return apiHandle().post(`/company/auth/activeSchedule`,data);
      };
      

      // ================================== GET CHARGE RATE PER DAY API =======================
      
      export const getChargeRateApi = () => {
          return apiHandle().get("/company/auth/activeSchedule/chargeRate");
        };
        

        // ======================================== GET ACTIVE SHEDULE API = ==================================

        export const getActiveScheduleApi = () => {
            return apiHandle().get("/company/auth/activeSchedule");
          };
          