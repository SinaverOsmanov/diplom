import { Row, Form, Select, Input, Button, Col } from "antd";
import { useDispatch } from "react-redux";
import { RoomItemType, ValuesType } from "../../common/models";
import { updateRoomThunkCreator } from "../../store/reducers/roomReducers/getRoomByIdReducer";
import { defaultValidateMessages } from "../../utils/validateMessage";

export function UpdateRoomForm({
  room,
  closeEditRoom,
}: {
  room: RoomItemType;
  closeEditRoom(bool: boolean): void;
}) {
  const dispatch = useDispatch();

  const onFinish = async (values: ValuesType) => {
    const { title, description, quality, photoUrl } = values;

    dispatch(
      updateRoomThunkCreator({
        roomId: room._id,
        title,
        description,
        quality,
        photoUrl,
      })
    );
    closeEditRoom(false);
  };

  return (
    <Row style={{ height: "100%" }}>
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
        <Row>
          <Col flex={1}>
            <Form.Item
              label="Название"
              name="title"
              initialValue={room.title}
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
              initialValue={room.description}
              rules={[{ required: true }]}
            >
              <Input.TextArea name="description" />
            </Form.Item>
            <Form.Item
              label="Комфортабельность"
              name="quality"
              rules={[{ required: true }]}
              initialValue={room.quality}
            >
              <Select placeholder="Выберите качество комнаты">
                <Select.Option value="economy">Эконом</Select.Option>
                <Select.Option value="standart">Стандарт</Select.Option>
                <Select.Option value="lux">Люкс</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Введите или вставьте URL картинки"
              name="photoUrl"
              initialValue={room.photoUrl}
            >
              <Input name="photoUrl" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{
            alignContent: "flex-end",
            margin: 0,
          }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={() => closeEditRoom(false)}
          >
            Отменить
          </Button>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
