import { logoutAPI } from "../../../api/httpApi";
import { DefaultStateAuthType } from "../../../common/models";
import { removeDataLocalStorage } from "../../../utils/localStorage";
import { messageNotification } from "../../../utils/notification";
import {
  AUTH_USER_REQUEST,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
} from "../../types/types";

export function logoutUserReducer(
  state: DefaultStateAuthType,
  action: { type: string; payload: boolean }
) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return { ...state, loading: true };

    case AUTH_USER_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        loading: false,
      };

    case AUTH_USER_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}

export const logoutUserAction = (payload: boolean) => ({
  type: AUTH_USER_SUCCESS,
  payload: payload,
});

export const logoutUserThunkCreator = () => async (dispatch: any) => {
  try {
    dispatch({ type: AUTH_USER_REQUEST });

    const dataRequest = await logoutAPI();
    if (dataRequest) {
      messageNotification(dataRequest);
      if (dataRequest.codeStatus === 200) {
        removeDataLocalStorage();
        dispatch(logoutUserAction(false));
      }
    }
  } catch (error) {
    dispatch({ type: AUTH_USER_FAIL, error: error });
  }
};
