import { Loading } from "../utils/loading";
import { RoomsComponent } from "../components/RoomsComponent";
import { getRoomsUnreservedThunkCreator } from "../store/reducers/roomsRedurers/getRoomsUnreservedReducer";
import { useGetRooms } from "../customHooks/useGetRooms";

export function RoomsPage() {
  const { rooms, loading } = useGetRooms(getRoomsUnreservedThunkCreator);

  if (loading || !rooms) {
    return <Loading />;
  }

  return (
    <>
      <RoomsComponent title={"Доступные номера"} rooms={rooms} />
    </>
  );
}
