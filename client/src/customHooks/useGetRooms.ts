import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RoomItemType } from "../common/models";
import {
  getRooms,
  getRoomsLoading,
} from "../store/reducers/roomsRedurers/getRoomsReducer";

export function useGetRooms(
  thunkCreator: () => (dispatch: Dispatch) => Promise<void>
) {
  const dispatch = useDispatch();

  const rooms: RoomItemType[] | null = useSelector(getRooms());
  const loading: boolean = useSelector(getRoomsLoading());

  useEffect(() => {
    dispatch(thunkCreator());
  }, [dispatch, thunkCreator]);

  return { rooms, loading };
}
