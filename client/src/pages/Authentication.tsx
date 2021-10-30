import { Col, Row } from "antd";

export function Authorization({ children }: { children: React.ReactNode }) {
  return (
    <Col span={24}>
      <Row justify="end">
        <Col span={12} style={{ border: "1px solid #fff" }}>
          {children}
        </Col>
      </Row>
    </Col>
  );
}
