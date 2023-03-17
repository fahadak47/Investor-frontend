import React from "react";
import Headers from "../component/Common/Header";
import Form from "../component/ContactUsSection/Form";
const Contact = () => {
  return (
    <div className="common_wrapper">
      <Headers
        title="Contact Us"
        Links={[
          { Name: "Home", link: "/", active: false },
          { Name: "About", link: "/about", active: false },
          { Name: "Contact Us", link: "/about", active: true },
        ]}
      />
      <Form />
    </div>
  );
};

export default Contact;
