import React from "react";

const GetStartCard = ({ title, paragraph, svgIcon, btnText }) => {
  return (
    <div className="col-xl-4  col-lg-12 col-12  mt-2">
      <div className="card mx-auto Card_hover gy-5" style={{ width: "22rem" }}>
        <div className="d-flex">{svgIcon}</div>
        <div className="card-body">
          <h5 className="Card_heading">{title}</h5>
          <p className="card_para">{paragraph}</p>
          <a className="getBtn rounded">{btnText}</a>
        </div>
      </div>
    </div>
  );
};

export default GetStartCard;
