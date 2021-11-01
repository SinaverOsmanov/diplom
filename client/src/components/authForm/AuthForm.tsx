import { Button, Col, Form, Row, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AuthFormType } from "../../common/models";
import { getPathName } from "../../utils/getPathName";
import { defaultValidateMessages } from "../../utils/validateMessage";

const { Title } = Typography;

export function AuthForm({
  title,
  onFinish,
  onFinishFailed,
  submitBtnText,
  children,
}: AuthFormType & { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const path = getPathName(pathname);
  return (
    <Col span={24}>
      <Title level={4} style={{ textAlign: "center" }}>
        {title}
      </Title>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        validateMessages={defaultValidateMessages}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {children}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Row align="middle">
            <Col span={4}>
              <Button type="primary" htmlType="submit" block>
                {submitBtnText}
              </Button>
            </Col>
            <Col style={{ marginLeft: "5px" }}>
              <Link to={path ? "/" : "/registration"}>
                {path ? "или Вход" : "или Регистрация"}
              </Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Col>
  );
}
