import React from "react";
import { Col, Row } from "react-bootstrap";
import UserVideoViewsTable from "../../component/data Table/UserVideoViewsTable";

const UserDetailVideoViewsTable = ({ id }) => {
  return (
    <>
      <Row>
        <h3>Video Views Table</h3>
      </Row>
      <>
        <Row>
          <Col>
            <UserVideoViewsTable id={id} />
          </Col>
        </Row>
      </>
    </>
  );
};

export default UserDetailVideoViewsTable;
