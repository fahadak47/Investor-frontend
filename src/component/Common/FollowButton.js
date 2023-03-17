import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

const FollowButton = ({ follow, disabled, onClick }) => {
  return (
    <>
      <Button
        variant={!follow ? "outline-primary" : "outline-secondary"}
        onClick={onClick}
        disabled={disabled ? true : false}
      >
        {!follow ? (
          <>
            <span>
              <AiOutlinePlus />
            </span>{" "}
           
          </>
        ) : (
          <>
            <span>
              <AiOutlineCheck />
            </span>{" "}
            
          </>
        )}
      </Button>
    </>
  );
};

export default FollowButton;
