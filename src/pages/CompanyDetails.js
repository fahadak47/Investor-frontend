import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import img from "../images/investor.jpg";
import FollowButton from "../component/Common/FollowButton";
import IntrestedButton from "../component/Common/IntrestedButton";
import {
  handleCompanyFollow,
  handleIntrestedCompany,
} from "../redux/actions/companyIntrectionActions";
import { useParams } from "react-router-dom";
import { getCompanyByIDHandle } from "../redux/actions/getCompanyByIdAction";

function CompanyDetails() {
  const { isLoading, getCompanyByid, error } = useSelector(
    (state) => state.getCompanyByidReducer
  );

  const { id } = useParams();

  console.log(id, "----------");

  const [follow, setFollow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingIntrest, setIsProcessingIntrest] = useState(false);
  const [intrest, setintrested] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getCompanyByid.length) {
      setFollow(getCompanyByid[0].followed);
      setintrested(getCompanyByid[0].interested);
    }
  }, [getCompanyByid]);

  useEffect(() => {
    getCompanyByIDHandle(dispatch, id);
  }, [id]);

  if (isLoading) {
    return (
      <>
        <div className="container">
          <div className="main-body">
            <Spinner animation="border" size="lg" variant="primary" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container " id="companyDetailsPage">
      <div className="TopSection">
        <h1>Company Details</h1>
      </div>
      {getCompanyByid.length !== 0 ? (
        getCompanyByid.map((val, ind) => {
          return (
            <div className="company_Details_card">
              <div className="company_Details">
                <div className="first_Div_Company_details">
                  <div className="company_Details_flex">
                    <span>Company Name : </span>
                    <p>{val?.company_name}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>First Name : </span>
                    <p>{val?.first_name}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>Last Name : </span>
                    <p>{val?.last_name}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>Email : </span>
                    <p>{val?.email}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>Contact Number : </span>
                    <p>{val?.contact_number}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>Address : </span>
                    <p>{val?.address}</p>
                  </div>
                  <div className="company_Details_flex">
                    <span>UserName :</span>
                    <p>{val?.username ? val?.username : "---"}</p>
                  </div>

                  <div className="company_Details_flex">
                    <span>Description : </span>
                    <p>{val?.description}</p>
                  </div>
                </div>

                <div className="company_img">
                  <img
                    src={val?.logo}
                    //   src={img}
                    alt=""
                  />
                  <div className="p-1 mt-4">
                    <FollowButton
                      follow={follow}
                      disabled={isProcessing}
                      onClick={() =>
                        handleCompanyFollow(val?.id, setFollow, setIsProcessing)
                      }
                    />
                    <IntrestedButton
                      style={{ marginLeft: "3px" }}
                      intrested={intrest}
                      disabled={isProcessingIntrest}
                      onClick={() =>
                        handleIntrestedCompany(
                          val?.id,
                          setintrested,
                          setIsProcessingIntrest
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : error ? (
        <div styles>{error}</div>
      ) : null}
    </div>
  );
}

export default CompanyDetails;
