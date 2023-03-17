import React from "react";
import { Col, Row } from "react-bootstrap";
import CreditCard from "../../component/Common/CreditCard";
import Divider from "../../component/Common/Divider";

const Settings = () => {
  return (
    <>
      <Row>
        <h3>Settings</h3>
      </Row>
      <Divider space={15} />
      <Row>
        <Col>
          <CreditCard />
        </Col>
      </Row>
    </>
  );
};

export default Settings;
