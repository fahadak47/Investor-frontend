import { Col, Row } from "antd";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import img from "../../images/heroImg.png";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="heroWrapper">
      <Row
        gutter={[24, 16]}
        // style={{  margin: "0 auto" }}
        className="container-fluid"
        justify="space-between"
        align="middle"
      >
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={10} xl={10}>
          <div>
            <h2 className="commonH2">
              Everyone should be able to in the next <span>big thing.</span>
            </h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At
            </p>

            <Button
              type="primary"
              className="heroBtn"
              onClick={() => {
                navigate("/signUpCompany");
              }}
            >
              Start Investment
            </Button>
          </div>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
          <img src={img} className="img-fluid w-100" alt="heroImg" />
        </Col>
      </Row>
    </div>
  );
}
