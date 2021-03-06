import { Dispatch } from "redux";
import { getUserRoomsAPI } from "../../../api/httpApi";
import {
  DefaultStateRoomsType,
  GetApiRoomsType,
  RoomItemType,
} from "../../../common/models";
import {
  GET_ROOMS_FAIL,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
} from "../../types/types";

export function getRoomsByUserReducer(
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

export const getUserRoomsAction = (payload: any) => ({
  type: GET_ROOMS_SUCCESS,
  payload: payload,
});

export const getUserRoomsThunkCreator = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_ROOMS_REQUEST });
    const dataRequest: GetApiRoomsType = await getUserRoomsAPI();

    if (dataRequest.codeStatus === 200) {
      dispatch(getUserRoomsAction(dataRequest.rooms));
    }
  } catch (error) {
    dispatch({ type: GET_ROOMS_FAIL, payload: error });
  }
};
