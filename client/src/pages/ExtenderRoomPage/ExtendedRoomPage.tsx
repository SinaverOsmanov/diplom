import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RoomItemType } from "../../common/models";
import { useEffect, useState } from "react";
import { Loading } from "../../utils/loading";
import { BadgeComponent } from "../../layouts/BadgeComponent";
import { getRoomByIdThunkCreator } from "../../store/reducers/roomReducers/getRoomByIdReducer";
import { reservedRoomThunkCreator } from "../../store/reducers/reservedReducers/reservedRoomReducer";
import { getDataLocalStorage } from "../../utils/localStorage";
import { UpdateRoomForm } from "../../components/roomForm/UpdateRoomForm";
import { ExtendedPhotoStyle, ExtendedRowStyle } from "./ExtendedRoomPageStyle";
const { Title } = Typography;

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
        <Col span={8}>
          <ExtendedPhotoStyle bgUrl={room.photoUrl}>
            {!room.photoUrl && <span>no photo</span>}
          </ExtendedPhotoStyle>
        </Col>
        <Col
          span={15}
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
              closeEditRoom={setEditRoom}
              buttonSumbitTitle="Сохранить"
            />
          ) : (
            <>
              <Row>
                <Col flex={1}>
                  <Row
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    justify="space-between"
                  >
                    <Col span={20}>
                      <Title level={4}>
                        Название комнаты:
                        <span style={{ fontSize: "30px" }}> {room.title}</span>
                      </Title>
                    </Col>
                    <Col span={2} offset={2}>
                      <Row
                        justify="center"
                        align="top"
                        style={{ position: "relative" }}
                      >
                        <Title level={1}>{room.roomNumber}</Title>
                      </Row>
                    </Col>
                  </Row>
                  <Row align="middle">
                    <Col>
                      <span>Качество комнаты:</span>
                    </Col>
                    <Col offset={1}>
                      <BadgeComponent quality={room.quality} />
                    </Col>
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
