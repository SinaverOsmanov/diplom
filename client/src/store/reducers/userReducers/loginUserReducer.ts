import { Dispatch } from "redux";
import { loginUserAPI } from "../../../api/httpApi";
import {
  DefaultStateAuthType,
  IUserDataRequest,
  UserType,
} from "../../../common/models";
import { getAdminStorage, setTokens } from "../../../utils/localStorage";

import {
  AUTH_USER_REQUEST,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS,
} from "../../types/types";
import {} from "../../types/types";

const defaultState = {
  auth: null,
  loading: false,
  error: null,
  admin: getAdminStorage(),
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
      return { ...state };
  }
}

export const loginUserAction = (payload: boolean) => ({
  type: AUTH_USER_SUCCESS,
  payload: payload,
});

export const loginUserThunkCreator =
  (data: UserType) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AUTH_USER_REQUEST });

      const dataRequest: IUserDataRequest = await loginUserAPI(data);
      if (dataRequest) {
        setTokens(dataRequest);
        dispatch(loginUserAction(true));
      }
    } catch (error) {
      dispatch({ type: AUTH_USER_FAIL, error: error });
    }
  };

export const getAuth = () => (state: any) => state.auth.auth;

export const getAdmin = () => (state: any) => state.auth.admin;
