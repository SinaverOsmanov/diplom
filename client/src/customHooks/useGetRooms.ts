import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoomItemType } from "../common/models";

export function useGetRooms(
  thunkCreator: () => (dispatch: any) => Promise<void>
) {
  const dispatch = useDispatch();

  const rooms: RoomItemType[] = useSelector((state: any) => state.rooms.rooms);
  const loading: boolean = useSelector((state: any) => state.rooms.loading);

  useEffect(() => {
    dispatch(thunkCreator());
  }, [dispatch, thunkCreator]);

  return { rooms, loading };
}
