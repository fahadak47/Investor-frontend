import { Col } from "antd";
import React from "react";
import HomeCommonCard from "../Common/HomeCommonCard";
import img1 from "../../images/how-work1.png"
import img2 from "../../images/how-work2.png"
import img3 from "../../images/how-work3.png"
import { Row } from "react-bootstrap";


export default function HowItWork() {
  const data = [
    {
      img:img1,
      title:"Access the startup asset class",
      desc: "We lobbied to change the rules so everyday people outside the venture bubble could finally invest in private startups, a historically high performing asset class.",
    },
    {
        img:img2,
        title:"Invest in vetted companies",
        desc: "Only a small selection of companies make it through our due diligence process. We’re not an open marketplace where anyone can just click and raise",
      }, {
        img:img3,
        title:"Diversify like a VC",
        desc: "We offer lower minimums than traditional angel investments so you can back more companies. When you diversify, you increase your odds of positive returns.",
      },
  ];


  return (
    <div className="how-works container-fluid py-5">
      <Row  className="justify-content-center">
        <Col
          className="gutter-row text-center"
          xs={22}
          sm={22}
          md={22}
          lg={18}
          xl={18}
        >
          <h2 className="commonH2">How It Works</h2>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et ju
          </p>
        </Col>
      </Row>

      <Row gutter={[24, 16]} justify="center" align="middle">
        {data.map((val, ind) => {
          return (
            <div className="col-12 col-md-4 mt-3">

             
              <HomeCommonCard 
                backgroundColor="#111A3E"
                 img={val.img}
                 desc={val.desc}
                 title={val.title}

              />
            </div>
          );
        })}
      </Row>
    </div>
  );
}
