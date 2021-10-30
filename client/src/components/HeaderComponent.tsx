import { Row, Col, Layout, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { getDataLocalStorage } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logoutUserThunkCreator } from "../store/reducers/userReducers/logoutUserReducer";
import styled from "styled-components";
const { Header } = Layout;

const HeaderStyle = styled(Header)`
  a {
    font-weight: bold;
  }
  button {
    font-weight: bold;
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
        <Col span={3} offset={2}>
          <Row justify="space-between" align="middle">
            {auth && (
              <>
                <Col span={6}>
                  <Row justify="center">
                    <Button type="link" onClick={logoutHandleClick}>
                      Log out
                    </Button>
                  </Row>
                </Col>
                <Col>
                  <Divider type="vertical" style={{ background: "#000" }} />
                </Col>
                <Col span={6}>
                  <Row justify="center">
                    <Link to="/reserved">User</Link>
                  </Row>
                </Col>
              </>
            )}
            {data && data.isAdmin && (
              <>
                <Col>
                  <Divider type="vertical" style={{ background: "#000" }} />
                </Col>
                <Col span={6}>
                  <Row justify="center">
                    <Link to="/admin/panel">Admin</Link>
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </HeaderStyle>
  );
}
