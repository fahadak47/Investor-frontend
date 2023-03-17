import { Button, Col, Divider, Row } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import img from "../../images/investor.jpg";
import { Tabs } from "antd";
import UserDetails from "../UserProfile";
import AccountLevelTwo from "./AccountLevelTwo";
import { useState } from "react";


const UserProfile = () => {
  const [userName, SetUserName] = useState({ first: "", last: "" });


  console.log(userName,"==========");
  
return(

    <div id="profileUser">
      <div className="container">
        <Row style={{ marginTop: "8rem" }} gutter={[16, 48]}>
          <Col className="gutter-row " xs={24} sm={24} md={12} lg={11} xl={11}>
            <div className="profilrAvatar">
              <Avatar
                src={img}
                style={{ verticalAlign: "middle" }}
                size={{
                  xs: 50,
                  sm: 80,
                  md: 100,
                  lg: 120,
                  xl: 130,
                  xxl: 140,
                }}
                icon={<AntDesignOutlined />}
              />

              <div className="profileNameDiv">
                <h4>{userName?.first ? userName?.first : ""} {userName?.last ? userName?.last : ""}</h4>
                <h5>Accredited Investor</h5>
              </div>
            </div>
          </Col>
          {/* <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="profileAmountDivWrapper">
              <div className="profileAmountDiv">
                <h5>Available Cash Balance</h5>
                <h2>US $0.00 </h2>
              </div>
              <div className="profileDepositeBtnDiv">
                <Button type="primary">Deposit</Button>
                <Button type="primary" ghost>
                  Withdraw
                </Button>
              </div>
            </div>
          </Col> */}

          {/* ***********************************Tabs component starts ***************************** */}

          <Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Account Details" key="1">
                <div >
                  <UserDetails SetUserName={SetUserName}/>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Account Level Two" key="2">
                <div >
                  <AccountLevelTwo />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity" key="3">
                <div >
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Funding" key="4">
                <div >
                  <p>Content of Tab Pane 4</p>
                  <p>Content of Tab Pane 4</p>
                  <p>Content of Tab Pane 4</p>
                  <p>Content of Tab Pane 4</p>
                  <p>Content of Tab Pane 4</p>
                  <p>Content of Tab Pane 4</p>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Documents" key="5">
                <div >
                  Content of Tab Pane 5 Content of Tab Pane 5 Content of Tab
                  Pane 5 Content of Tab Pane 5 Content of Tab Pane 5 Content of
                  Tab Pane 5 Content of Tab Pane 5
                </div>
              </Tabs.TabPane>
            </Tabs>
          
          </Col>

          <Col className="gutter-row mt-5 px-3 py-5" xs={24} sm={24} md={24} lg={8} xl={8}>
            <h4 style={{fontWeight:"bold",fontFamily:"poppins"}}>Finish setting Up Yours Investor Account</h4>
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available. It is
              also used to temporarily replace text in a process called
              greeking, which allows designers to consider the form of a webpage
              or publication...
            </p>
          </Col>

        </Row>
      </div>
    </div>
)
  
        };
export default UserProfile;
