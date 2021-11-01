import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoomItemType } from "../common/models";
import { useEffect } from "react";
import { Loading } from "../utils/loading";
import { BadgeComponent } from "../components/BadgeComponent";
import { getRoomByIdThunkCreator } from "../store/reducers/roomReducers/getRoomByIdReducer";
import { reservedRoomThunkCreator } from "../store/reducers/reservedReducers/reservedRoomReducer";
import styled from "styled-components";
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
  let { id }: { id: string } = useParams();
  const room: RoomItemType = useSelector((state: any) => state.room.room);

  const loading = useSelector((state: any) => state.room.loading);

  const dispatch = useDispatch();

  async function reservedClickHandler(id: string) {
    dispatch(reservedRoomThunkCreator(id, "reserv"));
  }

  async function unReservedClickHandler(id: string) {
    dispatch(reservedRoomThunkCreator(id, "unreserv"));
  }

  useEffect(() => {
    dispatch(getRoomByIdThunkCreator(id));
  }, [id, dispatch]);

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
          </Row>
        </Col>
      </ExtendedRowStyle>
    </>
  );
}
