import { Dispatch } from "redux";
import { createUserAPI } from "../../../api/httpApi";
import {
  DefaultStateAuthType,
  IUserDataRequest,
  UserType,
} from "../../../common/models";
import { setTokens } from "../../../utils/localStorage";
import {
  AUTH_USER_REQUEST,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
} from "../../types/types";

export function registrationUserReducer(
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
      return { ...state };
  }
}

export const registrationUserAction = (payload: boolean) => ({
  type: AUTH_USER_SUCCESS,
  payload: payload,
});

export const registrationUserThunkCreator =
  (data: UserType) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AUTH_USER_REQUEST });

      const dataRequest: IUserDataRequest = await createUserAPI(data);

      if (dataRequest) {
        setTokens(dataRequest);
        dispatch(registrationUserAction(true));
      }
    } catch (error) {
      dispatch({ type: AUTH_USER_FAIL, error: error });
    }
  };
