import { Row,Col } from 'antd'
import React from 'react'

export default function TopSection({mainHeading,desc}) {
  return (
    <Row  className="justify-content-center container">
    <Col
      className="gutter-row text-center"
      xs={22}
      sm={22}
      md={22}
      lg={18}
      xl={18}
    >
      <h2 className="commonH2">{mainHeading}</h2>
      <p className='text-muted'>
        {desc}
      </p>
    </Col>
  </Row>
  )
}
