import { reservRoomAPI, unReservRoomAPI } from "../../../api/httpApi";
import { messageNotification } from "../../../utils/notification";
import {
  RESERV_ROOM_REQUEST,
  RESERV_ROOM_FAIL,
  RESERV_ROOM_SUCCESS,
} from "../../types/types";
import { getRoomByIdThunkCreator } from "../roomReducers/getRoomByIdReducer";
const defaultState = { loading: false };

export function reservedRoomReducer(
  state: any = defaultState,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case RESERV_ROOM_REQUEST:
      return { ...state, loading: true };

    case RESERV_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: state.room,
      };

    case RESERV_ROOM_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export const reservedRoomAction = (payload: any) => ({
  type: RESERV_ROOM_SUCCESS,
  payload: payload,
});

export const reservedRoomThunkCreator =
  (id: string, reserv: string) => async (dispatch: any) => {
    try {
      dispatch({ type: RESERV_ROOM_REQUEST });
      let dataRequest: { codeStatus: number; message: string; roomId: string };
      if (reserv === "reserv") {
        dataRequest = await reservRoomAPI(id);
      } else {
        dataRequest = await unReservRoomAPI(id);
      }

      messageNotification({
        codeStatus: dataRequest.codeStatus,
        message: dataRequest.message,
      });
      dispatch(getRoomByIdThunkCreator(dataRequest.roomId));
    } catch (error) {
      dispatch({ type: RESERV_ROOM_FAIL });
    }
  };
