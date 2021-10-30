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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { dummyRequest } from "./../utils/fileUpload";
import { addRoomThunkCreator } from "../store/reducers/roomReducers/addRoomReducer";
import { useEffect, useState } from "react";
import { RoomItemType } from "../common/models";
import { Loading } from "../utils/loading";
import { getRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsReducer";
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
    <Row>
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
      <Col span={16} offset={2}>
        <Switch>
          <Route path="/admin/panel">
            <Row>
              <Col style={{ width: "500px" }}>
                <Row justify="center">
                  <Title level={4}>Статус номеров</Title>
                </Row>
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
              </Col>
            </Row>
          </Route>
          <Route path="/admin/create">
            <Row>
              <Title level={4}>Создание комнаты</Title>
            </Row>
            <Row>
              <CreateRoomForm />
            </Row>
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}

type valuesType = {
  title: string;
  description: string;
  quality: string;
  upload: null | { fileList: File[]; file: File };
};

function CreateRoomForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<valuesType>({
    title: "",
    description: "",
    quality: "",
    upload: null,
  });

  const onFinish = async (values: valuesType) => {
    const { title, description, quality, upload } = values;
    if (upload) {
      debugger;
      dispatch(
        addRoomThunkCreator(title, description, quality, upload.file.name)
      );
    }

    setForm({
      title: "",
      description: "",
      quality: "",
      upload: null,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      style={{
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 0",
      }}
      layout="vertical"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Название"
        name="title"
        rules={[
          { required: true, message: "Пожалуйста введите название комнаты!" },
        ]}
        initialValue={form.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        initialValue={form.description}
        rules={[{ required: true, message: "Пожалуйста введите описание!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Комфортабельность"
        name="quality"
        rules={[
          { required: true, message: "Пожалуйста введите качество комнаты!" },
        ]}
        initialValue={form.quality}
      >
        <Select placeholder="Select a option and change input text above">
          <Select.Option value="economy">Эконом</Select.Option>
          <Select.Option value="standart">Стандарт</Select.Option>
          <Select.Option value="lux">Люкс</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Upload"
        name="upload"
        rules={[{ required: true }]}
        initialValue={form.upload}
      >
        <Upload showUploadList={true} customRequest={dummyRequest}>
          <Button> Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Создать комнату
        </Button>
      </Form.Item>
      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="button" onClick={clear}>
          Очистить поля
        </Button>
      </Form.Item> */}
    </Form>
  );
}
