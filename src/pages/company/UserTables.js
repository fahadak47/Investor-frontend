import React from "react";
import { Col, Row } from "react-bootstrap";
import UserViewsTable from "../../component/dashboard/UserViewsTable";
import IntrestedUserTable from "../../component/data Table/IntrestedUserTable";
import UsersWithVideoViews from "../../component/data Table/UsersWithVideoViews";

const UserTables = () => {
  return (
    <>
      <>
        <Row>
          <Col>
            <UserViewsTable />
          </Col>
        </Row>
      </>

      <>
        <Row>
          <Col>
            <IntrestedUserTable />
          </Col>
        </Row>
      </>

      <Row>
        <Col>
          <UsersWithVideoViews />
        </Col>
      </Row>
    </>
  );
};

export default UserTables;
