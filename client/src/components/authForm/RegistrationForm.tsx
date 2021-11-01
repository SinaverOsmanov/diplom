import { useDispatch } from "react-redux";
import { UserType } from "../../common/models";
import { AuthForm } from "./AuthForm";
import { registrationUserThunkCreator } from "../../store/reducers/userReducers/registrationUserReducer";
import { Input, Form } from "antd";

export function RegistrationForm() {
  const dispatch = useDispatch();
  const onFinish = async (data: UserType) => {
    debugger;
    dispatch(registrationUserThunkCreator(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <AuthForm
        title="Регистрация"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitBtnText={"Регистрация"}
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
              type: "string",
              whitespace: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста, подтвердите свой пароль!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Два введенных вами пароля не совпадают!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </AuthForm>
    </>
  );
}
