import { getRoomAPI } from "../../../api/httpApi";
import { DefaultStateRoomType, RoomItemType } from "../../../common/models";
import {
  GET_ROOM_FAIL,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
} from "../../types/types";

const defaultState = {
  room: {},
  loading: false,
  error: "",
};

export function getRoomByIdReducer(
  state: DefaultStateRoomType = defaultState,
  action: { type: string; payload: RoomItemType }
) {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return { ...state, loading: true };

    case GET_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload,
        loading: false,
      };

    case GET_ROOM_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

export const getRoomById = (payload: RoomItemType) => ({
  type: GET_ROOM_SUCCESS,
  payload: payload,
});

export const getRoomByIdThunkCreator =
  (id: string) => async (dispatch: any) => {
    try {
      dispatch({ type: GET_ROOM_REQUEST });

      const { room, codeStatus }: { room: RoomItemType; codeStatus: number } =
        await getRoomAPI(id);

      if (codeStatus === 200) {
        dispatch(getRoomById(room));
      }
    } catch (error) {
      dispatch({ type: GET_ROOM_FAIL, error: error });
    }
  };
