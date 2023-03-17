import { Button, Col, Divider, Row } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import img from "../../images/investor.jpg";
import { Tabs } from 'antd';


const style = {
backgroundColor:"rgb(227 225 225 / 83%)",
padding:"1rem",
}
const ProfileTesting = () => (

  <>

  <div id="profileUser" >
<div className="container">

    <Row style={{marginTop:"8rem"}} gutter={[16, 48]}
    >
      <Col className="gutter-row " xs={24} sm={24} md={12} lg={12} xl={12}>
      <div  className="profilrAvatar">
                <Avatar
                src={img}
            
                style={{verticalAlign:"middle"}}
                size={{
                xs:50,
                sm: 80,
                md:100,
                lg: 120,
                xl: 130,
                xxl: 140,
                }}
                icon={<AntDesignOutlined />}
            />

            <div className='profileNameDiv'>
                <h4>Mudassir jamal </h4>
                <h5>Accredited Investor</h5>

            </div>


      </div>
        
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="profileAmountDivWrapper">
                <div className='profileAmountDiv'>
                <h5>Available Cash Balance</h5>
                <h2>US $0.00 </h2>
            </div>
            <div className="profileDepositeBtnDiv">

                <Button type="primary" >Deposit</Button>
                <Button type="primary" ghost>Withdraw</Button>
            </div>


                </div>
      </Col>



      <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
        <Tabs defaultActiveKey="1" >
            <Tabs.TabPane tab="Portfolio" key="1">
            <div style={style}>
            
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>
              <p>Content of Tab Pane 1</p>

            </div>


            </Tabs.TabPane>
            <Tabs.TabPane tab="Activity" key="2">
                <div style={style}>

            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
                </div>

       

            </Tabs.TabPane>
            <Tabs.TabPane tab="Account Details" key="3">
            <div style={style}>

            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>

            <p>Content of Tab Pane 3</p>
            </div>

         

            </Tabs.TabPane>
            <Tabs.TabPane tab="Funding" key="4">
            <div style={style}>

            <p>Content of Tab Pane 4</p>
            <p>Content of Tab Pane 4</p>
            <p>Content of Tab Pane 4</p>
            <p>Content of Tab Pane 4</p>
            <p>Content of Tab Pane 4</p>
            <p>Content of Tab Pane 4</p>
           
           </div>
      

            </Tabs.TabPane>

            <Tabs.TabPane tab="Documents" key="5">
            <div style={style}>

            Content of Tab Pane 5
            Content of Tab Pane 5
            Content of Tab Pane 5
            Content of Tab Pane 5
            Content of Tab Pane 5
            Content of Tab Pane 5
            Content of Tab Pane 5
            </div>
            </Tabs.TabPane>

        </Tabs>
      </Col>

    </Row>
    </div>
  </div>
    
    
  </>
);
export default ProfileTesting;
