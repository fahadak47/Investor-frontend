import { Avatar, Col, Row } from "antd";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AntDesignOutlined } from "@ant-design/icons";
import { GetCompanyProfileApi } from "../../api/companyApis/CompanyProfileApis";
import { useState } from "react";
import { useEffect } from "react";
import { Buffer } from "buffer";
import { displayErrorToast } from "../../helper/toast_notification_function";
import { TbDotsVertical } from "react-icons/tb";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { LogoutHandle } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";

export default function SideBarProfile({ width, isOpen }) {
  const [userState, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [formData, setformData] = useState(null);
  const [err, setErr] = useState();

  const [state, setState] = useState({
    name: "MUdassir",
    fName: "jamal",
  });

  const [convertedImg, setConvertedImg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleGetProfile = () => {
    GetCompanyProfileApi()
      .then((response) => {
        console.log("Profile responce log", response);
        let logoBuffer = response.data?.data[0].logo;

        let base64 = Buffer.from(logoBuffer).toString("base64");

        setConvertedImg("data:image/jpg;base64," + base64);
        setUser(response.data?.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err);
        displayErrorToast(err);
        console.log("Profile error log", err);
      });
  };

  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <Col
      className="gutter-row "
      style={{
        width:
          width < 600 && isOpen
            ? "100%"
            : width > 600 && isOpen
            ? "230px"
            : "45px",
      }}
      xs={24}
      sm={24}
      md={24}
      lg={24}
      xl={24}
    >
      {isLoading ? (
        <h5>Loading...</h5>
      ) : err ? (
        <h5>Error</h5>
      ) : (
        <div className="d-flex py-2">
          <Avatar
            onClick={() => navigate("/Profile")}
            src={userState?.logo}
            style={{ verticalAlign: "middle" }}
            size={{
              xs: 35,
              sm: 35,
              md: 35,
              lg: 35,
              xl: 35,
              xxl: 35,
            }}
            icon={<AntDesignOutlined />}
          />

          {isOpen && (
            <div className="sidebarprofileNameDiv">
              {/* <h4>{userState?.first_name}</h4> */}
              <div>
                <h5>
                  {userState?.first_name} {userState?.last_name}{" "}
                </h5>
                <h6>{userState?.email}</h6>
              </div>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="dropdown-toggle"
                >
                  <TbDotsVertical color="white" style={{ fontSize: "18px" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      // class="dropdown-item"
                      to="/Profile"
                      onClick={() => navigate("/Profile")}
                    >
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      // class="dropdown-item"
                      to="/"
                      onClick={() => LogoutHandle(dispatch)}
                    >
                      Logout
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      )}
    </Col>
  );
}
