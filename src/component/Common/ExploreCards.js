import React from "react";
import { Card, Col, Row } from "antd";
const { Meta } = Card;

export default function ExploreCards({
  img,
  title,
  desc,
  Raised,
  rate,
  onClick,
}) {
  return (
    <>
      <Card
        hoverable
        // style={{
        //   width: 240,
        // }}
        cover={<img alt="example" src={img} />}
        onClick={onClick}
      >
        <Meta title={title} description={desc} />

        <Row className="mt-3">
          <Col
            className="border-right pr-2"
            style={{ borderRight: "1px solid lightGray" }}
            span={12}
          >
            <p class="text-primary mb-0 ">{rate}</p>
            <p>{Raised}</p>
          </Col>

          <Col className="px-2" span={12}>
            <p class="text-primary mb-0">{rate}</p>
            <p>{Raised}</p>
          </Col>
        </Row>
      </Card>
    </>
  );
}
