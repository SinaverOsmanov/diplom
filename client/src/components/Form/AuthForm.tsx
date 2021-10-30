import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { AuthFormType } from "../../common/models";

const { Title } = Typography;

export function AuthForm({
  title,
  onFinish,
  onFinishFailed,
  submitBtnText,
}: AuthFormType) {
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <>
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
        validateMessages={validateMessages}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Row align="bottom">
            <Col>
              <Button type="primary" htmlType="submit">
                {submitBtnText}
              </Button>
            </Col>
            {submitBtnText === "Вход" && (
              <Col style={{ marginLeft: "5px" }}>
                <Link to="/registration">or Registration</Link>
              </Col>
            )}
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
