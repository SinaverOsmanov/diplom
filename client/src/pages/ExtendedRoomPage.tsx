import {
  Button,
  Col,
  Input,
  Select,
  Form,
  Row,
  Typography,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoomItemType, ValuesType } from "../common/models";
import { useEffect, useState } from "react";
import { Loading } from "../utils/loading";
import { BadgeComponent } from "../components/BadgeComponent";
import {
  getRoomByIdThunkCreator,
  updateRoomThunkCreator,
} from "../store/reducers/roomReducers/getRoomByIdReducer";
import { reservedRoomThunkCreator } from "../store/reducers/reservedReducers/reservedRoomReducer";
import styled from "styled-components";
import { defaultValidateMessages } from "../utils/validateMessage";
import { getDataLocalStorage } from "./../utils/localStorage";
const { Title } = Typography;

const ExtendedRowStyle = styled(Row)`
  background: rgb(149 155 164 / 70%);
  border-radius: 5px;
  box-shadow: 3px 4px 4px 0px rgb(0 0 0 / 19%);
  overflow: hidden;
  height: 450px;
  justify-content: space-between;
`;

export function ExtendedRoomPage() {
  let { roomId }: { roomId: string } = useParams();
  const [editRoom, setEditRoom] = useState(false);
  const room: RoomItemType = useSelector((state: any) => state.room.room);
  const loading = useSelector((state: any) => state.room.loading);

  const data = getDataLocalStorage();

  const dispatch = useDispatch();

  async function reservedClickHandler(id: string) {
    dispatch(reservedRoomThunkCreator(id, "reserv"));
  }

  async function unReservedClickHandler(id: string) {
    dispatch(reservedRoomThunkCreator(id, "unreserv"));
  }

  useEffect(() => {
    dispatch(getRoomByIdThunkCreator(roomId));
  }, [roomId, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title level={3}>Описание номера</Title>
      <ExtendedRowStyle>
        <Col span={7}>
          <div
            style={{
              alignItems: "center",
              textAlign: "center",
              lineHeight: "13em",
              width: "100%",
              height: "100%",

              background:
                "url(https://source.unsplash.com/random) center center / cover no-repeat",
              // backgroundImage: `url(${room.photo})`,
            }}
          >
            <span>{room.photo}</span>
          </div>
        </Col>
        <Col
          span={16}
          offset={1}
          style={{
            padding: "20px 20px 20px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {editRoom ? (
            <UpdateRoomForm
              room={room}
              closeEditRoom={() => setEditRoom(false)}
            />
          ) : (
            <>
              <Row style={{ alignSelf: "start" }}>
                <Col>
                  <Row
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Название комнаты: {room.title}
                  </Row>
                  <Row>Номер комнаты: {room.roomNumber}</Row>
                  <Row>
                    <span>Уровень комнаты: </span>
                    <BadgeComponent quality={room.quality} />
                  </Row>
                  <Row>Описание: {room.description}</Row>
                </Col>
              </Row>
              <Row justify="end" style={{ alignSelf: "end" }}>
                {data && data.isAdmin && (
                  <Col>
                    <Button type="ghost" onClick={() => setEditRoom(true)}>
                      Редактировать
                    </Button>
                  </Col>
                )}
                <Col>
                  <Button
                    type="primary"
                    danger={room.reserved === null ? false : true}
                    onClick={() =>
                      room.reserved
                        ? unReservedClickHandler(room._id)
                        : reservedClickHandler(room._id)
                    }
                  >
                    {room.reserved !== null
                      ? "Отменить бронирование"
                      : "Забронировать"}
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </ExtendedRowStyle>
    </>
  );
}

export function UpdateRoomForm({
  room,
  closeEditRoom,
}: {
  room: RoomItemType;
  closeEditRoom(bool: boolean): void;
}) {
  const dispatch = useDispatch();

  const onFinish = async (values: ValuesType) => {
    const { title, description, quality } = values;

    dispatch(
      updateRoomThunkCreator({
        roomId: room._id,
        title,
        description,
        quality,
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

function FormItemComponent({
  value,
  name,
  label,
  rules,
  style,
  children,
}: {
  value: string | number | [] | {};
  name: string;
  label: string;
  rules: {}[];
  style: {};
  children: React.ReactNode;
}) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={value}
      style={style}
    >
      {children}
    </Form.Item>
  );
}
