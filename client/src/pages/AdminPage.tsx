import { Row, Typography, Col, Menu, Divider } from "antd";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import { RoomItemType } from "../common/models";
import { Loading } from "../utils/loading";
import { getRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsReducer";
import { useGetRooms } from "../customHooks/useGetRooms";
import { CreateRoomForm } from "../components/roomForm/CreateRoomForm";
import { AdminContent } from "../layouts/AdminContent";
const { Title } = Typography;

export function AdminPage() {
  const style = {
    background: "#d4d4d4",
    padding: "20px 0px",
    boxShadow: "0px 0px 5px 2px rgb(0 0 0 / 19%)",
  };
  const { pathname } = useLocation();
  const { rooms, loading } = useGetRooms(getRoomsThunkCreator);

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
            <AdminContent title={"Статус номеров"}>
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
            </AdminContent>
          </Route>
          <Route path="/admin/create">
            <AdminContent title={"Создание комнаты"}>
              <CreateRoomForm />
            </AdminContent>
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}
