import { Button } from "antd";
import { useDispatch } from "react-redux";
import { RoomItemType, ValuesType } from "../../common/models";
import { updateRoomThunkCreator } from "../../store/reducers/roomReducers/getRoomByIdReducer";
import { RoomForm } from "../RoomFormComponent";

export function UpdateRoomForm({
  room,
  closeEditRoom,
}: {
  room: RoomItemType;
  closeEditRoom(bool: boolean): void;
}) {
  const dispatch = useDispatch();
  const onFinish = async (values: ValuesType) => {
    const { title, description, quality, photoUrl } = values;
    dispatch(
      updateRoomThunkCreator({
        roomId: room._id,
        title,
        description,
        quality,
        photoUrl,
      })
    );
    closeEditRoom(false);
  };

  return (
    <RoomForm initial={room} onFinish={onFinish}>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => closeEditRoom(false)}
      >
        Отменить
      </Button>
    </RoomForm>
  );
}
