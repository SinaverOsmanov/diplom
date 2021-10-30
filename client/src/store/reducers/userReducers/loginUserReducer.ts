import { loginUserAPI } from "../../../api/httpApi";
import { DefaultStateAuthType, UserType } from "../../../common/models";
import { setDataLocalStorage } from "../../../utils/localStorage";
import { messageNotification } from "../../../utils/notification";
import {
  AUTH_USER_REQUEST,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
} from "../../types/types";
import {} from "../../types/types";

const defaultState = {
  auth: false,
  loading: false,
  error: "",
};

export function loginUserReducer(
  state: DefaultStateAuthType = defaultState,
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

export const loginUserAction = (payload: boolean) => ({
  type: AUTH_USER_SUCCESS,
  payload: payload,
});

export const loginUserThunkCreator =
  (data: UserType) => async (dispatch: any) => {
    try {
      dispatch({ type: AUTH_USER_REQUEST });

      const dataRequest = await loginUserAPI(data);
      if (dataRequest) {
        messageNotification(dataRequest);
        if (dataRequest.codeStatus === 200) {
          setDataLocalStorage({
            user: dataRequest.user,
            isAdmin: dataRequest.isAdmin,
          });
          dispatch(loginUserAction(true));
        }
      }
    } catch (error) {
      dispatch({ type: AUTH_USER_FAIL, error: error });
    }
  };
