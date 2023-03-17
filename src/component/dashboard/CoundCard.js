import React from "react";
import { Card, Spinner } from "react-bootstrap";

const CoundCard = ({ color, data, title, isloading }) => {
  console.log("count card loading", isloading);
  return (
    <>
      <Card
        style={{
          borderBottomColor: color,
          borderBottomWidth: "7px",
          padding: "5px",
          width: "200px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isloading ? (
          <Spinner animation="border" size="lg" variant="primary" />
        ) : (
          <h1>{data}</h1>
        )}
        <p style={{ fontWeight: "bold" }}>{title}</p>
      </Card>
    </>
  );
};

export default CoundCard;
