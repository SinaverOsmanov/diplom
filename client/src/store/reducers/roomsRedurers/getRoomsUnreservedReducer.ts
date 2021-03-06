import { Dispatch } from "redux";
import { getRoomsUnreservedAPI } from "../../../api/httpApi";
import {
  DefaultStateRoomsType,
  GetApiRoomsType,
  RoomItemType,
} from "../../../common/models";
import {
  GET_ROOMS_REQUEST,
  GET_ROOMS_FAIL,
  GET_ROOMS_SUCCESS,
} from "../../types/types";

export function getRoomsUnreservedReducer(
  state: DefaultStateRoomsType,
  action: { type: string; payload: RoomItemType[] }
) {
  switch (action.type) {
    case GET_ROOMS_REQUEST:
      return { ...state, loading: true };

    case GET_ROOMS_SUCCESS:
      return { ...state, rooms: [...action.payload], loading: false };

    case GET_ROOMS_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return { ...state };
  }
}

export const getRoomsUnreservedAction = (payload: RoomItemType[]) => ({
  type: GET_ROOMS_SUCCESS,
  payload: payload,
});

export const getRoomsUnreservedThunkCreator =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_ROOMS_REQUEST });
      const { rooms, codeStatus }: GetApiRoomsType =
        await getRoomsUnreservedAPI();
      if (codeStatus) {
        dispatch(getRoomsUnreservedAction(rooms));
      }
    } catch (error) {
      dispatch({ type: GET_ROOMS_FAIL, payload: error });
    }
  };
