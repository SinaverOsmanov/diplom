import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoomItemType } from "../common/models";
import { useEffect } from "react";
import { Loading } from "../utils/loading";
import { BadgeComponent } from "../components/BadgeComponent";
import { getRoomByIdThunkCreator } from "../store/reducers/roomReducers/getRoomByIdReducer";
import { reservedRoomThunkCreator } from "../store/reducers/reservedReducers/reservedRoomReducer";
const { Title } = Typography;

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

  const style = { background: "#ccc", padding: "20px" };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title level={4}>Описание номера</Title>
      <Row style={style}>
        <Col span={6}>
          <div
            style={{
              alignItems: "center",
              border: "1px solid #000",
              textAlign: "center",
              lineHeight: "13em",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${room.photo})`,
            }}
          >
            <span>{room.photo}</span>
          </div>
        </Col>
        <Col span={17} offset={1} style={{ alignSelf: "flex-end" }}>
          <Row
            style={{
              marginBottom: "10px",
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
          <Row style={{ marginBottom: "70px" }}>
            Описание: {room.description}
          </Row>
          <Row justify="end">
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
      </Row>
    </>
  );
}
