import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoomItemType } from "../common/models";
import { useEffect, useState } from "react";
import { Loading } from "../utils/loading";
import { BadgeComponent } from "../components/BadgeComponent";
import { getRoomByIdThunkCreator } from "../store/reducers/roomReducers/getRoomByIdReducer";
import { reservedRoomThunkCreator } from "../store/reducers/reservedReducers/reservedRoomReducer";
import styled from "styled-components";
import { getDataLocalStorage } from "./../utils/localStorage";
import { UpdateRoomForm } from "../components/roomForm/UpdateRoomForm";
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

  async function isReserved(id: string, reserved: boolean) {
    if (reserved) {
      dispatch(reservedRoomThunkCreator(id, "unreserv"));
    } else {
      dispatch(reservedRoomThunkCreator(id, "reserv"));
    }
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

              background: `url(${room.photoUrl}) center center / cover no-repeat`,
              // backgroundImage: `url(${room.photo})`,
            }}
          >
            {!room.photoUrl && <span>no photo</span>}
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
                      isReserved(room._id, room.reserved ? true : false)
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
