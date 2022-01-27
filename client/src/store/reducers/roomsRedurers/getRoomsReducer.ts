import { Dispatch } from "redux";
import { getRoomsAPI } from "../../../api/httpApi";
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

const defaultState = {
  rooms: null,
  loading: false,
  error: null,
};

export function getRoomsReducer(
  state: DefaultStateRoomsType = defaultState,
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

export const getRoomsAction = (payload: RoomItemType[]) => ({
  type: GET_ROOMS_SUCCESS,
  payload: payload,
});

export const getRoomsThunkCreator = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_ROOMS_REQUEST });
    const { rooms, codeStatus }: GetApiRoomsType = await getRoomsAPI();
    if (codeStatus) {
      dispatch(getRoomsAction(rooms));
    }
  } catch (error) {
    dispatch({ type: GET_ROOMS_FAIL, payload: error });
  }
};

export const getRooms = () => (state: { rooms: DefaultStateRoomsType }) =>
  state.rooms.rooms;

export const getRoomsLoading =
  () => (state: { rooms: DefaultStateRoomsType }) =>
    state.rooms.loading;
