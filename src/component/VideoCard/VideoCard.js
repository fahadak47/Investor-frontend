import React from "react";
// import { Card, CardImg } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import ReactPlayer from "react-player";
import { Card, Dropdown, Popconfirm, Space,message, Tooltip } from "antd";
import {
  EllipsisOutlined,
  EyeOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { GoPrimitiveDot } from "react-icons/go";


const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const { Meta } = Card;

const VideoCard = ({
  thumbnail,
  title,
  desc,
  active,
  views,
  onClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
}) => {



  return (
   

    <>
    <Card
      hoverable
      style={{
        width: 300,
        boxShadow:
          "2px 1px 7px -1px rgba(0,0,0,0.25), -2px 1px 7px -1px rgba(0,0,0,0.25)",
      }}
      cover={
        <img
          src={thumbnail}
          alt={title}
          width={"300px"}
          height={170}
          onClick={onClick}
          // style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        />
      }
      actions={[
        <span
          style={{ borderColor: "red", color: "red" }}
          // onClick={onDeleteClick}
        >
          <Popconfirm
      title="Are you sure to delete this task?"
      onConfirm={onDeleteClick}
      okText="Yes"
      cancelText="No"
>
          <DeleteOutlined key={"delete"} />
          
          </Popconfirm>
        </span>,
        <div onClick={onEditClick}>
          <FormOutlined key={"edit form"} />
        </div>,
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={onViewClick}
        >
          <span style={{ marginRight: "4px" }}>{views}</span>{" "}
          <EyeOutlined key="eye" />,
        </div>,
             <Tooltip placement="topLeft" title={active ? "You are Active" : "You are InActive"}>

        <GoPrimitiveDot size={22} color={active ? "green" : ""} />,
        </Tooltip>
      ]}
    >
      <Meta title={title} description={desc} />

    </Card>


   </>
  );
};

export default VideoCard;
