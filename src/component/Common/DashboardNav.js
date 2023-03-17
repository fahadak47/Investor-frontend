import React from "react";
import { motion } from "framer-motion";
import logo from "../../images/newlogo.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { display } from "@mui/system/Box";
import {GoPrimitiveDot } from "react-icons/go"
import { useEffect } from "react";
import { getDeshboardApi } from "../../api/companyApis/analyticsApi";
import { useState } from "react";
import { Tooltip } from 'antd';
import icon from "../../images/user.png";
import { LogoutHandle } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";






// const IsActive = localStorage.getItem("IP_Company_isActive") ;

// console.log(IsActive === 'true' ? "ok" : "no" ,"oooooooooooooooooooooooooooooo");

export default function DashboardNav({ isOpen, children, width }) {

  const [data,setData] = useState(false)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true);
    getDeshboardApi()
      .then((res) => {
        setData(res.data.data[0]?.is_active);
        localStorage.setItem( "IP_Company_isActive", JSON.stringify(res.data.data[0]?.is_active)
        );

        console.log(res.data.data[0]?.is_active,"check active status");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error in deshboard api", error.response.data);
      });
  }, []);
  

  console.log(data,"data");
  return (
    <motion.div
      className={`${width > 600 ? "navbar_dashboard" : "sm_navbar_dashboard"}`}
      animate={{
        width: isOpen ? "90%" : "100%",

        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height:"60px"
        }}
      >
        <div style={{ width: "300px", height: "100px" }}>
          <Link to="/">
            <img
              src={logo}
              style={{
                width: width > 600 ? "250px" : "100px",
                padding: "1rem",
                position: "relative",
                bottom: "3rem",
              }}
            />
          </Link>
        </div>

        {/* <Button style={{ padding: "1rem" }}>Notifications</Button> */}
        <div
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            // width: "290px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
              marginRight: "12px",
            }}
          >

            {data === true  ? (
             <Tooltip placement="topLeft" title={"You are Active!"}>
               
               <img src={require("../../images/activeblink.gif")} height="25px" width="25px"/>
             
             </Tooltip>
            ) 
             :
            
             <Tooltip placement="topLeft" title={"You are InActive!"}>
             

             <GoPrimitiveDot color="gray" style={{width:"24px",height:"24px"}}/>
             
           </Tooltip>
            
           

          }
          </div>
          <div>
          <Button
            size="large"
            type="primary"
            shape="circle"
            icon={
              <MdOutlineNotificationsNone
                color="white"
                style={{ fontSize: "20px" }}
              />
            }
          />
        </div>

        
                <li class="nav-item dropdown">
                  <a
                  style={{marginBottom:"15px"}}
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img width="40" src={icon} />
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  
                    <li>
                      <Link class="dropdown-item" to="/Profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to="/"
                        onClick={() => LogoutHandle(dispatch)}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </div>
      </div>
      <div
        className={`${
          width > 600 ? "main_child_pages" : "sm_main_child_pages"
        } `}
      >
        <main className={` container-fluid p-5`}>{children}</main>
      </div>
    </motion.div>
  );
}
