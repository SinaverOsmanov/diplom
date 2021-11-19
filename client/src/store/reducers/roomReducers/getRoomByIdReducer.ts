import { getRoomAPI, updateRoomAPI } from "../../../api/httpApi";
import {
  DefaultStateRoomType,
  RoomFormType,
  RoomItemType,
} from "../../../common/models";
import { messageNotification } from "../../../utils/notification";
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
        room: { ...state.room, ...action.payload },
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

export const updateRoomAction = (payload: {
  title: string;
  description: string;
  quality: string;
  photoUrl: string | null;
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
    photoUrl,
  }: RoomFormType & { roomId: string }) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: GET_ROOM_REQUEST });

      const {
        codeStatus,
        message,
      }: { room: RoomItemType; codeStatus: number; message: string } =
        await updateRoomAPI({ roomId, title, description, quality, photoUrl });

      if (codeStatus === 202) {
        messageNotification({
          codeStatus: codeStatus,
          message: message,
        });
        dispatch(updateRoomAction({ title, description, quality, photoUrl }));
      }
    } catch (error) {
      dispatch({ type: GET_ROOM_FAIL });
    }
  };
