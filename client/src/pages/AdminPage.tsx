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
import { Switch, Route, Link, useLocation } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { dummyRequest } from "./../utils/fileUpload";
import { addRoomThunkCreator } from "../store/reducers/roomReducers/addRoomReducer";
import { useEffect, useState } from "react";
import { RoomItemType } from "../common/models";
import { Loading } from "../utils/loading";
import { getRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsReducer";
import { getPathName } from "../utils/getPathName";
import { defaultValidateMessages } from "../utils/validateMessage";
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

type ValuesType = {
  title: string;
  description: string;
  quality: string;
  upload: null | File[] | File;
};

function CreateRoomForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values: ValuesType) => {
    debugger;
    const { title, description, quality, upload } = values;
    const data = { title: title.trim() };
    // if (upload) {
    //   dispatch(
    //     addRoomThunkCreator(title, description, quality, upload[0].name)
    //   );
    // }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // const validateMessages = {
  //   required: "'${name}' Пожалуйста введите название комнаты!",
  //   string: {
  //     len: "'${name}' must be exactly ${len} characters",
  //     min: "'${name}' must be at least ${min} characters",
  //     max: "'${name}' cannot be longer than ${max} characters",
  //     range: "'${name}' must be between ${min} and ${max} characters",
  //   },
  //   array: {

  //   }
  // };

  return (
    <Form
      style={{
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 0",
      }}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 10 }}
      validateMessages={defaultValidateMessages}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onReset={onReset}
    >
      <Form.Item
        label="Название"
        name="name"
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
          {
            pattern: new RegExp(/\d/g),
            message: "В названии не должно быть чисел",
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
      <Form.Item
        label="Upload"
        name="upload"
        rules={[{ required: true, type: "array" }]}
        getValueFromEvent={normFile}
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
  );
}
