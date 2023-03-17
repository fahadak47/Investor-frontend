import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

import { handleCompanyFollow } from "../../redux/actions/companyIntrectionActions";
import FollowButton from "../Common/FollowButton";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { displayWorrningToast } from "../../helper/toast_notification_function";
// import { Card } from 'antd';
// const { Meta } = Card;

export default function CompanyCard({
  id,
  img,
  mark,
  CompanyName,
  text,
  followed,
  intrested,
  isLevelTwo,
  onClick,
}) {
  const isUserLevelTwo = JSON.parse(
    localStorage.getItem("IP_levelTwoProfileStatus")
  );
  const [follow, setFollow] = useState(followed);
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(id);
  function isEnableCard() {
    console.log(isUserLevelTwo == "valid", isLevelTwo);
    if (isUserLevelTwo === "valid" && isLevelTwo) {
      return true;
    }
    if (isUserLevelTwo !== "valid" && !isLevelTwo) {
      return true;
    }

    if (isUserLevelTwo == "valid" && !isLevelTwo) {
      return true;
    }

    return false;
  }

  console.log("isEnableCard", isEnableCard());

  return (
    <div className="cardWrapper">
      <Card sx={{ maxWidth: 345, minHeight: "320px" }}>
        <CardMedia
          component="img"
          height="160"
          image={img}
          sx={{ objectFit: "contain !important" }}
          alt="green iguana"
          onClick={() => {
            if (isEnableCard()) {
              onClick();
            } else {
              displayWorrningToast("Upgrade your User Level to View Details");
            }
          }}
          className={isEnableCard() ? "" : "cardimgBlur"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            className="cardText"
            component="div"
            onClick={() => {
              if (isEnableCard()) {
                onClick();
              } else {
                displayWorrningToast("Upgrade your User Level to View Details");
              }
            }}
          >
            {CompanyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <div style={{ display: "flex", margin: "0 auto", gap: "1rem" }}>
            {intrested && (
              <div>
                <Button variant="outline-danger" disabled={true}>
                  <span>
                    <AiFillHeart color="red" />
                  </span>
                </Button>
              </div>
            )}

            {
              <div>
                {isEnableCard() ? (
                  <FollowButton
                    follow={follow}
                    disabled={isProcessing}
                    onClick={() =>
                      handleCompanyFollow(id, setFollow, setIsProcessing)
                    }
                  />
                ) : (
                  <FollowButton
                    follow={follow}
                    disabled={true}
                    onClick={() =>
                      handleCompanyFollow(id, setFollow, setIsProcessing)
                    }
                  />
                )}
              </div>
            }
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
