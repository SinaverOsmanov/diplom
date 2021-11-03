import { Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import { getDataLocalStorage } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUserThunkCreator } from "../store/reducers/userReducers/logoutUserReducer";
import styled from "styled-components";
const { Header } = Layout;

const HeaderStyle = styled(Header)`
  a {
    font-weight: 500;
  }
  button {
    font-weight: 500;
  }
`;

const MenuRowStyle = styled(Row)`
  & > div {
  }
`;

export function HeaderComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = getDataLocalStorage();

  const { auth } = useSelector((state: any) => state.auth);

  async function logoutHandleClick() {
    dispatch(logoutUserThunkCreator());
    history.push("/");
  }

  return (
    <HeaderStyle
      style={{
        color: "white",
        background: "#fff",
        boxShadow: "0px 0px 8px 8px rgba(34, 60, 80, 0.2)",
      }}
    >
      <Row style={{ textAlign: "center" }} justify="space-between">
        <Col span={2} offset={3}>
          <Link to={`/`}>DIPLOM</Link>
        </Col>
        <Col span={4}>
          {auth && (
            <MenuRowStyle justify="end">
              {data && data.isAdmin && (
                <Col>
                  <Row justify="center">
                    <Link to="/admin/panel">Админ</Link>
                  </Row>
                </Col>
              )}
              <Col offset={2}>
                <Row justify="center">
                  <Link to="/reserved">Пользователь</Link>
                </Row>
              </Col>
              <Col offset={2}>
                <Row justify="center">
                  <Link type="link" onClick={logoutHandleClick} to={""}>
                    Выход
                  </Link>
                </Row>
              </Col>
            </MenuRowStyle>
          )}
        </Col>
      </Row>
    </HeaderStyle>
  );
}
