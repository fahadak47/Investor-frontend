import React, { useState } from "react";
import FormCompany from "../component/login/FormCompany";
import FormUser from "../component/login/formUser";
import SwitchSelector from "react-switch-selector";
import TopSection from "../component/Common/TopSection";
import { Switch, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';


const Login = () => {
  const [sectionToggle, setSectionToggle] = useState(false);

  const options = [
    {
      label: "Login as User",
      value: {
        foo: true,
      },
      selectedBackgroundColor: "#007CE9",
      selectedFontColor: "white",
    },
    {
      label: "Login as Company",
      value: "bar",
      selectedBackgroundColor: "#007CE9",
      selectedFontColor: "white",
    },
  ];

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "bar"
  );

  return (
    <div className="py-3">
      <div
        className="your-required-wrapper "
        style={{
          width: 300,
          height: 45,
          margin: " 0 auto",
          //   marginTop: "8rem",
        }}
      >
        <SwitchSelector
          onChange={() => setSectionToggle(!sectionToggle)}
          options={options}
          initialSelectedIndex={initialSelectedIndex}
          backgroundColor="#fff"
          fontColor="black"
          border="1px solid #4d71a8  "
          selectionIndicatorMargin={3}
          wrapperBorderRadius={40}
          optionBorderRadius={40}
          fontWeight="900"
        />


      </div>
      <div className="row w-100 pt-5">
        <TopSection
          mainHeading={`Login as ${sectionToggle ? 'User' : "Company"}`}
          desc="Start building your diversified, vetted startup portfolio today."
        />
        <div className="col-lg-4  col-md-6 mx-auto">
          <div
            style={{ border: "none", boxShadow: "none" }}
            className="card p-2 "
          >
            <div>
              {sectionToggle ? (
                <div>
                  <FormUser />
                </div>
              ) : (
                <div>
                  <FormCompany />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
