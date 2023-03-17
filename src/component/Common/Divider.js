import React from "react";

const Divider = ({ space }) => {
  return (
    <div
      style={{
        height: `${space}px`,
        width: `${100}%`,
        marginTop: `${space}px`,
      }}
    ></div>
  );
};

export default Divider;
