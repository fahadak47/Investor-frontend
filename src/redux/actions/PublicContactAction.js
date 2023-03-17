import {
  displayErrorToast,
  displaySuccessToast,
} from "../../helper/toast_notification_function";
import { Public_contact } from "../../api/Public_Apis";
export const Public_contact_action = (formData, SetData,setProcessLoading,setError) => {
  Public_contact(formData)
    .then((res) => {
      setProcessLoading(true)
      if (res.data.success) {
      SetData({
        email: "",
        contact_number: "",
        industry_id: "",
        message: "",
      });
        setProcessLoading(false)
        displaySuccessToast("Your Message is successfully submit----!");
      }


    })
    .catch((error) => {
      // console.log(error?.response?.data.message[0] ,"====================");
      setError(error?.response?.data.message[0])
      setProcessLoading(true)
      displayErrorToast(error);
      setProcessLoading(false)
    });
};
