import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import "./index.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./component/Common/Navbar";
import SignUpCompany from "./pages/SignUpCompany";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "../node_modules/slick-carousel/slick/slick.css";
import { Footer } from "./component/Common/Footer";
import Login from "./pages/Login";
import SignUpUser from "./pages/SignUpUser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Company from "./pages/Company";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyProfile from "./pages/company/CompanyProfile";
import "react-phone-number-input/style.css";
import Sidebar from "./component/dashboard/SideBar";
import Dashboard from "./pages/company/dashboard/Dashboard";
import { SAVE_GETTING_AUTH_STATE } from "./redux/constants/auth_Constants";
import PresentationMedia from "./pages/company/PresentationMedia";
import Payments from "./pages/company/Payments";
import TransactionLogs from "./component/payments/TransactionLogs";
import UserProfile from "./pages/user/userProfile";
import CompanyDetails2 from "./pages/company/CompanyDetails2";
import { UserDetailsById } from "./pages/company/dashboard/UserDetailsById";
import Settings from "./pages/company/Settings";
import HomeNew from "./pages/HomeNew";
import UserTables from "./pages/company/UserTables";
import Logout from "./component/Logout";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { appState, isAppStateLoadig, error } = useSelector(
    (state) => state.AppStateReducer
  );

  const checkAppstate = () => {
    let local_State = localStorage.getItem("IP_State");
    if (!appState && local_State) {
      dispatch({
        type: SAVE_GETTING_AUTH_STATE,
        payload: local_State,
      });
    }
    if (!appState && !local_State) {
      // navigate("/login");
    }
  };

  useLayoutEffect(() => checkAppstate(), []);

  console.log("App state Log", appState);
  return (
    <>
      <Router>
        {appState == null && <AuthRouter />}
        {appState === "USER" && <UserRouter />}
        {appState === "COMPANY" && <CompanyRouter />}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

const AuthRouter = () => {
  console.log("**** AuthRouter iiisss mounted *****");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signUpUser" element={<SignUpUser />} />
        <Route path="/signUpCompany" element={<SignUpCompany />} />
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

const CompanyRouter = () => {
  console.log(" **** CompanyRouter iiisss mounted ***");
  const location = useLocation();
  const locationPathCheck = location.pathname.includes("/company");
  // console.log("location log", location);
  // console.log("location boolen log", location.pathname);
  const path = ["/", "/about", "/contact", "/Profile"];
  let checkNev = path.find((e) => e === location.pathname);
  // console.log("location boolen log**********", checkNev);

  return (
    <>
      {!checkNev ? null : <Navbar />}

      {!locationPathCheck && (
        <>
          <Routes>
            <Route path="/" element={<HomeNew />} />
            {/* <Route path="*" element={<HomeNew />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Profile" element={<CompanyProfile />} />

            <Route
              path="*"
              element={
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              }
            />
          </Routes>
          <Footer />
        </>
      )}

      {locationPathCheck && (
        <>
          <Sidebar>
            <Routes>
              <Route path="/company/dashboard" element={<Dashboard />} />
              <Route path="/company/*" element={<Dashboard />} />
              <Route
                path="/company/presentation_videos"
                element={<PresentationMedia />}
              />
              <Route path="/company/payments" element={<Payments />} />
              <Route
                path="/company/Transactionlogs"
                element={<TransactionLogs />}
              />
              <Route path="/company/settings" element={<Settings />} />
              <Route path="/company/user_tables" element={<UserTables />} />
              <Route path="/company/user/:id" element={<UserDetailsById />} />
            </Routes>
          </Sidebar>
          <ToastContainer />
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};

const UserRouter = () => {
  console.log(" ***** UserRouter iiisss mounted *****");
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/company" element={<Company />} />
        <Route path="/*" element={<Company />} />
        <Route path="/user/company/:id" element={<CompanyDetails2 />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};
