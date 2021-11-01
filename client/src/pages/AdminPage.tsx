import {
  Row,
  Typography,
  Col,
  Button,
  Form,
  Input,
  Select,
  Menu,
  Upload,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { dummyRequest } from "./../utils/fileUpload";
import { useEffect } from "react";
import { RoomItemType, ValuesType } from "../common/models";
import { Loading } from "../utils/loading";
import { getRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsReducer";
import { defaultValidateMessages } from "../utils/validateMessage";
import { addRoomThunkCreator } from "../store/reducers/roomReducers/addRoomReducer";
const { Title } = Typography;

export function AdminPage() {
  const style = {
    background: "#ccc",
    padding: "20px 0px",
  };
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const rooms: RoomItemType[] = useSelector((state: any) => state.rooms.rooms);
  const loading: RoomItemType[] = useSelector(
    (state: any) => state.rooms.loading
  );

  useEffect(() => {
    dispatch(getRoomsThunkCreator());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }

  return (
    <Row justify="center">
      <Col span={6}>
        <Title level={3}>Панель администратора</Title>
        <Menu mode="vertical" defaultSelectedKeys={[pathname]}>
          <MenuItem key="/admin/panel">
            <Link to="/admin/panel">Panel</Link>
          </MenuItem>
          <MenuItem key="/admin/create">
            <Link to="/admin/create">Create room</Link>
          </MenuItem>
        </Menu>
      </Col>
      <Col span={1} offset={1}>
        <Divider
          type="vertical"
          style={{ height: "100%", marginTop: "20px" }}
        />
      </Col>
      <Col span={15} offset={1}>
        <Switch>
          <Route path="/admin/panel">
            <AdminContentComponent title={"Статус номеров"}>
              <Row style={style} gutter={[40, 40]}>
                {rooms.map((room: RoomItemType) => (
                  <Col span={6} key={room._id}>
                    <Row
                      style={{
                        background: room.reserved ? "#dc3131" : "#3cd266",
                        color: "white",
                        padding: "36.5px 0",
                      }}
                      justify="center"
                    >
                      {room.roomNumber}
                    </Row>
                  </Col>
                ))}
              </Row>
            </AdminContentComponent>
          </Route>
          <Route path="/admin/create">
            <AdminContentComponent title={"Создание комнаты"}>
              <CreateRoomForm
                initial={{
                  title: "",
                  description: "",
                  quality: "standart",
                  upload: null,
                }}
              />
            </AdminContentComponent>
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}

function AdminContentComponent({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Row justify="center">
      <Col span={24}>
        <Row justify="center">
          <Title level={4}>{title}</Title>
        </Row>
        <Row>
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export function CreateRoomForm({ initial }: { initial: ValuesType }) {
  const dispatch = useDispatch();

  const onFinish = async (values: ValuesType) => {
    const { title, description, quality, upload } = values;
    dispatch(addRoomThunkCreator(title, description, quality, upload![0].name));
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Row>
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
          initialValue={initial.title}
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
          initialValue={initial.description}
          rules={[{ required: true }]}
        >
          <Input.TextArea name="description" />
        </Form.Item>
        <Form.Item
          label="Комфортабельность"
          name="quality"
          rules={[{ required: true }]}
          initialValue={initial.quality}
        >
          <Select placeholder="Выберите качество комнаты">
            <Select.Option value="economy">Эконом</Select.Option>
            <Select.Option value="standart">Стандарт</Select.Option>
            <Select.Option value="lux">Люкс</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Upload"
          name="upload"
          getValueFromEvent={normFile}
          initialValue={initial.upload}
          valuePropName="fileList"
        >
          <Upload
            showUploadList={true}
            customRequest={dummyRequest}
            listType="picture"
          >
            <Button> Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать комнату
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
