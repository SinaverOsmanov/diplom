import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { UserType } from "../../common/models";
import { AuthForm } from "./AuthForm";
import { registrationUserThunkCreator } from "./../../store/reducers/userReducers/registrationUserReducer";

export function RegistrationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (data: UserType) => {
    dispatch(registrationUserThunkCreator(data));
    // messageNotification({ title: "create", message: "Пользователь создан" });
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
      />
    </>
  );
}
