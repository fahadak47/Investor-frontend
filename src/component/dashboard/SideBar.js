import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  Facros,
} from "react-icons/fa";
import { ImCross, ImProfile } from "react-icons/im";
import {
  MdFullscreen,
  MdMessage,
  MdOutlinePayment,
  MdSettings,
} from "react-icons/md";
import { TbWorldUpload } from "react-icons/tb";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { RiDashboardFill, RiGalleryLine } from "react-icons/ri";
import { GiVideoConference } from "react-icons/gi";
import { BsCartCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import DashboardNav from "../Common/DashboardNav";
// import logo from "../../images/logo.png";
import DashboardFooter from "../Common/DashboardFooter";

import HistoryIcon from "@mui/icons-material/History";
import GridViewIcon from "@mui/icons-material/GridView";
import SideBarProfile from "./SideBarProfile";
const routes = [
  {
    path: "/company/dashboard",
    name: "Dashboard",
    icon: <GridViewIcon />,
  },
  {
    path: "/company/presentation_videos",
    name: "Videos Library",
    icon: <RiGalleryLine fontSize={20} />,
  },
  {
    path: "/company/payments",
    name: "Payments",
    icon: <MdOutlinePayment fontSize={20} />,
  },
  {
    path: "/company/Transactionlogs",
    name: "Payment history",
    icon: <HistoryIcon />,
  },

  {
    path: "/company/user_tables",
    name: "User Data Tables",
    icon: <BsCartCheck fontSize={20} />,
    // style:'absolute'
  },
  {
    path: "/",
    name: "Back to website",
    icon: <TbWorldUpload fontSize={20} />,
  },
  {
    path: "/company/settings",
    name: "Manage Card",
    icon: <MdSettings fontSize={20} />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const listener = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  // useEffect(( ) => {setIsOpen(width > 600 ? true : false)},[listener])

  const closeSideBar = () => setIsOpen(false);
  // console.log(width,height);

  return (
    <>
      <div className="main-container">
        <div className="sideBar_wrapper">
          <motion.div
            animate={{
              //sidebar width for sm_screen        sidebar width for md & lg screens
              width:
                width < 600 && isOpen
                  ? "100%"
                  : width > 600 && isOpen
                  ? "270px"
                  : "45px",
              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            className={`sidebar `}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h5
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    style={{
                      color: "white",
                      fontWeight: "700",
                      fontFamily: "poppins",
                      margin: "10px 0 0 10px",
                    }}
                  >
                    iNVESTOR
                    <div style={{ color: "black" }}>PRESENTATIONS</div>
                  </motion.h5>
                )}
              </AnimatePresence>

              <div className="bars">
                {isOpen ? (
                  <ImCross fontSize={20} color="white" onClick={toggle} />
                ) : (
                  <FaBars fontSize={20} onClick={toggle} />
                )}
              </div>
            </div>
            {/* <div className="search">
              <div className="search_icon">
                <BiSearch />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.input
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    placeholder="Search"
                  />
                )}
              </AnimatePresence>
            </div> */}
            <section className="routes">
              {routes.map((route, index) => {
                return (
                  <NavLink
                    to={route.path}
                    style={{ paddingLeft: isOpen ? "2rem" : "10px" }}
                    key={index}
                    className={route.path == "/" ? "link" : "link sideBarLink"}
                    activeClassName={
                      route.path == "/" ? "wev" : "sidebarActive"
                    }
                    onClick={width < 600 && closeSideBar}
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>

            <motion.div
              className="Sidebar_profile"
              style={{ paddingLeft: isOpen ? "1rem" : "5px" }}
            >
              <SideBarProfile width={width} isOpen={isOpen} />
            </motion.div>
          </motion.div>

          <DashboardNav width={width} isOpen={isOpen} children={children} />
          {/* <main className="main_child_pages container" style={{border:isOpen ? "2px solid red" : "2px solid blue"}}>{children}</main> */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
