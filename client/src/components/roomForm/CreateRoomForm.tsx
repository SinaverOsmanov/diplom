import { useDispatch } from "react-redux";
import { RoomFormType } from "../../common/models";
import { addRoomThunkCreator } from "../../store/reducers/roomReducers/addRoomReducer";
import { RoomForm } from "../RoomFormComponent";

export function CreateRoomForm() {
  const dispatch = useDispatch();
  const onFinish = async (values: RoomFormType) => {
    const { title, description, quality, photoUrl } = values;
    dispatch(addRoomThunkCreator({ title, description, quality, photoUrl }));
  };

  return (
    <>
      <RoomForm onFinish={onFinish} />
    </>
  );
}
