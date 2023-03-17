import { Col, Row } from "antd";
import React from "react";
import ExploreCards from "../Common/ExploreCards";
import explore1 from "../../images/explore1.png";
import explore2 from "../../images/explore2.png";
import explore3 from "../../images/explore3.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const ExploreInvestment = () => {
  const navigate = useNavigate();

  const data = [
    {
      img: explore1,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
    {
      img: explore2,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
    {
      img: explore3,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
    {
      img: explore2,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
    {
      img: explore1,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
    {
      img: explore3,
      title: "Starup Name",
      desc: "Mass Production Building System",
      rate: "$11446945",
      Raised: "Raised",
    },
  ];
  return (
    <div className=" py-5 explore_investment">
      <Row gutter={[24, 16]} justify="center" align="middle">
        <Col
          className="gutter-row text-center"
          xs={22}
          sm={22}
          md={22}
          lg={18}
          xl={18}
        >
          <h2 className="commonH2">Explore Investments</h2>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et ju
          </p>
        </Col>
      </Row>

      <Row gutter={[20, 20]} justify="center" align="middle">
        {data.map((val, ind) => {
          return (
            <Col
              className="gutter-row mt-4"
              xs={22}
              sm={12}
              md={8}
              lg={8}
              xl={8}
            >
              <ExploreCards
                title={val.title}
                desc={val.desc}
                rate={val.rate}
                Raised={val.Raised}
                img={val.img}
                onClick={() => navigate("/signUpCompany")}
              />
            </Col>
          );
        })}
      </Row>

      <Row gutter={[24, 16]} justify="center" align="middle">
        <Button
          className="mt-5 px-3 allStartupbutton"
          onClick={() => {
            navigate("/signUpUser");
          }}
        >
          View All Startups
        </Button>
      </Row>
    </div>
  );
};

export default ExploreInvestment;
