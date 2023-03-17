import { Row } from "antd";
import React from "react";
import TopSection from "../Common/TopSection";
import { Collapse } from "antd";
const { Panel } = Collapse;

function Questions() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  return (
    <div className="questions container py-5">
      <Row>
        <TopSection
          mainHeading="Still Have Questions?"
          desc="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
          sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et ju"
        />
      </Row>

      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel className="panelCollapse" header="How much can I invest?" key="1">
          <p>{text}</p>
        </Panel>

        <Panel className="panelCollapse"  header="When will I receive my shares?" key="2">
          <p>{text}</p>
        </Panel>
        
      </Collapse>
    </div>
  );
}

export default Questions;
