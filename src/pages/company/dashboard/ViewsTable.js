import React from "react";
import { Col, Row } from "react-bootstrap";
import UserDataTable from "../../../component/data Table/UserDataTable";
// import UserViewsTable from "../../../component/dashboard/UserViewsTable";
// import IntrestedUserTable from "../../../component/data Table/IntrestedUserTable";
// import UsersWithVideoViews from "../../../component/data Table/UsersWithVideoViews";

const ViewsTable = () => {
  return (
    <>
      <>
        <Row>
          <div
            className="blue_right_Border"
            style={{ backgroundColor: "white", marginTop: "2rem" }}
          >
            <Col>
              <UserDataTable />
            </Col>
          </div>
        </Row>
      </>
    </>
  );
};

export default ViewsTable;
