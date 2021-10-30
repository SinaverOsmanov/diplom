import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RoomItemType } from "../common/models";
import { Loading } from "../utils/loading";
import { RoomsComponent } from "../components/RoomsComponent";
import { getRoomsUnreservedThunkCreator } from "../store/reducers/roomsRedurers/getRoomsUnreservedReducer";

export function RoomsPage() {
  const dispatch = useDispatch();
  const rooms: RoomItemType[] = useSelector(
    (state: any) => state.rooms.rooms,
    shallowEqual
  );

  const loading = useSelector((state: any) => state.rooms.loading);

  useEffect(() => {
    dispatch(getRoomsUnreservedThunkCreator());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsComponent title={"Доступные номера"} rooms={rooms} />
    </>
  );
}

// const [rooms] = useGetRooms();
