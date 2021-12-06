import { Form, Select, Input, Button, Row, Col } from "antd";
import { RoomFormType } from "../common/models";
import { trimStringInObject } from "../utils/trimStringInObject";
import { defaultValidateMessages } from "../utils/validateMessage";

export function RoomForm({
  initial,
  onFinish,
  children,
  buttonSumbitTitle,
}: {
  initial?: RoomFormType;
  onFinish(values: RoomFormType): void;
  children?: React.ReactNode;
  buttonSumbitTitle?: string;
}) {
  function submitHandler(values: RoomFormType) {
    const result: any = trimStringInObject(values);
    onFinish({ ...result });
  }

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
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 11 }}
        validateMessages={defaultValidateMessages}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
        autoComplete="off"
      >
        <Row>
          <Col flex={1}>
            <Form.Item
              label="Название"
              name="title"
              initialValue={initial?.title || ""}
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
              initialValue={initial?.description || ""}
            >
              <Input.TextArea name="description" />
            </Form.Item>
            <Form.Item
              label="Комфортабельность"
              name="quality"
              rules={[{ required: true }]}
              initialValue={initial?.quality || ""}
            >
              <Select placeholder="Выберите качество комнаты">
                <Select.Option value="economy">Эконом</Select.Option>
                <Select.Option value="standart">Стандарт</Select.Option>
                <Select.Option value="lux">Люкс</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Введите или вставьте URL фото/картинки"
              name="photoUrl"
              initialValue={initial?.photoUrl || ""}
              rules={[
                {
                  required: true,
                  message: "Фото/картинка является обязательным",
                },
                {
                  pattern: new RegExp(
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gm
                  ),
                  message: "Введите или вставьте корректный URL ",
                },
              ]}
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
          {children}
          <Button type="primary" htmlType="submit">
            {buttonSumbitTitle || "Создать"}
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
