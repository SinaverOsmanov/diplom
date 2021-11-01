import { Row, Col, Button, Typography } from "antd";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { RoomItemType } from "../common/models";
import { BadgeComponent } from "./BadgeComponent";
import { getPathName } from "../utils/getPathName";
import { RoomItem } from "./RoomItem";

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
