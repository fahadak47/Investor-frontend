import { Button, Col, Divider, Row } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import img from "../../images/investor.jpg";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getCompanyByIDHandle } from "../../redux/actions/getCompanyByIdAction";
import { Spinner } from "react-bootstrap";
import IntrestedButton from "../../component/Common/IntrestedButton";
import FollowButton from "../../component/Common/FollowButton";
import {
  handleCompanyFollow,
  handleIntrestedCompany,
} from "../../redux/actions/companyIntrectionActions";
import ActiveVideos from "./ActiveVideos";
import { getActiveCompanyVideoById } from "../../api/companyApis/companyVideosApi";
import { getActiveCompanyVideosByIdHandle } from "../../redux/actions/CompayVideoActions";

const CompanyDetails2 = () => {
  const { isLoading, getCompanyByid, error } = useSelector(
    (state) => state.getCompanyByidReducer
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(id, "----------", getCompanyByid);

  const [follow, setFollow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingIntrest, setIsProcessingIntrest] = useState(false);
  const [intrest, setintrested] = useState(false);

  useEffect(() => {
    console.log("useeeeeEFFFFEEEECCCCCTTTTTTTTTT");
    if (getCompanyByid.length) {
      setFollow(getCompanyByid[0].followed);
      setintrested(getCompanyByid[0].interested);
    } else {
      getCompanyByIDHandle(dispatch, id);
      getActiveCompanyVideoById(dispatch, id);
    }
  }, [getCompanyByid]);

  useEffect(() => {
    getCompanyByIDHandle(dispatch, id);
    getActiveCompanyVideosByIdHandle(dispatch, id);
  }, [id]);

  if (isLoading) {
    return (
      <>
        <div className="container">
          <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Spinner animation="border" size="lg" variant="primary" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="profileUser">
        <div className="container">
          <Row style={{ marginTop: "8rem" }} gutter={[16, 48]}>
            <Col
              className="gutter-row "
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <div className="profilrAvatar">
                <Avatar
                  src={getCompanyByid[0]?.logo}
                  style={{ verticalAlign: "middle" }}
                  size={{
                    xs: 50,
                    sm: 80,
                    md: 100,
                    lg: 120,
                    xl: 130,
                    xxl: 140,
                  }}
                  icon={<AntDesignOutlined />}
                />

                <div className="profileNameDiv">
                  <h4>{getCompanyByid[0]?.company_name}</h4>
                  <h5>Accredited Investor</h5>
                </div>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="profileAmountDivWrapper">
                <div className="profileAmountDiv">
                  {/* <h5>Available Cash Balance</h5>
                  <h2>US $0.00 </h2> */}
                </div>
                <div className="profileDepositeBtnDiv">
                  {/* <Button type="primary">Deposit</Button>
                  <Button type="primary" ghost>
                    Withdraw
                  </Button> */}
                  <FollowButton
                    follow={follow}
                    disabled={isProcessing}
                    onClick={() =>
                      handleCompanyFollow(
                        getCompanyByid[0]?.id,
                        setFollow,
                        setIsProcessing
                      )
                    }
                  />
                  <IntrestedButton
                    style={{ marginLeft: "3px" }}
                    intrested={intrest}
                    disabled={isProcessingIntrest}
                    onClick={() =>
                      handleIntrestedCompany(
                        getCompanyByid[0]?.id,
                        setintrested,
                        setIsProcessingIntrest
                      )
                    }
                  />
                </div>
              </div>
            </Col>

            <Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
              <Tabs defaultActiveKey="2">
                <Tabs.TabPane
                  className="ProfileView"
                  tab="Account Detail"
                  key="1"
                >
                  <div>
                    {getCompanyByid.length !== 0 ? (
                      getCompanyByid.map((val, ind) => {
                        return (
                          <div className="card mb-3">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">First Name</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.first_name}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Last Name</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.last_name}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Company Name</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.company_name}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.description}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Industry</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.industry?.title}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Contact Number</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.contact_number}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.email}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-sm-5">
                                  <h6 className="mb-0">Address</h6>
                                </div>
                                <div className="col-sm-7 text-secondary">
                                  {val?.address}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : error ? (
                      <div>{error}</div>
                    ) : null}
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Videos" key="2">
                  <div>
                    <ActiveVideos />
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </Col>

            <Col
              className="gutter-row mt-5 px-3 py-5"
              xs={24}
              sm={24}
              md={24}
              lg={8}
              xl={8}
            >
              <h4 style={{ fontWeight: "bold", fontFamily: "poppins" }}>
                Finish setting Up Yours Investor Account
              </h4>
              <p>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before final copy is available. It
                is also used to temporarily replace text in a process called
                greeking, which allows designers to consider the form of a
                webpage or publication...
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails2;
