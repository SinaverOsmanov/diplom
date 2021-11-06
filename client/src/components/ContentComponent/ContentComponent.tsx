import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginForm } from "../authForm/LoginForm";
import { RegistrationForm } from "../authForm/RegistrationForm";
import { AdminPage } from "../../pages/AdminPage";
import { ExtendedRoomPage } from "../../pages/ExtenderRoomPage/ExtendedRoomPage";
import { RoomsPage } from "../../pages/RoomsPage";
import { UserRoomsPage } from "../../pages/UserRoomsPage";
import { useDispatch, useSelector } from "react-redux";
import { getDataLocalStorage } from "../../utils/localStorage";
import { AUTH_USER_SUCCESS } from "../../store/types/types";
import { useHistory, useLocation } from "react-router";
import { ContentStyle } from "./ContentComponentStyle";
import { Routes } from "../../layouts/Routes";

export function ContentComponent() {
  const { auth } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  useEffect(() => {
    const data = getDataLocalStorage();
    if (data) {
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
