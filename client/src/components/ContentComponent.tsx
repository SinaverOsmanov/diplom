import React, { useEffect } from "react";
import { Layout } from "antd";
import { Routes } from "./Routes";
import { Route, Redirect } from "react-router-dom";
import { LoginForm } from "./Form/LoginForm";
import { RegistrationForm } from "./Form/RegistrationForm";
import { AdminPage } from "../pages/AdminPage";
import { ExtendedRoomPage } from "../pages/ExtendedRoomPage";
import { RoomsPage } from "../pages/RoomsPage";
import { UserRoomsPage } from "../pages/UserRoomsPage";
import { useDispatch, useSelector } from "react-redux";
import { getDataLocalStorage } from "./../utils/localStorage";
import { AUTH_USER_SUCCESS } from "./../store/types/types";
import styled from "styled-components";

const { Content } = Layout;

const ContentStyle = styled(Content)`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  height: calc(100vh - 64px);
`;

export function ContentComponent() {
  const { auth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = getDataLocalStorage();
    if (data) {
      dispatch({ type: AUTH_USER_SUCCESS, payload: true });
    }
  }, [dispatch]);

  return (
    <ContentStyle>
      <div>
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
            <Route path="/rooms/:id" component={ExtendedRoomPage} />
            <Route path="/rooms" component={RoomsPage} />
            <Route path="/reserved" component={UserRoomsPage} />
            <Redirect to="/" />
          </Routes>
        )}
      </div>
    </ContentStyle>
  );
}
