import { UserType } from "../../common/models";
import { useDispatch } from "react-redux";
import { loginUserThunkCreator } from "../../store/reducers/userReducers/loginUserReducer";
import { AuthForm } from "./AuthForm";
import { Form, Input } from "antd";

export function LoginForm() {
  const dispatch = useDispatch();
  const onFinish = async (data: UserType) => {
    dispatch(loginUserThunkCreator(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthForm
      title="Вход"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      submitBtnText={"Вход"}
    >
      <Form.Item
        label="Почта"
        name="email"
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
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пароль является обязательным",
          },
          {
            type: "string",
            whitespace: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </AuthForm>
  );
}
