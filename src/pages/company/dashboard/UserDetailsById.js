import { Tabs } from "antd";
import { Button, Col, Divider, Row } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import img from "../../../images/investor.jpg";
import Analictics from "./Analictics";
import ViewsChart from "../../../component/charts/ViewsChart";
import { useParams } from "react-router-dom";
import {
  getUserLevelTwoProfileById,
  getUserProfileBId,
} from "../../../api/companyApis/CompanyProfileApis";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { displayErrorToast } from "../../../helper/toast_notification_function";
import UserViewsLineChart from "../../../component/charts/UserViewsLineChart";
import UserVideoViewsLineChart from "../../../component/charts/UserVideoViewsLineChart";
import UserEachVideoViewsBarChart from "../../../component/charts/UserEachVideoViewsBarChart";
import UserDetailVideoViewsTable from "../UserDetailVideoViewsTable";

export const UserDetailsById = () => {
  const [user, setUser] = useState([]);
  const [userLevelTwo, setUserLevelTwo] = useState([]);
  const [name, setName] = useState({ fName: "", lName: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  let { id } = useParams();

  const handleGetProfile = () => {
    setLoading(true);
    getUserLevelTwoProfileById(id)
      .then((response) => {
        console.log("Profile responce log level twop", response.data.data);
        setUserLevelTwo(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Profile error log", err);
        displayErrorToast(err);
        setError(err?.response.data?.message[0]);
        setLoading(false);
      });

    getUserProfileBId(id)
      .then((response) => {
        console.log("Profile responce log", [response.data.data]);
        setUser([response.data.data]);
        console.log(response.data.data, "000000");
        setName({
          fName: response.data.data.first_name,
          lName: response.data.data.last_name,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log("Profile error log", err);
        displayErrorToast(err);
        setError(err?.response.data?.message[0]);
      });
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  if (loading) {
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
    <div id="profileUser">
      <div className="container">
        <Row style={{ marginTop: "4rem" }} gutter={[16, 48]}>
          <Col className="gutter-row " xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="profilrAvatar">
              <Avatar
                src={img}
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
                <h4>
                  {name?.fName ? name?.fName : "-"}{" "}
                  {name?.lName ? name?.lName : "-"}
                </h4>
                <h5>Accredited Investor</h5>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="profileAmountDivWrapper">
              {/* <div className="profileAmountDiv">
                <h5>Available Cash Balance</h5>
                <h2>US $0.00 </h2>
              </div> */}
              <div className="profileDepositeBtnDiv">
                {/* <Button type="primary">Deposit</Button> */}
                {user[0]?.interested ? (
                  <Button
                    type="primary"
                    style={{ borderColor: "red", color: "red" }}
                    ghost
                  >
                    Intrested
                  </Button>
                ) : null}
              </div>
            </div>
          </Col>

          <Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                className="ProfileView"
                tab="Account Detail"
                key="1"
              >
                <div>
                  {user.length !== 0 ? (
                    user.map((val, ind) => {
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
                                <h6 className="mb-0">contact_number</h6>
                              </div>
                              <div className="col-sm-7 text-secondary">
                                {val?.contact_number}
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

                            <div className="row">
                              <div className="col-sm-5">
                                <h6 className="mb-0">email</h6>
                              </div>
                              <div className="col-sm-7 text-secondary">
                                {val?.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : error ? (
                    <h2 className="d-flex justify-content-center align-items-center color-red fw-bold">
                      {error}
                    </h2>
                  ) : null}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane
                className="ProfileView"
                tab="Profile level Two"
                key="2"
              >
                {userLevelTwo.length !== 0 || null ? (
                  userLevelTwo.map((value, ind) => {
                    return (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-5">
                              <h6 className="mb-0">Passport Number</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                              {value?.passport_number
                                ? value?.passport_number
                                : "---"}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-5">
                              <h6 className="mb-0">Description</h6>
                            </div>
                            <div className="col-sm-7 text-secondary">
                              {value?.property_address
                                ? value?.property_address
                                : "---"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : error ? (
                  <h1>{error}</h1>
                ) : null}
              </Tabs.TabPane>

              <Tabs.TabPane className="ProfileView" tab="Analytics" key="3">
                <div className=" mb-3">
                  <div className="row">
                    <div className="col m-2">
                      <UserViewsLineChart id={id} />
                    </div>
                    <div className="col m-2">
                      <UserVideoViewsLineChart id={id} />
                    </div>
                    <div className="col m-2">
                      <UserEachVideoViewsBarChart id={id} />
                    </div>
                  </div>
                  <UserDetailVideoViewsTable id={id} />
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
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available. It is
              also used to temporarily replace text in a process called
              greeking, which allows designers to consider the form of a webpage
              or publication...
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};
