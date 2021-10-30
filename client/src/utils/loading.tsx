import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Spin, Col } from "antd";

export function Loading({ styles }: { styles?: React.CSSProperties }) {
  const styleLoading = {
    ...styles,
    color: "blue",
    fontSize: "60px",
  };
  const antIcon = <LoadingOutlined style={styleLoading} spin />;
  return (
    <Row justify="center" align="middle" wrap style={{ height: "50vh" }}>
      <Col>
        <Spin indicator={antIcon} />
      </Col>
    </Row>
  );
}
