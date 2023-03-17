import React from "react";
import { Button } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const IntrestedButton = ({ intrested, disabled, onClick, style }) => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Press to show Intrest in Company</Tooltip>}
      >
        <Button
          variant={"outline-danger"}
          onClick={onClick}
          disabled={disabled ? true : false}
          style={style}
        >
          {intrested ? (
            <>
              <span>
                <AiFillHeart color="red" />
              </span>
              <span color="red"> Intrested</span>
            </>
          ) : (
            <>
              <span>
                <AiOutlineHeart color="red" />
              </span>
              <span color="red"> Showed Intrest</span>
            </>
          )}
        </Button>
      </OverlayTrigger>
    </>
  );
};

export default IntrestedButton;
