import { Col, Row, Typography } from "antd";
const { Title } = Typography;

export function AdminContent({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Row justify="center">
      <Col span={24}>
        <Row justify="center">
          <Title level={4}>{title}</Title>
        </Row>
        <Row>
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
}
