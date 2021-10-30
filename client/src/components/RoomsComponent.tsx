import { Row, Col, Button, Typography } from "antd";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { RoomItemType } from "../common/models";
import { BadgeComponent } from "./BadgeComponent";
import { getPathName } from "../utils/getPathName";

const { Title } = Typography;
export function RoomsComponent({
  title,
  rooms,
}: {
  title: string;
  rooms: RoomItemType[];
}) {
  const { pathname } = useLocation();
  const path = getPathName(pathname);
  return (
    <>
      <Title level={3}>{title}</Title>
      <Row gutter={[20, 20]}>
        {rooms.length > 0 ? (
          rooms.map((room: RoomItemType) => (
            <RoomItem key={room._id} room={room} />
          ))
        ) : (
          <Row>
            {path === "reserved" ? (
              <Col>
                <Title level={4}>
                  Комнаты ещё не забронированы, поспешите и забронируйте на
                  <Link to="/"> главной странице</Link>
                </Title>
              </Col>
            ) : (
              <Col>Свободных комнат нет</Col>
            )}
          </Row>
        )}
      </Row>
    </>
  );
}

const RoomItemStyle = styled.div`
  color: #fff;
  text-shadow: 1px 1px #000000;
  height: 100%;
  padding: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div:first-child {
    justify-content: space-between;
  }
  div {
    justify-content: center;
  }
`;

export function RoomItem({
  room,
  onRemoveRoom,
}: {
  room: RoomItemType;
  onRemoveRoom?(id: string): void;
}) {
  return (
    <Col key={room._id} span={8} style={{ height: "200px" }}>
      <RoomItemStyle style={{ backgroundImage: `url(${room.photo})` }}>
        <Row>
          <Col>{room.roomNumber}</Col>
          <Col>
            <BadgeComponent quality={room.quality} />
          </Col>
        </Row>
        <Row>{room.title}</Row>
        <Row style={{ lineHeight: 1, overflow: "hidden", height: "2em" }}>
          {room.description}
        </Row>
        <Row>
          <Button type="primary">
            <Link to={`/rooms/${room._id}`} type="primary">
              Open
            </Link>
          </Button>
        </Row>
      </RoomItemStyle>
    </Col>
  );
}
