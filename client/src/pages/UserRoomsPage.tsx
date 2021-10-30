import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoomItemType } from "../common/models";
import { Loading } from "../utils/loading";
import { RoomsComponent } from "../components/RoomsComponent";
import { getUserRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsByUserReducer";

export function UserRoomsPage() {
  const dispatch = useDispatch();

  const userRooms: RoomItemType[] = useSelector(
    (state: any) => state.rooms.rooms
  );

  const loading = useSelector((state: any) => state.rooms.loading);

  useEffect(() => {
    dispatch(getUserRoomsThunkCreator());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsComponent title={"Мои номера"} rooms={userRooms} />
    </>
  );
}
