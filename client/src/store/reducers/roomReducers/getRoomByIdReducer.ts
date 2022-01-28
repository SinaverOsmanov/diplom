import { Dispatch } from "redux";
import {
  getRoomAPI,
  reservRoomAPI,
  unReservRoomAPI,
  updateRoomAPI,
} from "../../../api/httpApi";
import {
  DefaultStateRoomType,
  GetApiRoomByIdType,
  RoomFormType,
  RoomItemType,
} from "../../../common/models";

import {
  GET_ROOM_FAIL,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  RESERV_ROOM_FAIL,
  RESERV_ROOM_REQUEST,
  RESERV_ROOM_SUCCESS,
} from "../../types/types";

const defaultState = {
  room: null,
  loading: false,
  error: null,
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
      return { ...state };
  }
}

export const getRoomById = (payload: RoomItemType) => ({
  type: GET_ROOM_SUCCESS,
  payload: payload,
});

export const getRoomByIdThunkCreator =
  (id: string) => async (dispatch: Dispatch) => {
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
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_ROOM_REQUEST });

      await updateRoomAPI({
        roomId,
        title,
        description,
        quality,
        photoUrl,
      });
      if (codeStatus === 202) {
        dispatch(updateRoomAction({ title, description, quality, photoUrl }));
      }
    } catch (error) {
      dispatch({ type: GET_ROOM_FAIL });
    }
  };

export const getRoom = () => (state: { room: DefaultStateRoomType }) =>
  state.room.room;

export const getRoomLoading = () => (state: { room: DefaultStateRoomType }) =>
  state.room.loading;

export const reservedRoomAction = (payload: any) => ({
  type: RESERV_ROOM_SUCCESS,
  payload: payload,
});

export const reservedRoomThunkCreator =
  (id: string, reserv: string) => async (dispatch: any) => {
    try {
      dispatch({ type: RESERV_ROOM_REQUEST });
      let dataRequest: GetApiRoomByIdType;
      if (reserv === "reserv") {
        dataRequest = await reservRoomAPI(id);
      } else {
        dataRequest = await unReservRoomAPI(id);
      }

      dispatch(getRoomByIdThunkCreator(dataRequest.roomId));
    } catch (error) {
      dispatch({ type: RESERV_ROOM_FAIL });
    }
  };
