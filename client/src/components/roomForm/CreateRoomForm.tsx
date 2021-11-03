import { Form, Select, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { ValuesType } from "../../common/models";
import { addRoomThunkCreator } from "../../store/reducers/roomReducers/addRoomReducer";
import { defaultValidateMessages } from "../../utils/validateMessage";

export function CreateRoomForm({ initial }: { initial: ValuesType }) {
  const dispatch = useDispatch();
  const onFinish = async (values: ValuesType) => {
    const { title, description, quality, photoUrl } = values;
    dispatch(addRoomThunkCreator(title, description, quality, photoUrl));
  };

  return (
    <>
      <Form
        style={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          flex: "1 0 0",
        }}
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        validateMessages={defaultValidateMessages}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[
            {
              whitespace: true,
              message: "Не оставляйте пустые поля",
            },
            {
              type: "string",
              required: true,
              message: "Поле название является обязательным",
            },
            {
              min: 3,
              message: "Введите не меньше 3х символов",
            },
          ]}
        >
          <Input name="title" />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea name="description" />
        </Form.Item>
        <Form.Item
          label="Комфортабельность"
          name="quality"
          rules={[{ required: true }]}
        >
          <Select placeholder="Выберите качество комнаты">
            <Select.Option value="economy">Эконом</Select.Option>
            <Select.Option value="standart">Стандарт</Select.Option>
            <Select.Option value="lux">Люкс</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Введите или вставьте URL картинки" name="photoUrl">
          <Input name="photoUrl" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать комнату
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
