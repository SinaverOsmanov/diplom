import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginForm } from "../authForm/LoginForm";
import { RegistrationForm } from "../authForm/RegistrationForm";
import { AdminPage } from "../../pages/AdminPage";
import { ExtendedRoomPage } from "../../pages/ExtenderRoomPage/ExtendedRoomPage";
import { RoomsPage } from "../../pages/RoomsPage";
import { UserRoomsPage } from "../../pages/UserRoomsPage";
import { useDispatch, useSelector } from "react-redux";
import { getTokenExpiresDate } from "../../utils/localStorage";
import { AUTH_USER_SUCCESS } from "../../store/types/types";
import { useHistory, useLocation } from "react-router";
import { ContentStyle } from "./ContentComponentStyle";
import { Routes } from "../../layouts/Routes";
import { logoutUserThunkCreator } from './../../store/reducers/userReducers/logoutUserReducer';
import { getUserId } from './../../utils/localStorage';
import { getAuth } from "../../store/reducers/userReducers/loginUserReducer";

export function ContentComponent() {
  const auth = useSelector(getAuth());

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    const userId = getUserId()
    if (userId) {
      dispatch({ type: AUTH_USER_SUCCESS, payload: true });
      history.push(pathname);
    }
  
  }, [dispatch, history, pathname]);


  return (
    <ContentStyle>
      {!auth ? (
        <Routes>
          <Route path="/" exact component={LoginForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={RegistrationForm} />
          <Redirect to="/" />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" exact component={RoomsPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/rooms/:roomId" component={ExtendedRoomPage} />
          <Route path="/rooms" component={RoomsPage} />
          <Route path="/reserved" component={UserRoomsPage} />
          <Redirect to="/" />
        </Routes>
      )}
    </ContentStyle>
  );
}
