import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getDeshboardApi } from "../../../api/companyApis/analyticsApi";
import AllVideoViewsChart from "../../../component/charts/AllVideoViewsChart";
import IntrestedUserChart from "../../../component/charts/IntrestedUserChart";
import MediaViewsChart from "../../../component/charts/MediaViewsChart";
import ViewsChart from "../../../component/charts/ViewsChart";
import CoundCard from "../../../component/dashboard/CoundCard";

const Analictics = () => {
  const [data, setData] = useState(null);
  const [isloading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDeshboardApi()
      .then((res) => {
        setData(res.data.data[0]);
        localStorage.setItem( "IP_Company_isActive", JSON.stringify(res.data.data[0]?.is_active)
        );

        console.log(res.data.data[0]?.is_active,"check active status");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error in deshboard api", error.response.data);
      });
  }, []);

  const countData = [
    {
      color: "crimson",
      value: data?.profile_view_count,
      title: "Profile Views",
    },
    {
      color: "skyblue",
      value: data?.presentation_view_count,
      title: "Presentations Views",
    },
    {
      color: "plum",
      value: data?.interested_users_count,
      title: "Interested User",
    },
    {
      color: "orange",
      value: data?.active_booked_days_count,
      title: "Remaining live days",
    },
    {
      color: "lightgreen",
      value: data?.active_days_count,
      title: "Active Days",
    },
  ];
  return (
    <>
         <Row className='my-1'>
        <h2 style={{fontFamily:"poppins",fontWeight:"600"}}>Company Stats</h2>
      </Row>
      <Row>
        {countData.map((val, index) => {
          return (
            <Col className="mt-3 mb-3">
              <CoundCard
                isloading={isloading}
                color={val?.color}
                key={index}
                data={val.value}
                title={val.title}
              />
            </Col>
          );
        })}
      </Row>
      <>
      <Row className='my-2'>
        <h2 style={{fontFamily:"poppins",fontWeight:"600"}}>Graphical Analysis</h2>
      </Row>
        <Row>
          <Col className="mt-3">
          <MediaViewsChart />

          </Col>
          <Col className="mt-3">
            <AllVideoViewsChart />
          </Col>
          <Col className="mt-3">
            <IntrestedUserChart />
          </Col>
          <Col className="mt-3">
          <ViewsChart />

          </Col>
        </Row>
      </>
    </>
  );
};

export default Analictics;
