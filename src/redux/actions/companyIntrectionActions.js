import {
  followCompanyApi,
  intrestedCompanyApi,
} from "../../api/companyInteractionsApis";

export const handleCompanyFollow = (id, setFollow, setProcessing) => {
  setProcessing(true);
  setFollow((prev) => !prev);
  followCompanyApi(id)
    .then((res) => {
      console.log("follow company response", res);
      setProcessing(false);
    })
    .catch((error) => {
      setProcessing(false);
      setFollow((prev) => !prev);
      console.log("eror while following", error.response);
    });
};
export const handleIntrestedCompany = (id, setIntrested, setProcessing) => {
  setProcessing(true);
  setIntrested((prev) => !prev);
  intrestedCompanyApi(id)
    .then((res) => {
      console.log("follow company response", res);
      setProcessing(false);
    })
    .catch((error) => {
      setProcessing(false);
      setIntrested((prev) => !prev);
      console.log("eror while following", error.response);
    });
};
