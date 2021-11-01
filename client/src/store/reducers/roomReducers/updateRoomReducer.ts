import { updateRoomAPI } from "../../../api/httpApi";
import { DefaultStateRoomType, RoomItemType } from "../../../common/models";
import { messageNotification } from "../../../utils/notification";
import {
  GET_ROOM_FAIL,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
} from "../../types/types";

export function updateRoomReducer(
  state: DefaultStateRoomType,
  action: {
    type: string;
    payload: {
      title: string;
      description: string;
      quality: string;
    };
  }
) {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return { ...state, loading: true };

    case GET_ROOM_SUCCESS:
      debugger;
      return {
        ...state,
        room: {
          ...state.room,
          title: action.payload.title,
          description: action.payload.description,
          quality: action.payload.quality,
        },
        loading: false,
      };

    case GET_ROOM_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

export const updateRoomAction = (payload: {
  title: string;
  description: string;
  quality: string;
}) => ({
  type: GET_ROOM_SUCCESS,
  payload: payload,
});

export const updateRoomThunkCreator =
  ({
    roomId,
    title,
    description,
    quality,
  }: {
    roomId: string;
    title: string;
    description: string;
    quality: string;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: GET_ROOM_REQUEST });

      const {
        codeStatus,
        message,
      }: { room: RoomItemType; codeStatus: number; message: string } =
        await updateRoomAPI({ roomId, title, description, quality });

      if (codeStatus === 202) {
        messageNotification({
          codeStatus: codeStatus,
          message: message,
        });
        dispatch(updateRoomAction({ title, description, quality }));
      }
    } catch (error) {
      dispatch({ type: GET_ROOM_FAIL });
    }
  };
