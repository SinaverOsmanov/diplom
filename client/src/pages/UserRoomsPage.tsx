import { Loading } from "../utils/loading";
import { RoomsComponent } from "../components/RoomsComponent";
import { getUserRoomsThunkCreator } from "../store/reducers/roomsRedurers/getRoomsByUserReducer";
import { useGetRooms } from "../customHooks/useGetRooms";

export function UserRoomsPage() {
  const { rooms, loading } = useGetRooms(getUserRoomsThunkCreator);

  if (loading || !rooms) {
    return <Loading />;
  }

  return (
    <>
      <RoomsComponent title={"Мои номера"} rooms={rooms} />
    </>
  );
}
