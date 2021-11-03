import React from "react";
import { Col } from "antd";
import { RoomItemType } from "../common/models";
import { Row } from "antd";
import { BadgeComponent } from "./BadgeComponent";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { RoomItemStyle } from "./RoomItemStyle";

const { Title } = Typography;

export function RoomItem({ room }: { room: RoomItemType }) {
  return (
    <Col key={room._id} span={6}>
      <RoomItemStyle bgUrl={room.photoUrl}>
        <Row align="top">
          <Col>
            <Title level={1}>{room.roomNumber}</Title>
          </Col>
          <Col>
            <BadgeComponent quality={room.quality} />
          </Col>
        </Row>
        {/* <Row>{room.title}</Row>
        <Row style={{ lineHeight: 1, overflow: "hidden", height: "2em" }}>
          {room.description}
        </Row> */}
        <Row>
          <Col span={12}>
            <Button type="primary" block>
              <Link itemType="button" to={`/rooms/${room._id}`}>
                Открыть
              </Link>
            </Button>
          </Col>
        </Row>
      </RoomItemStyle>
    </Col>
  );
}
