import { useHistory } from "react-router-dom";
import { UserType } from "../../common/models";
import { AuthForm } from "./AuthForm";
import { useDispatch } from "react-redux";
import { loginUserThunkCreator } from "../../store/reducers/userReducers/loginUserReducer";

export function LoginForm() {
  const dispatch = useDispatch();
  const onFinish = async (data: UserType) => {
    dispatch(loginUserThunkCreator(data));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <AuthForm
        title="Вход"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        submitBtnText={"Вход"}
      />
    </>
  );
}
