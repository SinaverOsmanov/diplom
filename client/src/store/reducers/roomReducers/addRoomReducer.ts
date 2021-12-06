import { addRoomAPI } from "../../../api/httpApi";
import { GetApiRoomByIdType, RoomFormType } from "../../../common/models";

import {
  ADD_ROOM_REQUEST,
  ADD_ROOM_FAIL,
  ADD_ROOM_SUCCESS,
} from "../../types/types";

export function addRoomReducer(
  state: any,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case ADD_ROOM_REQUEST:
      return { ...state, loading: true };

    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms, action.payload],
      };

    case ADD_ROOM_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export const addRoomAction = (payload: any) => ({
  type: ADD_ROOM_SUCCESS,
  payload: payload,
});

export const addRoomThunkCreator =
  ({ title, description, quality, photoUrl }: RoomFormType) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: ADD_ROOM_REQUEST });

      const { roomId }: GetApiRoomByIdType = await addRoomAPI({
        title,
        description,
        quality,
        photoUrl,
      });

      const newRoom = { _id: roomId, description, quality, photoUrl };

      dispatch(addRoomAction(newRoom));
    } catch (error) {
      dispatch({ type: ADD_ROOM_FAIL });
    }
  };
